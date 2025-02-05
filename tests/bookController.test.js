const http = require("http");
const bookController = require("../src/controllers/bookController");
const bookService = require("../src/services/bookService");

jest.mock("../src/services/bookService");

describe("Book Controller", () => {
  let server;

  beforeAll(() => {
    server = http.createServer((req, res) => bookController.handleRequest(req, res));
  });

  afterAll(() => {
    server.close();
  });

  test("should create a book and return 201", async () => {
    const mockRequest = {
      method: "POST",
      url: "/books",
      on: jest.fn((event, callback) => {
        if (event === "data") callback(JSON.stringify({ title: "New Book", author: "New Author" }));
        if (event === "end") callback();
      })
    };
    const mockResponse = {
      writeHead: jest.fn(),
      end: jest.fn()
    };

    bookService.createBook.mockResolvedValue(1);

    await bookController.handleRequest(mockRequest, mockResponse);

    expect(bookService.createBook).toHaveBeenCalledWith("New Book", "New Author");
    expect(mockResponse.writeHead).toHaveBeenCalledWith(201, { "Content-Type": "application/json" });
    expect(mockResponse.end).toHaveBeenCalledWith(JSON.stringify({ message: "Book created", id: 1 }));
  });

  test("should return 200 and a list of books", async () => {
    const mockRequest = { method: "GET", url: "/books" };
    const mockResponse = {
      writeHead: jest.fn(),
      end: jest.fn()
    };

    const books = [{ id: 1, title: "Book 1", author: "Author 1" }];
    bookService.getBooks.mockResolvedValue(books);

    await bookController.handleRequest(mockRequest, mockResponse);

    expect(bookService.getBooks).toHaveBeenCalled();
    expect(mockResponse.writeHead).toHaveBeenCalledWith(200, { "Content-Type": "application/json" });
    expect(mockResponse.end).toHaveBeenCalledWith(JSON.stringify(books));
  });

  test("should return 404 for unknown routes", async () => {
    const mockRequest = { method: "GET", url: "/unknown" };
    const mockResponse = {
      writeHead: jest.fn(),
      end: jest.fn()
    };

    await bookController.handleRequest(mockRequest, mockResponse);

    expect(mockResponse.writeHead).toHaveBeenCalledWith(404, { "Content-Type": "application/json" });
    expect(mockResponse.end).toHaveBeenCalledWith(JSON.stringify({ error: "Not Found" }));
  });
});

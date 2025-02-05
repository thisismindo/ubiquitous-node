const bookService = require("../src/services/bookService");
const bookRepository = require("../src/data/bookRepository");

jest.mock("../src/data/bookRepository");

describe("Book Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createBook should throw an error if title or author is missing", async () => {
    await expect(bookService.createBook("", "Author")).rejects.toThrow("Title and author are required.");
    await expect(bookService.createBook("Title", "")).rejects.toThrow("Title and author are required.");
  });

  test("createBook should call repository and return ID", async () => {
    bookRepository.createBook.mockResolvedValue(1);
    await expect(bookService.createBook("Title", "Author")).resolves.toEqual(1);
  });

  test("getBooks should return an array of books", async () => {
    const mockBooks = [
      { id: 1, title: "Book 1", author: "Author 1" },
      { id: 2, title: "Book 2", author: "Author 2" }
    ];
    bookRepository.getBooks.mockResolvedValue(mockBooks);

    const books = await bookService.getBooks();
    expect(books).toEqual(mockBooks);
    expect(bookRepository.getBooks).toHaveBeenCalledTimes(1);
  });

  test("getBookById should return a book if it exists", async () => {
    const mockBook = { id: 1, title: "Book 1", author: "Author 1" };
    bookRepository.getBookById.mockResolvedValue(mockBook);

    const book = await bookService.getBookById(1);
    expect(book).toEqual(mockBook);
    expect(bookRepository.getBookById).toHaveBeenCalledWith(1);
  });

  test("updateBook should call repository with correct values", async () => {
    await bookService.updateBook(1, "Updated Title", "Updated Author");
    expect(bookRepository.updateBook).toHaveBeenCalledWith(1, "Updated Title", "Updated Author");
  });

  test("deleteBook should call repository with correct ID", async () => {
    await bookService.deleteBook(1);
    expect(bookRepository.deleteBook).toHaveBeenCalledWith(1);
  });
});

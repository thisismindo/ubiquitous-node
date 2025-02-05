const bookService = require("../services/bookService");
const { verifyJwt } = require("../middleware/jwtMiddleware");

const handleResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const handleRequest = async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/books") {
      verifyJwt(req, res, async () => {
        let body = "";
        req.on("data", (chunk) => (body += chunk.toString()));
        req.on("end", async () => {
          const { title, author } = JSON.parse(body);
          const id = await bookService.createBook(title, author);
          handleResponse(res, 201, { message: "Book created", id });
        });
      });
    } else if (req.method === "GET" && req.url === "/books") {
      verifyJwt(req, res, async () => {
        const books = await bookService.getBooks();
        handleResponse(res, 200, books);
      });
    } else if (req.method === "PUT" && req.url.startsWith("/books/")) {
      verifyJwt(req, res, async () => {
        const id = req.url.split("/")[2];

        let body = "";
        req.on("data", (chunk) => (body += chunk.toString()));
        req.on("end", async () => {
          const { title, author } = JSON.parse(body);
          await bookService.updateBook(id, title, author);
          handleResponse(res, 200, { message: "Book updated" });
        });
      });
    } else if (req.method === "DELETE" && req.url.startsWith("/books/")) {
      verifyJwt(req, res, async () => {
        const id = req.url.split("/")[2];
        await bookService.deleteBook(id);
        handleResponse(res, 200, { message: "Book deleted" });
      });
    } else {
      handleResponse(res, 404, { error: "Not Found" });
    }
  } catch (error) {
    handleResponse(res, 400, { error: error.message });
  }
};

module.exports = { handleRequest };

const bookRepository = require("../data/bookRepository");

const createBook = async (title, author) => {
  if (!title || !author) {
    throw new Error("Title and author are required.");
  }
  return await bookRepository.createBook(title, author);
};

const getBooks = async () => await bookRepository.getBooks();
const getBookById = async (id) => await bookRepository.getBookById(id);
const updateBook = async (id, title, author) => await bookRepository.updateBook(id, title, author);
const deleteBook = async (id) => await bookRepository.deleteBook(id);

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };

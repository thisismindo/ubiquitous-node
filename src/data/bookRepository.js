const db = require("../libs/dbClient");

const createBook = async (title, author) => {
  const sql_stmt = "INSERT INTO books (title, author) VALUES (?, ?)";
  const [result] = await db.execute(
    sql_stmt,
    [title, author]
  );
  return result.insertId;
};

const getBooks = async () => {
  let result = {
    'ids': [],
    'records': {}
  }
  const sql_stmt = "SELECT id, title, author, created_at FROM books";
  const [rows] = await db.execute(sql_stmt);
  if (rows) {
    rows.forEach((element) => {
        result['records'][element.id] = element
        if (!result['ids'].includes(element.id)) {
          result['ids'].push(element.id);
        }
    });
  }

  return result;
};

const getBookById = async (id) => {
  const sql_stmt = "SELECT id, title, author, created_at FROM books WHERE id = ?";
  const [rows] = await db.execute(sql_stmt, [id]);
  return rows[0];
};

const updateBook = async (id, title, author) => {
  const sql_stmt = "UPDATE books SET title = ?, author = ? WHERE id = ?";
  await db.execute(sql_stmt, [
    title,
    author,
    id,
  ]);
};

const deleteBook = async (id) => {
  const sql_stmt = "DELETE FROM books WHERE id = ?";
  await db.execute(sql_stmt, [id]);
};

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };

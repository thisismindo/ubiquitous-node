module.exports = {
    execute: jest.fn(async (query, params) => {
      if (query.startsWith("INSERT INTO books")) {
        return [{ insertId: 1 }];
      }
      if (query.startsWith("SELECT id, title, author, created_at FROM books")) {
        return [[{ id: 1, title: "Mock Book", author: "Mock Author" }]];
      }
      if (query.startsWith("UPDATE books")) {
        return [{ affectedRows: 1 }];
      }
      if (query.startsWith("DELETE FROM books")) {
        return [{ affectedRows: 1 }];
      }
      return [[]];
    }),
  };

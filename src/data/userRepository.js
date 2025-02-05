const db = require("../libs/dbClient");

const createUser = async (name) => {
  const sql_stmt = "INSERT INTO users (name) VALUES (?)";
  const [result] = await db.execute(
    sql_stmt,
    [name]
  );
  return result.insertId;
};

const getUsers = async () => {
  let result = {
    'ids': [],
    'records': {}
  }
  const sql_stmt = "SELECT id, name FROM users";
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

const getUserById = async (id) => {
  const sql_stmt = "SELECT id, name FROM users WHERE id = ?";
  const [rows] = await db.execute(sql_stmt, [id]);
  return rows[0];
};

const updateUser = async (id, name) => {
  const sql_stmt = "UPDATE users SET name = ? WHERE id = ?";
  await db.execute(sql_stmt, [
    name,
    id,
  ]);
};

const deleteUser = async (id) => {
  const sql_stmt = "DELETE FROM users WHERE id = ?";
  await db.execute(sql_stmt, [id]);
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };

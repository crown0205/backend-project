import { DB } from "../db/database.js";

export async function createUser(user) {
  const { username, password, name, email, url } = user;

  const checkedUrl = url !== undefined ? url : null;

  return DB.execute(
    "INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)",
    [username, password, name, email, checkedUrl]
  ).then((result) => result[0].insertId);
}

export async function findByUsername(username) {
  return DB.execute("SELECT * FROM users WHERE username=?", [username]) //
    .then((result) => result[0][0]);
}

export async function findById(id) {
  return DB.execute("SELECT * FROM users WHERE id=?", [id]) //
    .then((result) => result[0][0]);
}

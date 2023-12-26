import mysql from "mysql2";
import { config } from "../config.js";
const {
  db: { database, host, password, user },
} = config;

const pool = mysql.createPool({
  host,
  user,
  database,
  password,
});

export const DB = pool.promise();

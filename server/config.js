import dotenv from "dotenv";
dotenv.config();

const env = process.env;

export const config = {
  db: {
    host: env.DB_HOST,
    user: env.DB_USER,
    database: env.DB_DATABASE,
    password: env.DB_PASSWORD,
  },
  bcrypt: {
    saltRounds: +env.BCRYPT_SALT_ROUNDS,
  },
  jwt: {
    secretKey: env.JWT_SECRET,
    expiresInSec: env.JWT_EXPIRES_SEC,
  },
};

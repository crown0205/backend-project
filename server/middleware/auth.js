import jwt from "jsonwebtoken";
import { config } from "../config.js";
import * as userRepository from "../data/auth.js";

const AUTH_ERROR = "Authentication Error";

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer"))) {
    return res.status(401).json({ message: `${AUTH_ERROR} 찾을수 없음` });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: `${AUTH_ERROR} 만료` });
    }
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: `${AUTH_ERROR} 유저를 찾을수 없음` });
    }
    req.userId = user.id;
    next();
  });
};

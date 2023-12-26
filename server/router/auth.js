import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validator/index.js";
import * as authController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateCredential = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("사용자 아이디는 5자 이상이어야 합니다."),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("비밀번호는 5자 이상이어야 합니다."),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body("name").notEmpty().withMessage("이름이 빠졌습니다."),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("이메일 형식이 잘못되었습니다."),
  body("url")
    .isURL()
    .withMessage("URL 형식이 아닙니다.")
    .optional({ values: "null" }),
  validate,
];

router.post("/signup", validateSignup, authController.signup);

router.post("/login", validateCredential, authController.login);

router.get("/me", isAuth, authController.me);

export default router;

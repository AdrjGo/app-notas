import express from "express";
import { body } from "express-validator";
import { loginUser, registerUser } from "../controller/authController.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isString().trim().notEmpty().withMessage("Email es obligatorio"),
    body("password").isString().trim().notEmpty().withMessage("Contraseña es obligatorio"),
  ],
  loginUser
);

router.post(
  "/register",
  [
    body("email").isString().trim().notEmpty().withMessage("Email es obligatorio"),
    body("password").isString().trim().notEmpty().withMessage("Contraseña es obligatorio"),
  ],
  registerUser
);

export default router;
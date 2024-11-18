import {
  findUserByEmail,
  registerUser,
} from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

//REGISTER
export const registerController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: `Falta campo ${!email ? "email" : "password"}` });
  }

  try {
    const response = await registerUser(email, password);
    res.status(201).json(response);
  } catch (err) {
    if (err.message === "Formato de email inválido") {
      return res.status(400).json({ error: "Formato de email inválido" });
    }
    if (err.message === "Email ya registrado") {
      return res.status(400).json({ error: "Email ya registrado" });
    }
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

//LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: "Usuario no encontrado" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Contraseña incorrecta" });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.status(200).json({ token });
};

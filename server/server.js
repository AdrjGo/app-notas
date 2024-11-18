import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { verifyToken } from "./services/auth-service/middleware/authMiddleware.js";
import {
  loginUser,
  registerController,
} from "./services/auth-service/controller/authController.js";
import {
  createNoteController,
  deleteNoteController,
  getNotesController,
} from "./services/notes-service/controller/noteController.js";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Especifica el origen permitido
    credentials: true, // Permite el envío de cookies y credenciales
  })
);
app.use(express.json());

// Ruta protegida de prueba
app.get("/api/protected", verifyToken, (req, res) => {
  res.send(`Acceso concedido a usuario con ID: ${req.userId}`);
});

//Rutas de autenticación
app.post("/api/register", registerController);
app.post("/api/login", loginUser);
//Rutas de notas
app.post("/api/notes/create", verifyToken, createNoteController);
app.get("/api/notes/all", verifyToken, getNotesController);
app.delete("/api/notes/delete/:id", verifyToken, deleteNoteController);

app.get("/", (req, res) => {
  res.send("¡Servidor en funcionamiento!");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

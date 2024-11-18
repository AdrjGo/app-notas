import { createNote, getNotesByUserId } from "../models/noteModel.js";
import dotenv from "dotenv";

dotenv.config();

//Crear nota
export const createNoteController = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId; // Lo obtenemos del JWT

  // Verifica que los valores estén correctos antes de llamar a la función del modelo
  console.log("Datos recibidos:", { title, description, userId });

  try {
    const result = await createNote(title, description, userId);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error al crear la nota:", error);
    res.status(500).json({ message: error.message });
  }
};


//Obtener notas
export const getNotesController = async (req, res) => {
  const user_id = req.userId;

  try {
    const notes = await getNotesByUserId(user_id);
    if (!notes || notes.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron notas para este usuario" });
    }
    res.status(200).json({ notes });
  } catch (err) {
    console.error("Error al obtener notas:", err);
    res.status(500).json({ message: "Error al obtener notas" });
  }
};


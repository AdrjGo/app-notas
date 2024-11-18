import express from "express";
import { body } from "express-validator";
import { createNoteController, getNotesController, getNoteByIdController, updateNoteController, deleteNoteController } from "../controller/noteController.js";

const router = express.Router();

router.post("/create", createNoteController);

router.get("/all", getNotesContrller);

router.get("/:id", getNoteByIdController);

router.put("/:id", body("title").isString().trim().notEmpty().withMessage("Título es obligatorio"), body("description").isString().trim().notEmpty().withMessage("Descripción es obligatorio"), updateNoteController);

router.delete("/:id", deleteNoteController);

export default router;
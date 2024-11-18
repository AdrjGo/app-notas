import client from "../../../db/db.js";

//Crear tabla de notas
const createNotesTable = async () => {
  await client.execute(
    `CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`
  );
};
createNotesTable();

//Crear nota
export const createNote = async (title, description, userId) => {
  // Verifica que los valores sean del tipo correcto (string, number, etc.)
  if (typeof title !== 'string' || typeof description !== 'string' || typeof userId !== 'number') {
    throw new Error("Tipo de dato no válido");
  }

  try {
    const result = await client.execute(
      "INSERT INTO notes (title, description, user_id) VALUES (?, ?, ?)",
      [title, description, userId]
    );
    return result;
  } catch (error) {
    console.error("Error al crear la nota:", error);
    throw new Error("Error al crear la nota");
  }
};

//Obtener notas
export const getNotesByUserId = async (user_id) => {
  const { rows } = await client.execute(
    `SELECT * FROM notes WHERE user_id = ?`,
    [user_id]
  );
  return rows;
};

export default { createNote, getNotesByUserId };

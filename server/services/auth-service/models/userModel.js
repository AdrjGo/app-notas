import client from "../../../db/db.js";
import bcrypt from "bcryptjs";

const createUserTable = async () => {
  await client.execute(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT)"
  );
};

createUserTable();

//REGISTER
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
export const registerUser = async (email, password) => {
  if (!validateEmail(email)) {
    throw new Error("Formato de email inválido");
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return { message: "Email ya registrado" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await client.execute("INSERT INTO users (email, password) VALUES (?, ?)", [
    email,
    hashedPassword,
  ]);
  return { message: "Usuario registrado" };
};

//Buscar usuario por email
export const findUserByEmail = async (email) => {
  const { rows } = await client.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows.length > 0 ? rows[0] : null;
};

//Verificar contraseña
// export const checkPassword = async (storesPassword, password) => {
//   return bcrypt.compare(password, storesPassword);
// };

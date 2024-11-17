import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import client from "../../../db/db.js";
import dotenv from "dotenv";

dotenv.config();

//REGISTER
export const registerUser = async (req, res) => {
    const { email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Falta campo" });
    }

    try {
        const existignUser = await client.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (existignUser.rows.length > 0) {
            return res.status(400).json({ error: "Email ya registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await client.execute("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);

        res.status(201).json({ message: "Usuario registrado" });
    }catch (err) {
        console.error("Error al registrar usuario:", err);
        res.status(500).json({ error: "Error al registrar usuario" });
    }
}

//LOGIN
export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
  
    try {
      //console.log("Email recibido:", email);
  
      const result = await client.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      
  
      //console.log("Resultado de la consulta:", result);
  
      const user = result?.rows?.[0];
      
      if (!user) {
        console.log("Usuario no encontrado");
        return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
      }
  
      //console.log("Contraseña en la base de datos (cifrada):", user.password);

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        console.log("Las contraseñas no coinciden");
        return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,             
        { expiresIn: '1h' }                      
      );

      res.json({ message: "Login exitoso", token });
    } catch (err) {
      console.error("Error al intentar autenticar usuario:", err);
      res.status(500).json({ error: "Error al intentar autenticar usuario" });
    }
  };
  
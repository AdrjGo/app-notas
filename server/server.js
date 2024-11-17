import express from 'express';
import dotenv from 'dotenv';
import {loginUser, registerUser} from './services/auth-service/controller/authController.js';
import cors from 'cors';
const port = 3000;

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('¡Servidor en funcionamiento!');
});

// Rutas
app.use('/api/login', loginUser);  // Ruta para login
app.use('/api/register', registerUser);  // Ruta para registro

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

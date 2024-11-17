import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './services/auth-service/routes/authRoutes.js';

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
app.use('/api/auth', authRoutes);  // Ruta para login

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

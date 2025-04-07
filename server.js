// server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const citaRoutes = require('./routes/citaRoutes');

const app = express();
app.use(express.json());

// Conexión a MongoDB
require('./config/db');

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/citas', citaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));
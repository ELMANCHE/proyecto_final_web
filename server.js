const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const citaRoutes = require('./routes/citaRoutes');
const medicalHistoryRoutes = require('./routes/medicalHistoryRoutes'); 
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const pacienteRoutes = require('./routes/pacienteRoutes');


const app = express();
app.use(express.json());

// Conexión a MongoDB
connectDB().catch(error => {
  console.error('Error de conexión:', error);
  process.exit(1);
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/pacientes', userRoutes);
app.use('/api/historias', medicalHistoryRoutes);
app.use('/api', pacienteRoutes); 

const PORT = process.env.PORT || 8087;
app.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));

// Middleware de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal :(');
});

const Cita = require('../models/Cita');

// Crear cita
exports.createCita = async (req, res) => {
  try {
    const cita = await Cita.create(req.body);
    res.status(201).json(cita);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las citas
exports.getCitas = async (req, res) => {
  const citas = await Cita.find().populate('paciente');
  res.json(citas);
};
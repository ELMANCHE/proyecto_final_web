
const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fecha: Date,
  observaciones: String,
  asistio: { type: Boolean, default: false },
});

module.exports = mongoose.model('Cita', CitaSchema);
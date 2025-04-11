const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
  fecha: { 
    type: Date, 
    required: true, // Fecha es obligatoria
    validate: {
      validator: (date) => date >= new Date(), 
      message: 'La cita debe ser una fecha futura'
    }
  },
  paciente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true // Paciente es obligatorio 
  },
  medico: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true // Médico es obligatorio 
  },
  tipo: { 
    type: String, 
    required: true, // Tipo de cita obligatorio 
    enum: ['control prenatal', 'consulta general', 'urgencia'] 
  },
  comentarios: String,
});

module.exports = mongoose.model('Cita', CitaSchema);
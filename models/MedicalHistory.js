const mongoose = require('mongoose');

const MedicalHistorySchema = new mongoose.Schema({
  pacienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true // único para consultas rápidas 
  },
  nombresCompletos: {
    type: String,
    required: true //  Campo obligatorio
  },
  fechaNacimiento: {
    type: Date,
    required: true,
    validate: {
      validator: (date) => date <= new Date(), // Fecha en el pasado 
      message: 'La fecha de nacimiento debe ser una fecha válida en el pasado'
    }
  },
  edad: {
    type: Number,
    get: function() {
      const hoy = new Date();
      const diff = hoy - this.fechaNacimiento;
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); //  Cálculo de edad
    },
    virtual: true // No se almacena en la base de datos 
  },
  primeraCita: {
    type: Date,
    required: true //Fecha inicial obligatoria
  },
  citasProgramadas: [{
    type: Date,
    required: true // Cada cita debe tener fecha válida 
  }],
  ultimaCita: Date,
  tipoSangre: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Valores permitidos 
    required: true 
  },
  comentarios: String,
  // Campos adicionales médicos
  antecedentesMedicos: String, // Historial clínico
  alergias: [String], // Lista de alergias
  medicamentosActuales: [String] // Medicamentos en uso
}, {
  timestamps: true, // Registra fechas de creación/actualización 
  toJSON: { virtuals: true } // Incluye `edad` en respuestas 
});

// Validación para citas futuras 
MedicalHistorySchema.path('citasProgramadas').validate((dates) => {
  return dates.every(date => new Date(date) >= new Date());
}, 'Todas las citas programadas deben ser fechas futuras');


module.exports = mongoose.model('MedicalHistory', MedicalHistorySchema);
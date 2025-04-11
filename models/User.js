const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, 
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true // Normaliza el email a minúsculas 
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Validación mínima de longitud 
  },
  rol: {
    type: String,
    enum: ['paciente', 'medico'],
    default: 'paciente'
  }
});

// Middleware para hashear la contraseña antes de guardar
UserSchema.pre('save', async function (next) {
  try {
    // Solo hashea si la contraseña fue modificada
    if (!this.isModified('password')) return next();
    
    // Usa 12 rondas de bcrypt para mayor seguridad 
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    
    return next();
  } catch (error) {
    return next(error); // Propaga errores [[6]][[8]]
  }
});

// Método estático para comparar contraseñas (útil para autenticación)
UserSchema.statics.comparePassword = async function (candidatePassword, hash) {
  return await bcrypt.compare(candidatePassword, hash); // 
};

module.exports = mongoose.model('User', UserSchema);
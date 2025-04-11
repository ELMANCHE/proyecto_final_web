const express = require('express');
const router = express.Router();
const { authenticateUser, checkRole } = require('../middlewares/authMiddleware'); 
const User = require('../models/User'); // Modelo de usuario 

// Crear un paciente (solo médicos)
router.post('/', authenticateUser, checkRole('medico'), async (req, res) => {
    try {
      // Incluye password en el nuevo paciente 
      const nuevoPaciente = new User({
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password, 
        rol: 'paciente'
      });
  
      await nuevoPaciente.save();
      res.status(201).json(nuevoPaciente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Ver lista de pacientes (solo médicos)
router.get('/', authenticateUser, checkRole('medico'), async (req, res) => {
  try {
    // Filtrar solo pacientes (rol: 'paciente')
    const pacientes = await User.find({ rol: 'paciente' });
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
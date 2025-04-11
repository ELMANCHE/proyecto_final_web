const express = require('express');
const router = express.Router();
const { 
  createCita, 
  getCitas, 
  updateCita 
} = require('../controllers/citaController');

// Importar middlewares de autenticación y roles
const { 
  authenticateUser, 
  checkRole 
} = require('../middlewares/authMiddleware'); 

// Crear cita (solo médicos)
router.post(
  '/', 
  authenticateUser,
  checkRole('medico'), // Solo médicos pueden crear 
  createCita
);

// Obtener todas las citas
router.get('/', getCitas);

// Editar cita existente (solo médicos)
router.put(
  '/:id', // [[1]]
  authenticateUser,
  checkRole('medico'),
  async (req, res) => {
    try {
      const cita = await Cita.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true } 
      );
      if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
      res.json(cita);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
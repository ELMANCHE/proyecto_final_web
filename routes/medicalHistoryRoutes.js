const express = require('express');
const router = express.Router();
const { authenticateUser, checkRole } = require('../middlewares/authMiddleware');
const { createMedicalHistory, addAppointment } = require('../controllers/medicalHistoryController');

// Crear historia clínica (solo médicos)
router.post(
  '/', 
  authenticateUser,
  checkRole('medico'),
  createMedicalHistory
);

// Agregar cita a una historia clínica (solo médicos)
router.post(
  '/:id/citas', 
  authenticateUser,
  checkRole('medico'),
  addAppointment
);

module.exports = router;
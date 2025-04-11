const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authMiddleware');
const Cita = require('../models/Cita');
const User = require('../models/User'); 

router.get(
  '/mis-citas', 
  authenticateUser, // Requiere autenticación 
  async (req, res) => {
    try {
      // Verifica que el usuario es paciente
      const user = await User.findById(req.userId);
      if (!user || user.rol !== 'paciente') {
        return res.status(403).json({ error: 'Solo pacientes pueden acceder' });
      }

      // Filtra citas del paciente y futuras
      const citas = await Cita.find({
        paciente: user._id,
        fecha: { $gte: new Date() }, //Solo citas futuras
      });

      res.json(citas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
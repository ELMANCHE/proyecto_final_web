const MedicalHistory = require('../models/MedicalHistory');
const User = require('../models/User');

exports.createMedicalHistory = async (req, res) => {
  try {
    // Verificar rol del médico
    const user = await User.findById(req.userId);
    if (user.rol !== 'medico') return res.status(403).json({ error: 'Solo médicos pueden crear historias' });

    // Extraer datos del body según tu esquema
    const { pacienteId, nombresCompletos, fechaNacimiento, primeraCita, tipoSangre, comentarios } = req.body;

    // Validar campos requeridos
    if (!pacienteId || !nombresCompletos || !fechaNacimiento || !primeraCita || !tipoSangre) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Generar citas programadas
    const citasProgramadas = generateFollowUpAppointments(primeraCita);

    // Crear la historia clínica
    const historia = new MedicalHistory({
      pacienteId,
      nombresCompletos,
      fechaNacimiento,
      primeraCita,
      citasProgramadas,
      tipoSangre,
      comentarios,
    });

    await historia.save();
    res.status(201).json(historia);
  } catch (error) {
    res.status(400).json({ error: error.message }); // Muestra el mensaje de error específico [[1]]
  }
};

// Agregar cita a una historia clínica
exports.addAppointment = async (req, res) => { // ¡Exporta esta función! [[1]]
    try {
      const { id } = req.params;
      const { fecha } = req.body;
  
      // Validar rol del médico
      const user = await User.findById(req.userId);
      if (user.rol !== 'medico') return res.status(403).json({ error: 'Solo médicos pueden agregar citas' });
  
      // Validar fecha futura
      if (new Date(fecha) < new Date()) {
        return res.status(400).json({ error: 'La cita debe ser futura' });
      }
  
      // Actualizar historia
      const historia = await MedicalHistory.findByIdAndUpdate(
        id,
        { $push: { citasProgramadas: fecha } },
        { new: true }
      );
  
      res.json(historia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Función para generar citas (ajustada para evitar mutación)
function generateFollowUpAppointments(startDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  for (let i = 0; i < 10; i++) { // 10 citas estándar
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 28)); // Cada 4 semanas
    dates.push(currentDate);
  }
  return dates;
}
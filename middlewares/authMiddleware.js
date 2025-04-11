const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// Autenticación básica
const authenticateUser = (req, res, next) => {
  // Extraer el token del header 
  const authHeader = req.header('Authorization');
  
  // Validar que el header exista y tenga el formato correcto
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado o inválido' });
  }

  // Obtener el token limpio
  const token = authHeader.split(' ')[1]; 

  // Verificar el token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Verificar rol del usuario
const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId); 
      if (user.rol !== requiredRole) {
        return res.status(403).json({ error: `Solo ${requiredRole} pueden acceder` });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: 'Error al verificar el rol' });
    }
  };
};

module.exports = { authenticateUser, checkRole };
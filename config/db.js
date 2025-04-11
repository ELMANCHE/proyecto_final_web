require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log('Conectado a MongoDB');
  } catch (error) {
    throw new Error('Error en la conexión a MongoDB');
  }
};

module.exports = connectDB;
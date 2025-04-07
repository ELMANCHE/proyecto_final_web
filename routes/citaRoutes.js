
const express = require('express');
const router = express.Router();
const { createCita, getCitas } = require('../controllers/citaController');

router.post('/', createCita);
router.get('/', getCitas);

module.exports = router;
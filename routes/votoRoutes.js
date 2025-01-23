// routes/votoRoutes.js
const express = require('express');
const router = express.Router();
const VotoController = require('../controllers/VotoController');

// Registrar voto
router.post('/voto', VotoController.registrarVoto);

// Listar votos
router.get('/votos', VotoController.listarVotos);

module.exports = router;

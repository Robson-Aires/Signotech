const express = require('express');
const router = express.Router();
const EnqueteController = require('../controllers/Enquetecontroller');

// Rota para criar nova enquete
router.post('/enquete', EnqueteController.criarEnquete);

// Rota para listar enquetes
router.get('/enquetes', EnqueteController.listarEnquetes);

// Rota para editar enquete
router.put('/enquete/:id', EnqueteController.editarEnquete);

// Rota para excluir enquete
router.delete('/enquete/:id', EnqueteController.excluirEnquete);

module.exports = router;

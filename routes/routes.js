const express = require('express');
const router = express.Router();
const EnqueteController = require('../controllers/Enquetecontroller');

// Criar nova enquete
router.post('/enquete', EnqueteController.criarEnquete);

// Listar enquetes
router.get('/enquetes', EnqueteController.listarEnquetes);

// Editar enquete
router.put('/enquete/:id', EnqueteController.editarEnquete);

// Excluir enquete
router.delete('/enquete/:id', EnqueteController.excluirEnquete);

module.exports = router;

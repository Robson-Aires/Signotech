const express = require('express');
const router = express.Router();
const db = require('../db');
const OpcoesDaEnqueteController = require('../controllers/OpcoesDaEnqueteController');

// Criar opções de enquete
router.post('/opcoes', OpcoesDaEnqueteController.criarOpcao);

// Listar opções de uma enquete
router.get('/opcoes/:enqueteId', OpcoesDaEnqueteController.listarOpcoes);
   
// Editar opção de enquete
router.put('/opcoes/:id', OpcoesDaEnqueteController.editarOpcao);

// Excluir opção de enquete
router.delete('/opcoes/:id', OpcoesDaEnqueteController.excluirOpcao);

module.exports = router;

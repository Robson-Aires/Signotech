// usuarioRoutes.js
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController'); // Controller de Usuário

// Criar novo usuário
router.post('/usuarios', UsuarioController.criarUsuario);

// Listar usuários
router.get('/usuarios', UsuarioController.listarUsuarios);

// Editar usuário
router.put('/usuarios/:id', UsuarioController.editarUsuario);

// Excluir usuário
router.delete('/usuarios/:id', UsuarioController.excluirUsuario);

module.exports = router;

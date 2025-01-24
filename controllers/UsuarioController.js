const Usuario = require('../models/usuario');

const UsuarioController = {
    async criarUsuario(req, res) {
        try {
            const { nome, email } = req.body;

            if (!nome || !email) {
                return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
            }

            const usuarioExistente = await Usuario.findOne({ where: { email } });
            if (usuarioExistente) {
                return res.status(400).json({ error: 'Usuário com este e-mail já existe.' });
            }

            const usuario = await Usuario.create({
                nome,
                email,
                date_create_user: new Date()
            });

            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário.' });
        }
    },

    async listarUsuarios(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar usuários.' });
        }
    },

    async editarUsuario(req, res) {
        try {
            const { id } = req.params;
            const { nome, email } = req.body;

            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            usuario.nome = nome || usuario.nome;
            usuario.email = email || usuario.email;

            await usuario.save();
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao editar usuário.' });
        }
    },

    async excluirUsuario(req, res) {
        try {
            const { id } = req.params;

            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            await usuario.destroy();
            res.json({ message: 'Usuário excluído com sucesso.' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir usuário.' });
        }
    }
};

module.exports = UsuarioController;

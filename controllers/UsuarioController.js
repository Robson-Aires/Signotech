const Usuario = require('../models/Usuario');

const UsuarioController = {
    // Método para criar um novo usuário
    async criarUsuario(req, res) {
        try {
            console.log('Requisição recebida no endpoint criarUsuario:', req.body);

            // Extrair os campos do corpo da requisição
            const { nome, senha, email } = req.body;

            // Verificar se todos os campos obrigatórios foram preenchidos
            if (!nome || !senha || !email) {
                console.log('Campos obrigatórios ausentes.');
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            // Verificar se o e-mail já está cadastrado no banco de dados
            const usuarioExistente = await Usuario.findOne({ where: { email } });
            if (usuarioExistente) {
                console.log('E-mail já cadastrado:', email);
                return res.status(400).json({ error: 'Usuário com este e-mail já existe.' });
            }

            // Criar o usuário no banco de dados
            const usuario = await Usuario.create({
                nome,
                senha,
                email,
                date_create_user: new Date()
            });

            console.log('Usuário criado com sucesso:', usuario);
            res.status(201).json(usuario);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ error: 'Erro ao criar usuário.' });
        }
    },

    // Método para listar todos os usuários
    async listarUsuarios(req, res) {
        try {
            console.log('Requisição recebida no endpoint listarUsuarios');
            
            // Buscar todos os usuários no banco de dados
            const usuarios = await Usuario.findAll();

            console.log('Usuários encontrados:', usuarios);
            res.json(usuarios);
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            res.status(500).json({ error: 'Erro ao listar usuários.' });
        }
    },

    // Método para editar um usuário pelo ID
    async editarUsuario(req, res) {
        try {
            console.log('Requisição recebida no endpoint editarUsuario:', req.params, req.body);

            // Extrair o ID dos parâmetros da URL
            const { id } = req.params;

            // Buscar o usuário no banco de dados
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                console.log('Usuário não encontrado com ID:', id);
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            // Atualizar os campos do usuário
            const { nome, senha, email } = req.body;
            usuario.nome = nome || usuario.nome;
            usuario.senha = senha || usuario.senha;
            usuario.email = email || usuario.email;

            // Salvar as alterações no banco de dados
            await usuario.save();

            console.log('Usuário atualizado com sucesso:', usuario);
            res.json(usuario);
        } catch (error) {
            console.error('Erro ao editar usuário:', error);
            res.status(500).json({ error: 'Erro ao editar usuário.' });
        }
    },

    // Método para excluir um usuário pelo ID
    async excluirUsuario(req, res) {
        try {
            console.log('Requisição recebida no endpoint excluirUsuario:', req.params);

            // Extrair o ID dos parâmetros da URL
            const { id } = req.params;

            // Buscar o usuário no banco de dados
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                console.log('Usuário não encontrado com ID:', id);
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            // Excluir o usuário do banco de dados
            await usuario.destroy();

            console.log('Usuário excluído com sucesso:', usuario);
            res.json({ message: 'Usuário excluído com sucesso.' });
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            res.status(500).json({ error: 'Erro ao excluir usuário.' });
        }
    }
};

module.exports = UsuarioController;

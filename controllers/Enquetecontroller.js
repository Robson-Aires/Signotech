const CreateEnquete = require('../models/CreateEnquete'); // Modelo da tabela de enquetes

// Função para listar todas as enquetes
exports.listarEnquetes = async (req, res) => {
    try {
        const enquetes = await CreateEnquete.findAll(); // Obtém todas as enquetes
        return res.status(200).json(enquetes);
    } catch (error) {
        console.error('Erro ao listar enquetes:', error);
        return res.status(500).json({ message: 'Erro ao listar enquetes', error: error.message });
    }
};

// Função para criar nova enquete
exports.criarEnquete = async (req, res) => {
    // console.log('Requisição recebida:', req.body);

    try {
        const { titulo, data_inicio, data_fim, usuario_id } = req.body;
        console.log('Dados desestruturados:', { titulo, data_inicio, data_fim, usuario_id });

        // Validações
        if (!titulo || !data_inicio || !data_fim || !usuario_id) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
        }

        // Verificar se as datas são válidas
        if (isNaN(Date.parse(data_inicio)) || isNaN(Date.parse(data_fim))) {
            return res.status(400).json({ message: 'As datas fornecidas são inválidas!' });
        }

        // Criação da enquete
        const enquete = await CreateEnquete.create({
            titulo,
            data_inicio,
            data_fim,
            usuario_id,
        });

        return res.status(201).json(enquete);
    } catch (error) {
        console.error('Erro ao criar a enquete:', error);
        return res.status(500).json({ message: 'Erro ao criar a enquete', error: error.message });
    }
};

// Função para editar uma enquete
exports.editarEnquete = async (req, res) => {
    const { id } = req.params;
    const { titulo, data_inicio, data_fim, usuario_id } = req.body;

    try {
        const enquete = await CreateEnquete.findByPk(id);

        if (!enquete) {
            return res.status(404).json({ message: 'Enquete não encontrada' });
        }

        // Verifica e atualiza as informações
        enquete.titulo = titulo || enquete.titulo;
        enquete.data_inicio = data_inicio || enquete.data_inicio;
        enquete.data_fim = data_fim || enquete.data_fim;
        enquete.usuario_id = usuario_id || enquete.usuario_id;

        // Salva as alterações
        await enquete.save();

        return res.status(200).json(enquete);
    } catch (error) {
        console.error('Erro ao editar a enquete:', error);
        return res.status(500).json({ message: 'Erro ao editar a enquete', error: error.message });
    }
};

// Função para excluir uma enquete
exports.excluirEnquete = async (req, res) => {
    const { id } = req.params;

    try {
        const enquete = await CreateEnquete.findByPk(id);

        if (!enquete) {
            return res.status(404).json({ message: 'Enquete não encontrada' });
        }

        // Exclui a enquete
        await enquete.destroy();

        return res.status(200).json({ message: 'Enquete excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir a enquete:', error);
        return res.status(500).json({ message: 'Erro ao excluir a enquete', error: error.message });
    }
};

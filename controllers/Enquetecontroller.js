const CreateEnquete = require('../models/CreateEnquete');
const OpcoesDaEnquete = require('../models/OpcoesDaEnquete');

// Criar nova enquete
async function criarEnquete(req, res) {
    const { titulo, data_inicio, data_fim, usuario_id } = req.body;

    try {
        const enquete = await CreateEnquete.create({ titulo, data_inicio, data_fim, usuario_id });
        res.status(201).json(enquete);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Listar enquetes
async function listarEnquetes(req, res) {
    try {
        const enquetes = await CreateEnquete.findAll();
        res.status(200).json(enquetes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Editar enquete
async function editarEnquete(req, res) {
    const { id } = req.params;
    const { titulo, data_inicio, data_fim } = req.body;

    try {
        const enquete = await CreateEnquete.findByPk(id);
        if (enquete) {
            enquete.titulo = titulo;
            enquete.data_inicio = data_inicio;
            enquete.data_fim = data_fim;
            await enquete.save();
            res.status(200).json(enquete);
        } else {
            res.status(404).json({ message: "Enquete não encontrada!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Excluir enquete
async function excluirEnquete(req, res) {
    const { id } = req.params;

    try {
        const enquete = await CreateEnquete.findByPk(id);
        if (enquete) {
            await enquete.destroy();
            res.status(200).json({ message: "Enquete excluída com sucesso!" });
        } else {
            res.status(404).json({ message: "Enquete não encontrada!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { criarEnquete, listarEnquetes, editarEnquete, excluirEnquete };

// controllers/OpcoesDaEnqueteController.js
const OpcoesDaEnquete = require('../models/OpcoesDaEnquete');

// Criar opção
exports.criarOpcao = async (req, res) => {
  try {
    const { enquete_id, opcao } = req.body;
    console.log('Requisição recebida:', req.body);
    console.log('Modelo OpcoesDaEnquete:', OpcoesDaEnquete);

    // Tenta criar a nova opção no banco de dados
    const novaOpcao = await OpcoesDaEnquete.create({ enquete_id, opcao });

    res.status(201).json(novaOpcao);
  } catch (error) {
    // Log detalhado para debug
    console.error('Erro ao criar opção:', error);

    // Retorna uma mensagem com a descrição completa do erro
    res.status(500).json({
      message: 'Erro ao criar opção',
      error: error.message || 'Erro desconhecido',
    });
  }
};

// Listar opções por enquete
exports.listarOpcoes = async (req, res) => {
  try {
    const { enqueteId } = req.params;
    const opcoes = await OpcoesDaEnquete.findAll({ where: { enquete_id: enqueteId } });
    res.status(200).json(opcoes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar opções', error });
  }
};

// Editar opção
exports.editarOpcao = async (req, res) => {
  try {
    const { id } = req.params;
    const { opcao } = req.body;
    const opcaoExistente = await OpcoesDaEnquete.findByPk(id);

    if (!opcaoExistente) {
      return res.status(404).json({ message: 'Opção não encontrada' });
    }

    opcaoExistente.opcao = opcao || opcaoExistente.opcao;
    await opcaoExistente.save();
    res.status(200).json(opcaoExistente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar a opção', error });
  }
};

// Excluir opção
exports.excluirOpcao = async (req, res) => {
  try {
    const { id } = req.params;
    const opcao = await OpcoesDaEnquete.findByPk(id);

    if (!opcao) {
      return res.status(404).json({ message: 'Opção não encontrada' });
    }

    await opcao.destroy();
    res.status(200).json({ message: 'Opção excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir a opção', error });
  }
};

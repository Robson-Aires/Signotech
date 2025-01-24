const OpcoesDaEnquete = require('../models/OpcoesDaEnquete');

// Criar opção
exports.criarOpcao = async (req, res) => {
  try {
    const { enquete_id, opcao } = req.body;

    // Cria a nova opção no banco de dados
    const novaOpcao = await OpcoesDaEnquete.create({ enquete_id, opcao });

    res.status(201).json(novaOpcao);
  } catch (error) {
    console.error('Erro ao criar opção:', error);
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

    // Retorna todas as opções da enquete com a contagem de votos
    const opcoes = await OpcoesDaEnquete.findAll({
      where: { enquete_id: enqueteId }
    });

    res.status(200).json(opcoes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar opções', error });
  }
};

// Incrementar votos para uma opção
exports.incrementarVoto = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca a opção correspondente
    const opcao = await OpcoesDaEnquete.findByPk(id);

    if (!opcao) {
      return res.status(404).json({ message: 'Opção não encontrada' });
    }

    // Incrementa o contador de votos
    opcao.votos += 1;
    await opcao.save();

    res.status(200).json(opcao);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao incrementar voto', error });
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

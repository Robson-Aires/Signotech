const Voto = require('../models/Voto');
const OpcoesDaEnquete = require('../models/OpcoesDaEnquete');
const sequelize = require('sequelize');

// Registrar voto
exports.registrarVoto = async (req, res) => {
  try {
    const { opcao_id, usuario_id, create_at } = req.body;
    console.log('Requisição recebida:', req.body);

    // Criar um novo voto no banco
    const novoVoto = await Voto.create({
      opcao_id,
      usuario_id,
      create_at,
    });

    // Incrementar o número de votos na tabela 'opcoes_da_enquete'
    const opcao = await OpcoesDaEnquete.findByPk(opcao_id); // Busca a opção correspondente
    if (!opcao) {
      return res.status(404).json({ message: 'Opção não encontrada' });
    }

    opcao.votos = (opcao.votos || 0) + 1; // Incrementa o total de votos
    await opcao.save(); // Salva a atualização no banco

    // Emitir o evento 'novo_voto' para todos os clientes conectados via WebSocket
    req.app.get('io').emit('novo_voto', { opcao_id });

    // Retornar a resposta para o front-end
    res.status(201).json({ message: 'Voto registrado com sucesso', novoVoto, opcao });
  } catch (error) {
    console.error('Erro ao registrar o voto:', error);
    res.status(500).json({ message: 'Erro ao registrar o voto', error });
  }
};

// Listar votos (contar votos por opção)
exports.listarVotos = async (req, res) => {
  try {
    // Contar os votos por opção (opcao_id)
    const votos = await Voto.findAll({
      attributes: [
        'opcao_id', // Seleciona o ID da opção
        [sequelize.fn('COUNT', sequelize.col('opcao_id')), 'total_votos'], // Conta os votos por opcao_id
      ],
      group: ['opcao_id'], // Agrupa os votos pela opção
    });

    res.status(200).json(votos); // Retorna os votos por opção
  } catch (error) {
    console.error('Erro ao listar os votos:', error);
    res.status(500).json({ message: 'Erro ao listar os votos', error });
  }
};

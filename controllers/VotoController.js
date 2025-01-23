const Voto = require('../models/Voto');

// Registrar voto
exports.registrarVoto = async (req, res) => {
  try {
    const { opcao_id, usuario_id, create_at } = req.body;
    console.log('Requisição recebida:', req.body);
    
    // Criando um novo voto
    const novoVoto = await Voto.create({
      opcao_id,
      usuario_id,
      create_at,
    });

    // Emitir o evento 'novo_voto' para todos os clientes conectados
    req.app.get('io').emit('novo_voto', { opcao_id });

    res.status(201).json(novoVoto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar o voto', error });
  }
};

// Listar votos
exports.listarVotos = async (req, res) => {
  try {
    const votos = await Voto.findAll();
    res.status(200).json(votos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar os votos', error });
  }
};

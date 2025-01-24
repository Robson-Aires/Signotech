import React, { useState } from 'react';
import axios from 'axios';

function CriarEnquete() {
  const [titulo, setTitulo] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [opcoes, setOpcoes] = useState(['', '', '']);

  const handleCriarEnquete = async (e) => {
    e.preventDefault();

    // Verifique se todos os campos estão preenchidos
    if (!titulo || !dataInicio || !dataFim || opcoes.some(opcao => opcao.trim() === '')) {
      console.error('Todos os campos são obrigatórios!');
      return;
    }

    try {
      // Enviando os dados para o backend
      const response = await axios.post('http://localhost:3000/enquete', {
        titulo,
        data_inicio: dataInicio,
        data_fim: dataFim,
        usuario_id: 1, // Certifique-se de que está passando o id do usuário corretamente
        opcoes,
      });

      console.log('Enquete criada:', response.data);
    } catch (error) {
      console.error('Erro ao criar enquete:', error);
    }
  };

  const handleOpcaoChange = (index, value) => {
    const novasOpcoes = [...opcoes];
    novasOpcoes[index] = value;
    setOpcoes(novasOpcoes);
  };

  const adicionarOpcao = () => {
    if (opcoes.length < 5) {
      setOpcoes([...opcoes, '']);
    }
  };

  const removerOpcao = (index) => {
    if (opcoes.length > 3) {
      const novasOpcoes = opcoes.filter((_, i) => i !== index);
      setOpcoes(novasOpcoes);
    }
  };

  return (
    <div>
      <h1>Criar Enquete</h1>
      <form onSubmit={handleCriarEnquete}>
        <input
          type="text"
          placeholder="Título da enquete"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Data de Início"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Data de Fim"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
        {opcoes.map((opcao, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Opção ${index + 1}`}
              value={opcao}
              onChange={(e) => handleOpcaoChange(index, e.target.value)}
            />
            <button type="button" onClick={() => removerOpcao(index)} disabled={opcoes.length <= 3}>Remover</button>
          </div>
        ))}
        <button type="button" onClick={adicionarOpcao}>Adicionar Opção</button>
        <button type="submit">Criar Enquete</button>
      </form>
    </div>
  );
}

export default CriarEnquete;

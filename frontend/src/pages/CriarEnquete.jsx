import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate
import axios from 'axios';
import './criarenquete.css'; // Importando o arquivo CSS

function CriarEnquete() {
  const [titulo, setTitulo] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [opcoes, setOpcoes] = useState(['', '', '']);
  const navigate = useNavigate(); // Inicializando o navigate

  const handleCriarEnquete = async (e) => {
    e.preventDefault();

    if (!titulo || !dataInicio || !dataFim || opcoes.some(opcao => opcao.trim() === '')) {
      console.error('Todos os campos são obrigatórios!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/enquete', {
        titulo,
        data_inicio: dataInicio,
        data_fim: dataFim,
        usuario_id: 1,
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
    <div className="criar-enquete-container">
      <h1>Criar Enquete</h1>
      <form className="criar-enquete-form" onSubmit={handleCriarEnquete}>
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
          <div className="opcao-container" key={index}>
            <input
              type="text"
              placeholder={`Opção ${index + 1}`}
              value={opcao}
              onChange={(e) => handleOpcaoChange(index, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removerOpcao(index)}
              disabled={opcoes.length <= 3}
            >
              Remover
            </button>
          </div>
        ))}
        <button type="button" onClick={adicionarOpcao}>
          Adicionar Opção
        </button>
        <button type="submit">Criar Enquete</button>
        <button type="button" onClick={() => navigate('/dashboard')}>
          Voltar para o Dashboard
        </button>
      </form>
    </div>
  );
}

export default CriarEnquete;

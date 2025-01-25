import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import './visualizarEnquete.css';

function VisualizarEnquete() {
  const [enquete, setEnquete] = useState(null);
  const [opcoes, setOpcoes] = useState([]);
  const [voto, setVoto] = useState(null);
  const [ativa, setAtiva] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const obterStatus = (dataInicio, dataFim) => {
    const agora = new Date();
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    if (inicio > agora) {
      return "Não Iniciada";
    } else if (agora >= inicio && agora <= fim) {
      return "Em Andamento";
    } else {
      return "Finalizada";
    }
  };

  useEffect(() => {
    const socket = io('ws://localhost:3000', { transports: ['websocket'] });

    socket.on('novo_voto', (data) => {
      setOpcoes((prevOpcoes) =>
        prevOpcoes.map((opcao) =>
          opcao.id === data.opcao_id
            ? { ...opcao, votos: (opcao.votos || 0) + 1 }
            : opcao
        )
      );
    });

    const fetchEnquete = async () => {
      try {
        const enqueteResponse = await axios.get('http://localhost:3000/enquetes');
        const enqueteData = enqueteResponse.data.find((e) => e.id === parseInt(id, 10));

        if (!enqueteData) {
          console.error(`Enquete com ID ${id} não encontrada.`);
          return;
        }

        const inicio = new Date(enqueteData.data_inicio);
        const fim = new Date(enqueteData.data_fim);

        setEnquete({
          ...enqueteData,
          data_inicio: inicio,
          data_fim: fim,
        });

        const opcoesResponse = await axios.get(`http://localhost:3000/opcoes/${id}`);
        const opcoesComVotos = opcoesResponse.data.map((opcao) => ({
          ...opcao,
          votos: opcao.votos || 0,
        }));
        setOpcoes(opcoesComVotos);

        const agora = new Date();
        setAtiva(inicio && fim && agora >= inicio && agora <= fim);
      } catch (error) {
        console.error('Erro ao buscar dados da enquete:', error);
      }
    };

    fetchEnquete();

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const handleVotar = async (opcaoId) => {
    try {
      const usuarioId = 1;
      const createAt = new Date().toISOString();

      await axios.post('http://localhost:3000/voto', {
        opcao_id: opcaoId,
        usuario_id: usuarioId,
        create_at: createAt,
      });

      const opcoesResponse = await axios.get(`http://localhost:3000/opcoes/${id}`);
      const opcoesAtualizadas = opcoesResponse.data.map((opcao) => ({
        ...opcao,
        votos: opcao.votos || 0,
      }));
      setOpcoes(opcoesAtualizadas);

      setVoto(opcaoId);
    } catch (error) {
      console.error('Erro ao registrar voto:', error);
    }
  };

  const handleApagarEnquete = async () => {
    if (window.confirm('Tem certeza que deseja apagar esta enquete?')) {
      try {
        await axios.delete(`http://localhost:3000/enquete/${id}`);
        alert('Enquete apagada com sucesso!');
        navigate('/dashboard'); // Redireciona para o dashboard após apagar
      } catch (error) {
        console.error('Erro ao apagar enquete:', error);
        alert('Ocorreu um erro ao tentar apagar a enquete.');
      }
    }
  };

  if (!enquete) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="visualizar-enquete-container">
      <h1>{enquete.titulo}</h1>
      <p>
        <strong>Início:</strong> {enquete.data_inicio.toLocaleString()} |{' '}
        <strong>Fim:</strong> {enquete.data_fim.toLocaleString()}
      </p>
      <p
        className={`status status-${obterStatus(
          enquete.data_inicio,
          enquete.data_fim
        )
          .toLowerCase()
          .replace(' ', '-')}`}
      >
        Status: {obterStatus(enquete.data_inicio, enquete.data_fim)}
      </p>
      {!ativa && <p className="enquete-inativa">Enquete encerrada ou ainda não iniciada</p>}
      <div className="opcoes-container">
        <h3>Opções:</h3>
        {opcoes.map((opcao) => (
          <div className="opcao-item" key={opcao.id}>
            <button onClick={() => handleVotar(opcao.id)} disabled={!ativa || voto !== null}>
              {opcao.opcao}
            </button>
            <span> - {opcao.votos} votos</span>
          </div>
        ))}
      </div>
      <button className="botao-voltar" onClick={() => navigate('/dashboard')}>
        Voltar ao Dashboard
      </button>
      <button className="botao-apagar" onClick={handleApagarEnquete}>
        Apagar Enquete
      </button>
    </div>
  );
}

export default VisualizarEnquete;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

function VisualizarEnquete() {
  const [enquete, setEnquete] = useState(null);
  const [opcoes, setOpcoes] = useState([]);
  const [voto, setVoto] = useState(null); // Voto do usuário
  const [ativa, setAtiva] = useState(false); // Estado da enquete (ativa ou não)
  const { id } = useParams();
  const navigate = useNavigate();

  // Função para determinar o status da enquete
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
    const socket = io('ws://localhost:3000', {
      transports: ['websocket'],
    });

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
        // Buscar TODAS as enquetes
        const enqueteResponse = await axios.get('http://localhost:3000/enquetes');
        const enqueteData = enqueteResponse.data.find((e) => e.id === parseInt(id, 10));

        if (!enqueteData) {
          console.error(`Enquete com ID ${id} não encontrada.`);
          return;
        }

        // Garantir que as datas sejam válidas
        const inicio = enqueteData.data_inicio ? new Date(enqueteData.data_inicio) : null;
        const fim = enqueteData.data_fim ? new Date(enqueteData.data_fim) : null;

        setEnquete({
          ...enqueteData,
          data_inicio: inicio,
          data_fim: fim,
        });

        // Buscar as opções associadas à enquete
        const opcoesResponse = await axios.get(`http://localhost:3000/opcoes/${id}`);
        const opcoesComVotos = opcoesResponse.data.map((opcao) => ({
          ...opcao,
          votos: opcao.votos || 0, // Garantir que votos exista
        }));
        setOpcoes(opcoesComVotos);

        // Verificar se a enquete está ativa
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
      const usuarioId = 1; // Simulação do ID do usuário logado
      const createAt = new Date().toISOString();

      await axios.post('http://localhost:3000/voto', {
        opcao_id: opcaoId,
        usuario_id: usuarioId,
        create_at: createAt,
      });

      // Buscar novamente os votos para sincronizar
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

  if (!enquete) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>{enquete.titulo}</h1>
      <p>
        Início: {enquete.data_inicio?.toLocaleString() || 'Data inválida'} | 
        Fim: {enquete.data_fim?.toLocaleString() || 'Data inválida'} | 
        Status: {obterStatus(enquete.data_inicio, enquete.data_fim)}
      </p>
      {!ativa && <p style={{ color: 'red' }}>Enquete encerrada ou ainda não iniciada</p>}
      <div>
        <h3>Opções:</h3>
        {opcoes.map((opcao) => (
          <div key={opcao.id}>
            <button onClick={() => handleVotar(opcao.id)} disabled={!ativa || voto !== null}>
              {opcao.opcao}
            </button>
            <span> - {opcao.votos} votos</span>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/dashboard')}>Voltar ao Dashboard</button>
    </div>
  );
}

export default VisualizarEnquete;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [enquetes, setEnquetes] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1); // Página atual
  const enquetesPorPagina = 3; // Quantidade de enquetes por página
  const navigate = useNavigate();

  const obterStatus = (dataInicio, dataFim) => {
    const agora = new Date();
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    if (inicio > agora) return "Não-Iniciada";
    else if (agora >= inicio && agora <= fim) return "Em-Andamento";
    else return "Finalizada";
  };

  useEffect(() => {
    const fetchEnquetes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/enquetes');
        setEnquetes(response.data);
      } catch (error) {
        console.error('Erro ao buscar enquetes:', error);
      }
    };
    fetchEnquetes();
  }, []);

  // Calculando os índices das enquetes para exibir na página atual
  const indiceInicio = (paginaAtual - 1) * enquetesPorPagina;
  const indiceFim = indiceInicio + enquetesPorPagina;
  const enquetesExibidas = enquetes.slice(indiceInicio, indiceFim);

  // Funções para navegar entre páginas
  const proximaPagina = () => {
    if (indiceFim < enquetes.length) setPaginaAtual(paginaAtual + 1);
  };

  const paginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1>Dashboard</h1>
        <button onClick={() => navigate('/criar-enquete')}>Criar Enquete</button>
        <ul>
          {enquetesExibidas.map((enquete) => (
            <li key={enquete.id}>
              <h3>{enquete.titulo}</h3>
              <p>
                Início: {new Date(enquete.data_inicio).toLocaleString()} | Fim: {new Date(enquete.data_fim).toLocaleString()} | 
                <span className={obterStatus(enquete.data_inicio, enquete.data_fim).toLowerCase()}>
                          Status: {obterStatus(enquete.data_inicio, enquete.data_fim)}
                        </span>
              </p>
              <button onClick={() => navigate(`/visualizar-enquete/${enquete.id}`)}>
                Visualizar
              </button>
            </li>
          ))}
        </ul>
        <div className="pagination">
          <button onClick={paginaAnterior} disabled={paginaAtual === 1}>
            Voltar
          </button>
          <span>Página {paginaAtual}</span>
          <button onClick={proximaPagina} disabled={indiceFim >= enquetes.length}>
            Avançar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

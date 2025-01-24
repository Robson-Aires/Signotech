import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [enquetes, setEnquetes] = useState([]);
  const navigate = useNavigate();

  // Função para determinar o status da enquete
  const obterStatus = (dataInicio, dataFim) => {
    const agora = new Date();
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    // Se a data de início for maior que a data atual, está "Não Iniciada"
    if (inicio > agora) {
      return "Não Iniciada";
    }
    // Se a data atual estiver entre a data de início e a data de fim, está "Em Andamento"
    else if (agora >= inicio && agora <= fim) {
      return "Em Andamento";
    }
    // Caso contrário, está "Finalizada"
    else {
      return "Finalizada";
    }
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

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/criar-enquete')}>Criar Enquete</button>
      <ul>
        {enquetes.map((enquete) => (
          <li key={enquete.id}>
            <h3>{enquete.titulo}</h3>
            <p>
              Início: {new Date(enquete.data_inicio).toLocaleString()} | Fim: {new Date(enquete.data_fim).toLocaleString()} | 
              Status: {obterStatus(enquete.data_inicio, enquete.data_fim)}
            </p>
            <button onClick={() => navigate(`/visualizar-enquete/${enquete.id}`)}>
              Visualizar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

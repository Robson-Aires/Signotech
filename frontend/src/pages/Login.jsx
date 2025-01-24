import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UsuarioForm.css';
import background from '../image/login.png';

function UsuarioForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleCriarUsuario = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando dados:', { nome, email });

      const response = await axios.post('http://localhost:3000/usuarios', {
        nome,
        email,
      });

      console.log('Resposta recebida:', response);
      navigate('/dashboard');

      if (response && response.data) {
        alert('Usuário criado com sucesso!');
      } else {
        console.warn('Resposta inesperada do servidor:', response);
        alert('Erro inesperado na criação do usuário.');
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);

      if (error.response) {
        console.error('Erro do servidor:', error.response.data);
        alert(`Erro: ${error.response.data.error || 'Erro no servidor'}`);
      } else if (error.request) {
        console.error('Nenhuma resposta do servidor:', error.request);
        alert('Nenhuma resposta do servidor. Verifique sua conexão.');
      } else {
        console.error('Erro desconhecido:', error.message);
        alert('Erro desconhecido. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className="usuario-form">
      <form onSubmit={handleCriarUsuario}>
      <h1>Cadastrar Voto</h1>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      <img src={background} alt="" />
    </div>
  );
}

export default UsuarioForm;

const io = require('socket.io-client');

// Conecte ao servidor
const socket = io('http://localhost:3000');

// Quando a conexão for bem-sucedida
socket.on('connect', () => {
  console.log('Conectado ao servidor Socket.IO');
});

// Quando um novo voto for emitido
socket.on('novo_voto', (data) => {
  console.log('Evento de novo voto recebido:', data);
});

// Quando desconectar
socket.on('disconnect', () => {
  console.log('Desconectado do servidor');
});

const io = require('socket.io-client');

// Conecte ao servidor
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Conectado ao servidor Socket.IO');
});

socket.on('novo_voto', (data) => {
  console.log('Evento de novo voto recebido:', data);
});

socket.on('disconnect', () => {
  console.log('Desconectado do servidor');
});

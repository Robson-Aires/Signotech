const express = require('express');
const http = require('http'); // Para usar WebSockets
const { Server } = require('socket.io'); // Para usar o Socket.IO

const app = express();
const cors = require('cors');

// Importar as rotas
const enqueteRoutes = require('./routes/enqueteRoutes');
const votoRoutes = require('./routes/votoRoutes');
const opcaoEnquete = require('./routes/opcaoEnquete');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Criar o servidor HTTP
const server = http.createServer(app);

// Criar o servidor Socket.IO
const io = new Server(server);

// isso serve para conectar back com o front-end
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));


// Disponibilizar o `io` para as rotas
app.set('io', io);

// Middleware para parse de JSON
app.use(express.json());

// Usar as rotas
app.use(enqueteRoutes);
app.use(votoRoutes);
app.use(opcaoEnquete);
app.use(usuarioRoutes);

// Lidar com a conexão do cliente usando Socket.IO
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');
  
  // Ouvir a desconexão do cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar o servidor
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

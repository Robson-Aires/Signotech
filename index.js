const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const cors = require('cors');

const enqueteRoutes = require('./routes/enqueteRoutes');
const votoRoutes = require('./routes/votoRoutes');
const opcaoEnquete = require('./routes/opcaoEnquete');
const usuarioRoutes = require('./routes/usuarioRoutes');

const server = http.createServer(app);

const io = new Server(server);

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));


app.set('io', io);

app.use(express.json());

app.use(enqueteRoutes);
app.use(votoRoutes);
app.use(opcaoEnquete);
app.use(usuarioRoutes);

io.on('connection', (socket) => {
  console.log('Novo cliente conectado');
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

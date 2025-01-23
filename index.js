const express = require('express');
const app = express();

// Importar as rotas
const enqueteRoutes = require('./routes/enqueteRoutes');
const votoRoutes = require('./routes/votoRoutes');
const opcaoEnquete = require('./routes/opcaoEnquete');
const usuarioRoutes = require('./routes/usuarioRoutes');


// Middleware para parse de JSON
app.use(express.json());  // Aqui é suficiente para lidar com JSON

// Usar as rotas
app.use(enqueteRoutes);
app.use(votoRoutes);
app.use(opcaoEnquete);
app.use(usuarioRoutes);


// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  // console.log(`Servidor rodando na porta ${port}`);
});

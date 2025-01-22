const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const sequelize = require('./db');

// Configurar o express
app.use(bodyParser.json());

// Rotas
app.use('/api', routes);

// Sincronizar banco de dados
sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado!");
}).catch((error) => {
    console.error("Erro ao sincronizar banco de dados:", error);
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

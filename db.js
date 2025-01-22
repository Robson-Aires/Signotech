const Sequelize = require('sequelize');

const componentSequelize = new Sequelize('Sistema_de_votação', 'root', '',
    {
        dialect:'mysql', host: 'localhost', port: '3306'
    }
);

module.exports = componentSequelize;
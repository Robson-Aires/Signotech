const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Importando a conexão

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    date_create_user: {
        type: DataTypes.DATE, // Corrigido para DataTypes.DATE
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;

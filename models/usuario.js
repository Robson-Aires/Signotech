const { DataTypes } = require('sequelize');
const sequelize = require('../db');

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
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    date_create_user: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;

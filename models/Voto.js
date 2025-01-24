const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Voto = sequelize.define('Voto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    opcao_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usuario_id: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false
    },
    create_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'voto',
    timestamps: false
});

module.exports = Voto;

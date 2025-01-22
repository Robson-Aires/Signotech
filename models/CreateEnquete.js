const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuario = require('./usuario');

const CreateEnquete = sequelize.define('CreateEnquete', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull: false
    },
    usuario_id: {
        type: DataTypes.SMALLINT,
        allowNull: false
    }
}, {
    tableName: 'create_enquete',
    timestamps: false
});

// Relacionamento
CreateEnquete.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(CreateEnquete, { foreignKey: 'usuario_id' });

module.exports = CreateEnquete;

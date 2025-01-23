const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const CreateEnquete = require('./CreateEnquete');

const OpcoesDaEnquete = sequelize.define('opcoes_da_enquete', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    enquete_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    opcao: {
        type: DataTypes.STRING(190),
        allowNull: false
    }
}, {
    tableName: 'opcoes_da_enquete',
    timestamps: false
});

// Relacionamento
OpcoesDaEnquete.belongsTo(CreateEnquete, { foreignKey: 'enquete_id' });
CreateEnquete.hasMany(OpcoesDaEnquete, { foreignKey: 'enquete_id' });

module.exports = OpcoesDaEnquete;

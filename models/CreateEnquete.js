const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 
const Usuario = require('./usuario');

const CreateEnquete = sequelize.define('create_enquete', {
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
    tableName: 'create_enquete', // Nome da tabela no banco
    timestamps: false
});

sequelize.sync()
  .then(() => console.log('Tabela create_enquete sincronizada com sucesso'))
  .catch((err) => console.log('Erro ao sincronizar tabela:', err));
  
// Relacionamento com a tabela `usuarios`
CreateEnquete.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(CreateEnquete, { foreignKey: 'usuario_id' });

module.exports = CreateEnquete;  // Certifique-se de que está exportando o modelo corretamente

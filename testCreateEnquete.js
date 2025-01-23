const CreateEnquete = require('./models/CreateEnquete');  // Caminho correto para o modelo

CreateEnquete.create({
  titulo: 'Enquete de Teste',
  data_inicio: new Date('2025-01-22T10:00:00'),
  data_fim: new Date('2025-01-23T10:00:00'),
  usuario_id: 1
})
.then(enquete => {
  console.log('Enquete criada com sucesso:', enquete);
})
.catch(err => {
  console.error('Erro ao criar enquete:', err);
});

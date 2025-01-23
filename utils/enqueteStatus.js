function calcularStatus(dataInicio, dataFim) {
    const agora = new Date();
  
    if (agora < new Date(dataInicio)) {
      return 'Não iniciada';
    } else if (agora > new Date(dataFim)) {
      return 'Finalizada';
    } else {
      return 'Em andamento';
    }
  }
  
  module.exports = calcularStatus;
  
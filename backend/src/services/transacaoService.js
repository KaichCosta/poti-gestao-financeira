const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  async function criarNovaTransacao ({ usuarioId, descricao, valor, data, metodoPagamento, tipoGasto}) {
    const valorDecimal = parseFloat(valor);
    const dataFormatada = data ? new Date(data) : new Date();

    return await prisma.transacao.create({
      data: {
        usuarioId: usuarioId,
        descricao,
        valor: valorDecimal,
        data: dataFormatada,
        metodoPagamento: metodoPagamento,
        tipoGasto: tipoGasto
      }
  });
}

module.exports = {
  criarNovaTransacao
};
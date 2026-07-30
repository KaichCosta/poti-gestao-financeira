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

const listarHistorico = async ({ usuarioId, mes, ano, pote, pagina, limite }) => {
  const itensPorPagina = Number(limite) || 20;
  const paginaAtual = Number(pagina) || 1;
  const offset = (paginaAtual - 1) * itensPorPagina;

  const filtros = {
    usuarioId: usuarioId,
  };

  if (pote) {
    const mapaPotes = {
      'fixos': 'Fixo',
      'nao_essenciais': 'Não Essencial',
      'investimentos': 'Investimento'
    };
    
    // Se o frontend mandar 'fixos', o Prisma vai buscar por 'Fixo' na coluna tipoGasto
    filtros.tipoGasto = mapaPotes[pote] || pote; 
  }

  if (mes && ano) {
    const dataInicio = new Date(ano, mes - 1, 1);
    const dataFim = new Date(ano, mes, 0, 23, 59, 59, 999);
    
    filtros.data = {
      gte: dataInicio,
      lte: dataFim
    };
  }

  // 3. Executando as Queries no Prisma (em paralelo para performance)
  const [transacoes, totalRegistros] = await Promise.all([
    prisma.transacao.findMany({
      where: filtros,
      orderBy: { data: 'desc' },
      skip: offset,
      take: itensPorPagina,
    }),
    prisma.transacao.count({
      where: filtros,
    })
  ]);

  // 4. Retornando os dados formatados para o Frontend
  return {
    transacoes,
    paginacao: {
      paginaAtual,
      itensPorPagina,
      totalRegistros,
      totalPaginas: Math.ceil(totalRegistros / itensPorPagina),
    }
  };
};

module.exports = {
  criarNovaTransacao,
  listarHistorico
};
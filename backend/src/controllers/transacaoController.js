const transacaoService = require('../services/transacaoService');

async function criar(req, res) {
  try {
    const usuarioId = req.usuarioId; // Injetado pelo middleware de autenticação
    const { descricao, valor, data, metodoPagamento, tipoGasto } = req.body;

    // Validação de dados de entrada simples
    if (!descricao || !valor || !metodoPagamento || !tipoGasto) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    // Validação de Tipos de Gasto permitidos
    const tiposPermitidos = ['Fixo', 'Não Essencial', 'Investimento'];
    if (!tiposPermitidos.includes(tipoGasto)) {
      return res.status(400).json({ error: 'Tipo de gasto inválido.' });
    }

    // Validação de Métodos de Pagamento permitidos
    const metodosPermitidos = ['Pix', 'Crédito', 'Débito', 'Dinheiro'];
    if (!metodosPermitidos.includes(metodoPagamento)) {
      return res.status(400).json({ error: 'Método de pagamento inválido.' });
    }

    const transacao = await transacaoService.criarNovaTransacao({
      usuarioId,
      descricao,
      valor,
      data,
      metodoPagamento: metodoPagamento,
      tipoGasto: tipoGasto
    });

    return res.status(201).json({
      message: 'Lançamento registrado com sucesso!',
      transacao
    });
  } catch (error) {
    console.error('Erro no lançamento de transação:', error);
    return res.status(500).json({ error: 'Erro ao registrar despesa.' });
  }
}
async function buscarTransacoes(req, res) {
  try {
    const usuarioId = req.usuarioId; 
    const { mes, ano, pote, pagina, limite } = req.query;

    const resultado = await transacaoService.listarHistorico({
      usuarioId,
      mes: mes ? Number(mes) : null,
      ano: ano ? Number(ano) : null,
      pote,
      pagina,
      limite
    });

    return res.status(200).json(resultado);
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    return res.status(500).json({ erro: "Erro interno ao buscar as transações." });
  }
};

module.exports = {
  criar,
  buscarTransacoes
};
const transacaoService = require('../services/transacaoService');

async function criar(req, res) {
  try {
    const usuarioId = req.usuarioId; // Injetado pelo middleware de autenticação
    const { descricao, valor, data, metodo_pagamento, tipo_gasto } = req.body;

    // Validação de dados de entrada simples
    if (!descricao || !valor || !metodo_pagamento || !tipo_gasto) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    // Validação de Tipos de Gasto permitidos
    const tiposPermitidos = ['Fixo', 'Não Essencial', 'Investimento'];
    if (!tiposPermitidos.includes(tipo_gasto)) {
      return res.status(400).json({ error: 'Tipo de gasto inválido.' });
    }

    // Validação de Métodos de Pagamento permitidos
    const metodosPermitidos = ['Pix', 'Crédito', 'Débito', 'Dinheiro'];
    if (!metodosPermitidos.includes(metodo_pagamento)) {
      return res.status(400).json({ error: 'Método de pagamento inválido.' });
    }

    const transacao = await transacaoService.criarNovaTransacao({
      usuarioId,
      descricao,
      valor,
      data,
      metodoPagamento: metodo_pagamento,
      tipoGasto: tipo_gasto
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

module.exports = {
  criar
};
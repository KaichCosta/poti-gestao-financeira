import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function criarNovaTransacao ({ usuarioId, descricao, valor, data, metodoPagamento, tipoGasto}) {
    const valorDecimal = parseFloat(valor);
    const dataFormatada = data ? new Date(data) : new Date();

    return await prisma.transacoes.create({
    data: {
      usuario_id: usuarioId,
      descricao,
      valor: valorDecimal,
      data: dataFormatada,
      metodo_pagamento: metodoPagamento,
      tipo_gasto: tipoGasto
    }
  });
}
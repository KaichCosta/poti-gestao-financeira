const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function salvarConfiguracao(usuarioId, dados) {
    const { receitaMensal, porcentagemFixos, porcentagemNaoEssenc, porcentagemInvest, diaResetOrcamento } = dados;

    // Validação sênior: a soma das porcentagens precisa dar exatamente 100%
    if (porcentagemFixos + porcentagemNaoEssenc + porcentagemInvest !== 100) {
        throw new Error('A soma dos potes precisa ser exatamente 100%.');
    }

    // Buscamos se já existe ou criamos/atualizamos usando o ID único mapeado na Sprint 1
    return await prisma.configuracaoOrcamento.upsert({
        where: { usuarioId: usuarioId },
        update: {
            receitaMensal,
            porcentagemFixos,
            porcentagemNaoEssenc,
            porcentagemInvest,
            diaResetOrcamento
        },
        create: {
            usuarioId,
            receitaMensal,
            porcentagemFixos,
            porcentagemNaoEssenc,
            porcentagemInvest,
            diaResetOrcamento
        }
    });
}

module.exports = { salvarConfiguracao };
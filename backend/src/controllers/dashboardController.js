const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function obterDashboard(req, res) {
    try {
        const usuarioId = req.usuarioId; // ID injetado pelo seu middleware verificarJWT

        const configuracao = await prisma.ConfiguracaoOrcamento.findUnique({
            where: { usuarioId: usuarioId },
        });

        // Se o utilizador ainda não passou pelo Onboarding, não tem configuração
        if (!configuracao) {
            return res.status(200).json({
                configuracao: null,
                gastos: null,
            });
        }

        const hoje = new Date();
        const diaReset = Number(configuracao?.diaResetOrcamento) || 1;

        let anoInicio = hoje.getFullYear();
        let mesInicio = hoje.getMonth(); // 0 a 11

        // Se hoje ainda não chegou no dia de reset deste mês, o ciclo começou no mês anterior
        if (hoje.getDate() < diaReset) {
        mesInicio -= 1;
            if (mesInicio < 0) {
                mesInicio = 11;
                anoInicio -= 1;
            }
        }

        const dataInicioCiclo = new Date(anoInicio, mesInicio, diaReset, 0, 0, 0, 0);

        console.log("================================");
        console.log("Hoje:", hoje.toISOString());
        console.log("Dia reset:", diaReset);
        console.log("Início ciclo:", dataInicioCiclo.toISOString());
        console.log("================================");
        // 3. Fazer o cálculo consolidado na Base de Dados (GROUP BY e SUM)
        const agrupamentoGastos = await prisma.transacao.groupBy({
            by: ["tipoGasto"],
            _sum: {
                valor: true,
            },
            where: {
                usuarioId: req.usuarioId,
                data: {
                    gte: dataInicioCiclo,
                },
            },
        });

        // 4. Formatar os dados para o Frontend (inicializando tudo a zero)
        const gastos = {
            Fixo: 0,
            "Não Essencial": 0,
            Investimento: 0,
        };

        agrupamentoGastos.forEach((item) => {
            if (gastos[item.tipoGasto] !== undefined) {
                gastos[item.tipoGasto] = Number(item._sum.valor) || 0;
            }
        });

        // Converter tipos decimais do Prisma para enviar no JSON
        const configuracaoFormatada = {
            receitaMensal: Number(configuracao.receitaMensal),
            porcentagemFixos: configuracao.porcentagemFixos,
            porcentagemNaoEssenc: configuracao.porcentagemNaoEssenc,
            porcentagemInvest: configuracao.porcentagemInvest,
        };
        // 5. Retornar o pacote completo
        return res.status(200).json({
            configuracao: configuracaoFormatada,
            gastos,
        });
    } catch (error) {
        console.error("Erro ao obter dados do dashboard:", error);
        return res
            .status(500)
            .json({ error: "Erro interno ao carregar o dashboard." });
    }
}

module.exports = { obterDashboard };

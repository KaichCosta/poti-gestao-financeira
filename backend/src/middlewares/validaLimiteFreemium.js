import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function validaLimiteFreemium(req, res, next) {
    try {
        const usuarioId = req.usuarioId;

        const usuario = await prisma.usuario.findUnique({
            where: { id: usuarioId },
            select: { tipoConta: true}
        });

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        if (usuario.tipoConta === 'pro') {
            return next();
        }

        const agora = new Date();
        const primeiroDiaMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
        const ultimoDiaMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0, 23, 59, 59, 999);

        const totalTransacoesMes = await prisma.transacoes.count({
            where: {
                usuario_id: usuarioId,
                data: {
                    gte: primeiroDiaMes,
                    lte: ultimoDiaMes
                }
            }
        });

        if (totalTransacoesMes >= 30) {
            return res.status(403).json({
                error: 'limite_atingido',
                message: 'Você atingiu o limite de 30 lançamentos gratuitos deste mês. Desbloqueie lançamentos ilimitados no plano PRO!'
            });
        }

        next();    
    } catch (error) {
        console.error('Erro ao verificar limite freemium:', error);
        return res.status(500).json({ error: 'Erro interno do servidor ao verificar cota de lançamentos.' });
    }
}

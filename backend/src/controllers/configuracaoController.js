const configuracaoService = require('../services/configuracaoService');

async function salvar(req, res) {
    try {
        const usuarioId = req.usuarioId;
        const configuracao = await configuracaoService.salvarConfiguracao(usuarioId, req.body);

        return res.status(200).json({
            mensagem: 'Configuração do Poti salva com sucesso!',
            configuracao
        });
    } catch (error) {
        if (error.message === 'A soma dos potes precisa ser exatamente 100%.') {
            return res.status(400).json({ erro: error.message });
        }
        return res.status(500).json({ erro: 'Erro interno ao salvar configurações.',
            detalheDoPrisma: error.message
        });
    }
}

module.exports = { salvar };
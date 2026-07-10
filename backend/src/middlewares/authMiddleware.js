const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Corrigido para 'headerAutenticacao' em todo o escopo
        const headerAutenticacao = req.headers.authorization;

        if (!headerAutenticacao) {
            return res.status(401).json({ erro: 'Token não fornecido.' });
        }

        const partes = headerAutenticacao.split(' ');

        if (partes.length !== 2) {
            return res.status(401).json({ erro: 'Erro no formato do token.' });
        }

        const [ esquema, token ] = partes;

        if (!/^Bearer$/i.test(esquema)) {
            return res.status(401).json({ erro: 'Token malformatado.' });
        }

        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🟢 CONTEÚDO DO JWT DECODIFICADO:", decodificado);
        
        // Injeta o ID do usuário diretamente na requisição
        req.usuarioId = decodificado.usuarioId;
        
        return next();
    } catch (err) {
        // Captura tanto erros do JWT quanto qualquer outra bobeira interna
        return res.status(401).json({ erro: 'Token inválido ou expirado.' });
    }
};

const authService = require('../services/authService')

async function register(req, res) {
    try {
        const { email,senha} = req.body
        if (!email || !senha) {
            return res.status(400).json({erro: 'Email e senha são obrigatórios' })
        }

        const senhaRegex = /^(?=.*[A-Z])(?=.*\d).{6,50}$/;
        if (!senhaRegex.test(senha)) {
            return res.status(400).json({ 
                erro: 'A senha deve ter no mínimo 6 caracteres, contendo pelo menos 1 letra maiúscula e 1 número.' 
            });
        }

        const novoUsuario = await authService.criarUsuario(email, senha);

        return res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            usuario: {
                id: novoUsuario.id,
                email: novoUsuario.email,
                tipoConta: novoUsuario.tipoConta
            }
        });
    } catch (error) {
        if (error.message === 'EMAIL_ALREADY_EXISTS') {
            return res.status(409).json({erro: 'Este e-mail já está cadastrado no sistema.'})
        }

        console.error('Erro no registro:', error);
        return res.status(500).json({ erro: 'Erro interno do servidor ao registrar usuário.' });
    }
}

async function login(req, res) {
    try {
        const { email, senha } = req.body;
        
        if (!email || !senha) {
            return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
        }
        
        const dadosAutenticados = await authService.autenticarUsuario(email, senha);

        return res.status(200).json(dadosAutenticados)
    } catch (error) {
        if (error.message === 'INVALID_CREDENTIALS') {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
        }

        console.error('Erro no login:', error);
        return res.status(500).json({ erro: 'Erro interno do servidor ao realizar login.' });
    }
}

module.exports = {
    register,
    login
};
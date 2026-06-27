const authService = require('../services/authService')

async function register(req, res) {
    try {
        const { email,senha} = req.body
        // Validação básica de presença de dados
        if (!email || !senha) {
            return res.status(400).json({error: 'Email e senha são obrigatórios' })
        }

        // Delega a criação e criptografia para a camada de serviço
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
            return res.status(409).json({error: 'Este e-mail já está cadastrado no sistema.'})
        }

        console.error('Erro no registro:', error);
        return res.status(500).json({ error: 'Erro interno do servidor ao registrar usuário.' });
    }
}

async function login(req, res) {
    try {
        const { email, senha } = req.body;
        
        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }
        
        const dadosAutenticados = await authService.autenticarUsuario(email, senha);

        return res.status(200).json(dadosAutenticados)
    } catch (error) {
        if (error.message === 'INVALID_CREDENTIALS') {
            return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }

        console.error('Erro no login:', error);
        return res.status(500).json({ error: 'Erro interno do servidor ao realizar login.' });
    }
}

module.exports = {
    register,
    login
};
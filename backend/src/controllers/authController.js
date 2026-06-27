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

module.exports = {register};
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function criarUsuario(email, senha) {
    const usuarioExistente = await prisma.usuario.findUnique({where: {email}
    });
    if (usuarioExistente) {
        throw new Error('EMAIL_ALREADY_EXISTS');
    }

    //Aplica a criptografia com Bcrypt Fator de custo 10
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    const usuario = await prisma.usuario.create({
    data: {
        email,
        senha: senhaCriptografada
        }
    });

    return usuario;
}

async function autenticarUsuario(email, senha) {
    const usuario = await prisma.usuario.findUnique({
        where: {email}
    });

    if (!usuario) {
        throw new Error("INVALID_CREDENTIALS");
    }

    // 3. Compara o texto puro enviado com o hash salvo no banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        throw new Error("INVALID_CREDENTIALS");
    }
    // 4. Gera o token JWT guardando o ID do usuário no payload (essencial para o Multi-tenancy)
  // Expira em 7 dias para equilibrar a UX de não pedir login todo dia no mobile
    const token = jwt.sign(
        { usuarioId: usuario.id },
        process.env.JWT_SECRET || 'poti_secret_key_backup_gnomo',
        { expiresIn: '7d' }
    );

    return {
        usuario: {
            id: usuario.id,
            email: usuario.email,
            tipoConta: usuario.tipoConta
        },
        token
    };
} 

module.exports = {
    criarUsuario,
    autenticarUsuario
};
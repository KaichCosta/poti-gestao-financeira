const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Buscamos as configurações que definimos no arquivo centralizado do Prisma
const prismaConfig = require('../../prisma.config.js');

const prisma = new PrismaClient()

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

module.exports = {
    criarUsuario
};
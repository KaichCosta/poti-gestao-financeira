const { PrismaClient } = require('@prisma/client');

console.log("Criando Prisma...");

const prisma = new PrismaClient();

console.log("Criado!");

async function main() {
    const usuarios = await prisma.usuario.findMany();
    console.log(usuarios);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
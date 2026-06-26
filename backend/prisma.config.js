const { defineConfig } = require('@prisma/config');

// Se o process.env.DATABASE_URL não estiver carregado, 
// tentamos ler o .env local diretamente para o CLI do Prisma não quebrar.
if (!process.env.DATABASE_URL) {
  try {
    const fs = require('fs');
    const path = require('path');
    const envPath = path.resolve(__dirname, '.env');
    
    if (fs.existsSync(envPath)) {
      const envConfig = fs.readFileSync(envPath, 'utf-8');
      envConfig.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim().replace(/(^['"]|['"]$)/g, '');
          if (key.trim() === 'DATABASE_URL') {
            process.env.DATABASE_URL = value;
          }
        }
      });
    }
  } catch (err) {
    console.error("Erro ao carregar o arquivo .env manualmente no config:", err);
  }
}

module.exports = defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
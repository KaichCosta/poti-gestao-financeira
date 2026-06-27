require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir que a API receba JSON no corpo das requisições
app.use(express.json());

// Vincula o arquivo principal de rotas
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor Poti rodando com sucesso na porta ${PORT}`);
});
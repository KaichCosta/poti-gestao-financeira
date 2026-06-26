const { Router } = require('express');

const routes = Router();

// Rota de teste para garantir que o Express está vivo
routes.get('/health', (req, res) => {
    return res.json({ status: 'OK', message: 'Backend do Poti operando normalmente!' });
});

// TODO: Adicionar rotas de autenticação (POST /register e POST /login) nas próximas tarefas
// const authController = require('./controllers/authController');
// routes.post('/register', authController.register);

module.exports = routes;
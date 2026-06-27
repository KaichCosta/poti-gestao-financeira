const { Router } = require('express');
const authController = require('./controllers/authController');
const routes = Router();

// Rota de teste para garantir que o Express está vivo
routes.get('/health', (req, res) => {
    return res.json({ status: 'OK', message: 'Backend do Poti operando normalmente!' });
});

routes.post('/register', authController.register);

routes.post('/login', authController.login);

module.exports = routes;
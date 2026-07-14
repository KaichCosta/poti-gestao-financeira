const { Router } = require('express');
const authController = require('./controllers/authController');
const configuracaoController = require('./controllers/configuracaoController');
const transacaoController = require('./controllers/transacaoController');

const verificarJWT = require('./middlewares/authMiddleware');
const validaLimiteFreemium = require('./middlewares/validaLimiteFreemium');

const routes = Router();

// Rota de teste para garantir que o Express está vivo
routes.get('/health', (req, res) => {
    return res.json({ status: 'OK', message: 'Backend do Poti operando normalmente!' });
});

routes.post('/register', authController.register);

routes.post('/login', authController.login);

routes.post('/configuracao', verificarJWT, configuracaoController.salvar);

routes.post('/transacoes', verificarJWT, validaLimiteFreemium, transacaoController.criar);

module.exports = routes;
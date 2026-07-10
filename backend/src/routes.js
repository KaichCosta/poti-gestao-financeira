const { Router } = require('express');
const authController = require('./controllers/authController');
const routes = Router();

const configuracaoController = require('./controllers/configuracaoController');
const verificarJWT = require('./middlewares/authMiddleware');
// Precisa ser um objeto exportado ou a função direta

// Rota de teste para garantir que o Express está vivo
routes.get('/health', (req, res) => {
    return res.json({ status: 'OK', message: 'Backend do Poti operando normalmente!' });
});

routes.post('/register', authController.register);

routes.post('/login', authController.login);

routes.post('/configuracao', verificarJWT, configuracaoController.salvar);

module.exports = routes;
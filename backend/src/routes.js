// Importar pacotes
const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
// Importar arquivos
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

// Verificar as informações que estão sendo enviadas
routes.post('/ongs', celebrate({
    //sempre que a chave do objeto for um variavel do javascript, colocar entre colchetes
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

// Verificar se quem está acessando é autorizado
routes.get('/profile', celebrate ({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

// Verificar se esta passando numerico para pagina
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);
routes.post('/incidents', IncidentController.create);

// Verificar se está passando o id para o delete
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

// Exportar variavel rotas do arquivo
module.exports = routes;
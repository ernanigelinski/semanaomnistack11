const knex = require('knex');
const configuration = require('../../knexfile');

//configurando variavel de ambiente test
const config = process.env.MODE_ENV ==='test' ? configuration.test : configuration.development;
const connection = knex(config);

module.exports = connection;
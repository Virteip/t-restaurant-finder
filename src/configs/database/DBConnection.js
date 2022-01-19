const dbConnection = module.exports;

const knex = require('knex');

const { Database } = require('./DBconfig');

dbConnection.connect = knex(Database);

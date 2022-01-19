const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');
const authentication = require('./src/configs/server/authentication');
const Logger = require('./src/configs/logger/logger');

const { server } = require('./src/configs/server/errorHandler');

const app = express();

const { APP_NAME, SERVER_PORT } = process.env; // env

const { API_KEY } = process.env; // env
authentication.setApiKey(API_KEY);

app.use(bodyParser.json({ limit: '1mb' }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(server);

app.use(`/api/${APP_NAME}`, routes);

app.listen(SERVER_PORT, (err) => {
  if (err) {
    Logger.error(`${err}`);
  }
  Logger.info(`Server running on port: ${SERVER_PORT}`);
});

module.exports = app;

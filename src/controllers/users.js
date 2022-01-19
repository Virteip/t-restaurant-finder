const users = module.exports;
const validator = require('../validators/validator');
const userSchemas = require('../validators/user');
const usersService = require('../services/users');
const logger = require('../configs/logger/logger');
const { deleteToken } = require('../repositories/cache');

users.login = async (req, res, next) => {
  const section = 'Controller: user.login';

  const validBody = validator(userSchemas).validate(req.body);
  if (!validBody) {
    logger.error(`${section} invalid body in request. ${JSON.stringify(validBody)}`);

    return res.status(400).send('Error: "username" and "password" fields are required.');
  }

  const { username, password } = req.body;

  return usersService.login(username, password, { logger })
    .then((resp) => res.status(200).send(resp)).catch((error) => {
      logger.error(`${section} ${JSON.stringify(error.message || error)} AND stack ${error.stack}`);

      return next(error);
    });
};

users.register = async (req, res, next) => {
  const section = 'Controller: user.register';
  const { username, password } = req.body;

  const validBody = validator(userSchemas).validate(req.body);
  if (!validBody) {
    logger.error(`${section} invalid body in request. ${JSON.stringify(validBody)}`);

    return res.status(400).send('Error: "username" and "password" fields are required.');
  }

  return usersService.userCreation(username, password, { logger })
    .then((resp) => res.status(201).send(resp)).catch((error) => {
      logger.error(`${section}, ${JSON.stringify(error.message || error)} AND stack ${error.stack}`);

      return next(error);
    });
};

users.transactions = async (req, res, next) => {
  const section = 'Controller: user.transactions';

  const { username } = req.params;

  if (username === undefined) {
    logger.error(`${section} Must specify username.`);

    return res.status(401).send('Error: Invalid credentials.');
  }

  return usersService.getTransactions(username, { logger })
    .then((resp) => res.status(200).send(resp)).catch((error) => {
      logger.error(`${section}, ${JSON.stringify(error.message || error)} AND stack ${error.stack}`);

      return next(error);
    });
};

users.logout = async (req, res, next) => {
  const section = 'Controller: user.transactions';

  const { username } = req.params;

  if (username === undefined) {
    logger.error(`${section} Must specify username.`);

    return res.status(400).send('Error: invalid username.');
  }

  return deleteToken(username, { logger })
    .then((resp) => res.send(200).send(resp)).catch((error) => {
      logger.error(`${section}, ${JSON.stringify(error.message || error)} AND stack ${error.stack}`);

      return next(error);
    });
};

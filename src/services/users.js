const users = module.exports;
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');

const usersRepository = require('../repositories/users');
const { BaseError } = require('../configs/server/errorHandler');
const { setToken } = require('../repositories/cache');

const SALT_NUMBER = 7;
const { TOKEN_SECRET } = process.env;

users.userCreation = async (username, password, options = {}) => {
  const section = 'Services: userCreation ';
  const { logger } = options;

  const cryptPassword = bcrypt.hashSync(password, SALT_NUMBER);

  await usersRepository.saveUser({ username, password: cryptPassword }, { logger })
    .catch((error) => {
      logger.error(`${section}, ${error.message}`);
    });
};

users.login = async (user, password, options = {}) => {
  const section = 'Services: login ';
  const { logger } = options;

  const savedPassword = await usersRepository.loginCredentials(user, { logger });
  if (savedPassword === undefined) {
    logger.error(`${section} Invalid credentials.`);

    throw new BaseError('Invalid Credentials', 401);
  }

  const comparePasswords = bcrypt.compareSync(password, savedPassword.password);
  if (!comparePasswords) {
    logger.error(`${section} Invalid credentials.`);

    throw new BaseError('Invalid Credentials', 401);
  }

  const token = jwt.encode({ user, password, date: moment().unix() }, TOKEN_SECRET);

  setToken(token, user, { logger }).catch((error) => {
    logger.error(`${section}, ${error.message}`);
  });

  return token;
};

users.getTransactions = async (user, options = {}) => {
  const section = 'Services: getTransactions ';
  const { logger } = options;

  return usersRepository.getTransactions(user).catch((error) => {
    logger.error(`${section}, ${error.message}`);
  });
};

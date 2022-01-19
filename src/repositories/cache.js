const tokenCache = module.exports;
const Redis = require('ioredis');
const { port, host } = require('../configs/database/redis');

const redisConnection = new Redis({
  port,
  host,
});

const TTL = 10000;

tokenCache.setToken = async (token, user, options = {}) => {
  const { logger } = options;
  const key = `restaurant-finder-auth:${user}`;

  logger.info(`Logging in user ${user}`);

  try {
    return redisConnection.set(key, token, 'EX', TTL);
  } catch (error) {
    logger.error(`Key for user: ${user} could not be saved found error ${JSON.stringify(error.message || error)}.`);
  }

  return Promise.resolve();
};

tokenCache.getToken = async (user, options = {}) => {
  const { logger } = options;
  const key = `restaurant-finder-auth:${user}`;

  try {
    return redisConnection.get(key);
  } catch (error) {
    logger.error(`Key for user: ${user} could not be retrieved found error ${JSON.stringify(error.message || error)}.`);
  }

  return Promise.resolve();
};

tokenCache.deleteToken = async (user, options = {}) => {
  const { logger } = options;
  const key = `restaurant-finder-auth:${user}`;

  try {
    return redisConnection.del(key);
  } catch (error) {
    logger.error(`Key for user: ${user} could not be deleted found error ${JSON.stringify(error.message || error)}.`);
  }

  return Promise.resolve();
};

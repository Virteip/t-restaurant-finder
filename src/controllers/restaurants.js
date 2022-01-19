const restaurants = module.exports;
const tokenCache = require('../repositories/cache');
const restaurantsService = require('../services/restaurants');

const logger = require('../configs/logger/logger');

restaurants.locate = async (req, res, next) => {
  const section = 'Controller: restaurants.locate';
  const { token, user } = req.headers;
  const { query } = req;

  const savedToken = await tokenCache.getToken(user);

  const validToken = token === savedToken;
  if (!validToken) {
    logger.error(`${section} token does not match records.`);
    return res.status(401).send('Error: token does not match records.');
  }

  return restaurantsService.locate(user, query, { logger })
    .then((resp) => res.status(200).send(resp)).catch((error) => {
      logger.error(section, `Error ${JSON.stringify(error.message || error)} AND stack ${error.stack}`);

      return next(error);
    });
};

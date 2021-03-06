const restaurants = module.exports;
const restaurantsService = require('../services/restaurants');

const logger = require('../configs/logger/logger');

restaurants.locate = async (req, res, next) => {
  const section = 'Controller: restaurants.locate';
  const { user } = req.headers;
  const { query } = req;

  return restaurantsService.locate(user, query, { logger })
    .then((resp) => res.status(200).send(resp)).catch((error) => {
      logger.error(`${section} ${JSON.stringify(error.message || error)} - Stack: ${error.stack}`);

      return next(error);
    });
};

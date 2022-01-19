const restaurants = module.exports;
const restaurantProvider = require('../providers/restaurantsLocator');

restaurants.locate = async (user, params, options = {}) => {
  const { logger } = options;
  const { lat, lng } = params;

  logger.info(`Requesting restaurants info for location: ${lat},${lng}`);

  return restaurantProvider.locate(user, lat, lng);
};

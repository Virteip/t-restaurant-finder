const restaurants = module.exports;
const restaurantProvider = require('../providers/restaurantsLocator');
const { saveTransactions } = require('../repositories/users');

restaurants.locate = async (username, params, options = {}) => {
  const { logger } = options;
  const { lat, lng } = params;
  const location = `${lat},${lng}`;

  logger.info(`Requesting restaurants info for location: ${lat},${lng}`);

  await saveTransactions({ username, location });

  return restaurantProvider.locate(username, lat, lng);
};

const restaurantProvider = module.exports;
const { default: axios } = require('axios');
const { saveTransactions } = require('../repositories/users');

const { GOOGLE_API_KEY } = process.env;
const BASE_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?type=restaurant&key=${GOOGLE_API_KEY}`;

restaurantProvider.locate = async (username, lat, lng) => {
  const response = await axios.get(`${BASE_URL}&location=${lat},${lng}`);
  const location = `${lat},${lng}`;

  await saveTransactions({ username, location });

  return response.data.results;
};

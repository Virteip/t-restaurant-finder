const restaurantProvider = module.exports;
const { default: axios } = require('axios');

const { GOOGLE_API_KEY } = process.env;
const BASE_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?type=restaurant&key=${GOOGLE_API_KEY}`;

restaurantProvider.locate = async (username, lat, lng) => {
  const response = await axios.get(`${BASE_URL}&location=${lat},${lng}`);

  return response.data.results;
};

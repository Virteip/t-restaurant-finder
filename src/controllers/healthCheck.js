const healthCheck = module.exports;

healthCheck.status = async (req, res) => {
  const status = {
    name: 'restaurant-finder',
    time: Date.now(),
    status: 'OK',
  };
  return res.send(status).status(200);
};

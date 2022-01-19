const authentication = module.exports;

const { UnauthorizedError } = require('./errorHandler');

authentication.API_KEY = undefined;

authentication.setApiKey = ((apiKey) => {
  authentication.API_KEY = apiKey;
});

authentication.apiKey = ((req, res, next) => {
  const authorization = req.header('Authorization');
  const apiKey = req.header('api_key');

  if (authorization && (apiKey === authentication.API_KEY)) return next();

  throw new UnauthorizedError('unauthorized');
});

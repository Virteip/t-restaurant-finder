const authentication = module.exports;

const { UnauthorizedError } = require('./errorHandler');
const tokenCache = require('../../repositories/cache');

authentication.API_KEY = undefined;

authentication.setApiKey = ((apiKey) => {
  authentication.API_KEY = apiKey;
});

authentication.apiKey = ((req, res, next) => {
  const authorization = req.header('Authorization');
  const apiKey = req.header('api_key');

  if (authorization && (apiKey === authentication.API_KEY)) return next();

  throw new UnauthorizedError('Invalid Key.');
});

authentication.userToken = (async (req, res, next) => {
  if (!req.headers.authorization) return next(new UnauthorizedError('Auth header mising.'));

  const { token, user } = req.headers;

  const savedToken = await tokenCache.getToken(user);

  const validToken = token === savedToken;
  if (!validToken) {
    return next(new UnauthorizedError('Invalid username or token.'));
  }

  return next();
});

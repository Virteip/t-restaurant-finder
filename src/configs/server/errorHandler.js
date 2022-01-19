const errorHandler = module.exports;

errorHandler.server = (err, req, res, next) => {
  if (err) {
    req.log('Error:', err.stack);

    return res.status(err.status).send({ message: err.message });
  }

  return next();
};

errorHandler.BaseError = function BaseError(message, code, status, stack) {
  this.message = message;
  this.status = status || code;
  this.code = code;
  this.stack = stack || new Error().stack;
};

errorHandler.UnauthorizedError = function UnauthorizedError(message) {
  return new errorHandler.BaseError(message, 401, 401);
};

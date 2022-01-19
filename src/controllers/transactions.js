const transactions = module.exports;
const transactionsService = require('../services/transactions');
const logger = require('../configs/logger/logger');

transactions.userTransactions = async (req, res, next) => {
  const section = 'Controller: transactions.userTransactions';

  const { user } = req.headers;

  return transactionsService.getTransactions(user, { logger })
    .then((resp) => res.status(200).send(resp)).catch((error) => {
      logger.error(`${section} ${JSON.stringify(error.message || error)} - Stack: ${error.stack}`);

      return next(error);
    });
};

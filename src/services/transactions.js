const transactions = module.exports;

const transactionsRepository = require('../repositories/transactions');

transactions.getTransactions = async (user, options = {}) => {
  const section = 'Services: getTransactions ';
  const { logger } = options;

  return transactionsRepository.getTransactions(user).catch((error) => {
    logger.error(`${section}, ${error.message}`);
  });
};

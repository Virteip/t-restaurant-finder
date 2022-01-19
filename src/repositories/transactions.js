const transactions = module.exports;
const { connect: db } = require('../configs/database/DBConnection');
const { TABLE_NAMES } = require('../configs/database/DBconfig');

transactions.getTransactions = (username) => db(TABLE_NAMES[1])
  .select('username', 'location', 'created_at')
  .where({ username });

transactions.saveTransactions = (values) => db(TABLE_NAMES[1]).insert(values);

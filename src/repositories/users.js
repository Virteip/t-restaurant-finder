const users = module.exports;
const { connect: db } = require('../configs/database/DBConnection');
const { TABLE_NAMES } = require('../configs/database/DBconfig');

users.saveUser = (values) => db(TABLE_NAMES[0]).insert(values);

users.loginCredentials = (username) => db(TABLE_NAMES[0])
  .select('password')
  .where({ username })
  .first();

users.getTransactions = (username) => db(TABLE_NAMES[1])
  .select('username', 'location', 'created_at')
  .where({ username });

users.saveTransactions = (values) => db(TABLE_NAMES[1]).insert(values);

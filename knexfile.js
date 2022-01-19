const {
  DB_CLIENT,
  DB_TIMEOUT,
  DB_CONNECTION,
  MAX_POOL_SIZE,
} = require('./src/configs/database/DBconfig');

const MIGRATIONS_DIRECTORY = './migrations';

module.exports = {
  client: DB_CLIENT,
  connection: DB_CONNECTION,
  pool: {
    max: MAX_POOL_SIZE,
    createTimeoutMillis: DB_TIMEOUT,
    acquireTimeoutMillis: DB_TIMEOUT,
  },
  connectionTimeout: DB_TIMEOUT,
  acquireConnectionTimeout: DB_TIMEOUT,
  migration: {
    directory: MIGRATIONS_DIRECTORY,
  },
};

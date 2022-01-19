const assert = require('assert');

const { DB_CONNECTION, DB_POOL_SIZE } = process.env;

assert(DB_CONNECTION, 'DB_CONNECTION must be provided');
assert(DB_POOL_SIZE, 'DB_POOL_SIZE must be provided');

const DB_CLIENT = 'pg';
const DB_TIMEOUT = 30000;
const MAX_POOL_SIZE = parseInt(DB_POOL_SIZE, 10) || 10;
const TABLE_NAMES = [
  'users',
  'transactions',
];
module.exports = {
  DB_CLIENT,
  DB_TIMEOUT,
  DB_CONNECTION,
  MAX_POOL_SIZE,
  Database: {
    client: DB_CLIENT,
    connection: DB_CONNECTION,
    pool: { max: MAX_POOL_SIZE },
    acquireConnectionTimeout: DB_TIMEOUT,
  },
  TABLE_NAMES,
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.up = (knex) => knex.schema.createTable('transactions', (table) => {
  table.bigIncrements('id').notNullable();
  table.string('username').notNullable();
  table.string('location').notNullable();
  table.timestamp('created_at').defaultTo(knex.fn.now());
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('transactions');

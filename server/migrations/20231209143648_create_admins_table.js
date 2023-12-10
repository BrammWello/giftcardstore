/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('admins', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('email').unique();
      table.string('phone');
      table.text('address');
      table.string('password');
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('admins');
  };

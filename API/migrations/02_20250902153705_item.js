/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('item', table => {
        table.increments('id').primary().notNullable();
        table.integer('UserId').references('users.id').notNullable(); 
        table.string('Item_name').notNullable();
        table.string('Description').notNullable();
        table.integer('Quantity').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
return knex.schema.dropTableIfExists('item')
};

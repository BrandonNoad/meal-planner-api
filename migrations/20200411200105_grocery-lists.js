'use strict';

const createGroceryListsTable = (knex) =>
    knex.schema.createTable('grocery_lists', (table) => {
        table.increments('id');

        table
            .integer('team_id')
            .unsigned()
            .notNullable();

        table
            .integer('year')
            .unsigned()
            .notNullable();

        table
            .integer('week')
            .unsigned()
            .notNullable();

        table.string('name', 512).notNullable();

        table.json('items');

        table.unique(['team_id', 'year', 'week']);

        table.timestamps(true, true);
    });

exports.up = (knex) => createGroceryListsTable(knex);

const dropGroceryListsTable = (knex) => knex.schema.dropTableIfExists('grocery_lists');

exports.down = (knex) => dropGroceryListsTable(knex);

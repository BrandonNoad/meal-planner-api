'use strict';

const createFoodItemsTableFactory = (knex) => () =>
    knex.schema.createTable('food_items', (table) => {
        table.increments('id');

        table.string('name', 256).notNullable();

        table.string('category', 128);

        table.timestamps(true, true);
    });

const createIngredientsTableFactory = (knex) => () =>
    knex.schema.createTable('ingredients', (table) => {
        table.increments('id');

        table
            .integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipes');

        table
            .integer('food_item_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('food_items');

        table.decimal('quantity', null).notNullable();

        table.string('unit', 32);

        table.timestamps(true, true);
    });

const createImportRecipeTasksTableFactory = (knex) => () =>
    knex.schema.createTable('import_recipe_tasks', (table) => {
        table.increments('id');

        table
            .integer('team_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('teams');

        table.string('state', 32).notNullable();

        table.text('url').notNullable();

        table
            .integer('recipe_id')
            .unsigned()
            .references('id')
            .inTable('recipes');

        table.timestamps(true, true);
    });

exports.up = (knex) =>
    createFoodItemsTableFactory(knex)()
        .then(createIngredientsTableFactory(knex))
        .then(createImportRecipeTasksTableFactory(knex));

const dropImportRecipeTasksTableFactory = (knex) => () =>
    knex.schema.dropTableIfExists('import_recipe_tasks');

const dropIngredientsTableFactory = (knex) => () => knex.schema.dropTableIfExists('ingredients');

const dropFoodItemsTableFactory = (knex) => () => knex.schema.dropTableIfExists('food_items');

exports.down = (knex) =>
    dropImportRecipeTasksTableFactory(knex)()
        .then(dropIngredientsTableFactory(knex))
        .then(dropFoodItemsTableFactory(knex));

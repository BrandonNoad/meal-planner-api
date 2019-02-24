'use strict';

exports.up = async knex => knex.schema
    .createTable('recipes', table => {

        table.increments('id');

        table.string('name', 512)
            .notNullable();

        table.text('url');

        table.json('meta');

        table.timestamps(true, true);
    })
    .createTable('scheduled_recipes', table => {

        table.increments('id');

        table.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipes');

        table.date('date_scheduled')
            .notNullable();

        table.timestamps(true, true);
    });

exports.down = knex => knex.schema
    .dropTableIfExists('recipes')
    .dropTableIfExists('scheduled_recipes');

'use strict';

const createTeamsTableFactory = (knex) => () =>
    knex.schema.createTable('teams', (table) => {
        table.increments('id');

        table.string('name', 512).notNullable();

        table.timestamps(true, true);
    });

const createTeamMembersTableFactory = (knex) => () =>
    knex.schema.createTable('team_members', (table) => {
        table
            .integer('team_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('teams');

        table.string('auth0_user_id', 32).notNullable();

        table.primary(['team_id', 'auth0_user_id']);

        table.timestamps(true, true);
    });

const createRecipesTableFactory = (knex) => () =>
    knex.schema.createTable('recipes', (table) => {
        table.increments('id');

        table.string('name', 512).notNullable();

        table.text('url');

        table.json('meta');

        table.timestamps(true, true);
    });

const createTeamRecipesTableFactory = (knex) => () =>
    knex.schema.createTable('team_recipes', (table) => {
        table
            .integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('recipes');

        table
            .integer('team_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('teams');

        table.primary(['recipe_id', 'team_id']);

        table.timestamps(true, true);
    });

const createScheduledRecipesTableFactory = (knex) => () =>
    knex.schema.createTable('scheduled_recipes', (table) => {
        table.increments('id');

        table
            .integer('recipe_id')
            .unsigned()
            .notNullable();

        table
            .integer('team_id')
            .unsigned()
            .notNullable();

        table
            .foreign(['recipe_id', 'team_id'])
            .references(['recipe_id', 'team_id'])
            .inTable('team_recipes');

        table.date('date_scheduled').notNullable();

        table.timestamps(true, true);
    });

exports.up = (knex) =>
    createTeamsTableFactory(knex)()
        .then(createTeamMembersTableFactory(knex))
        .then(createRecipesTableFactory(knex))
        .then(createTeamRecipesTableFactory(knex))
        .then(createScheduledRecipesTableFactory(knex));

const dropScheduledRecipesTableFactory = (knex) => () =>
    knex.schema.dropTableIfExists('scheduled_recipes');

const dropTeamRecipesTableFactory = (knex) => () => knex.schema.dropTableIfExists('team_recipes');

const dropRecipesTableFactory = (knex) => () => knex.schema.dropTableIfExists('recipes');

const dropTeamMembersTableFactory = (knex) => () => knex.schema.dropTableIfExists('team_members');

const dropTeamsTableFactory = (knex) => () => knex.schema.dropTableIfExists('teams');

exports.down = (knex) =>
    dropScheduledRecipesTableFactory(knex)()
        .then(dropTeamRecipesTableFactory(knex))
        .then(dropRecipesTableFactory(knex))
        .then(dropTeamMembersTableFactory(knex))
        .then(dropTeamsTableFactory(knex));

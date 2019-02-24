'use strict';

const { MEAL_PLANNER_DB_HOST, MEAL_PLANNER_DB_USER, MEAL_PLANNER_DB_DATABASE } = process.env;

module.exports = {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './meal_planner.sqlite3'
        }
    },
    production: {
        client: 'pg',
        connection: {
            host: MEAL_PLANNER_DB_HOST,
            user: MEAL_PLANNER_DB_USER,
            database: MEAL_PLANNER_DB_DATABASE
        }
     }
};

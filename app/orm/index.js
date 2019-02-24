'use strict';

const Knex = require('knex');
const { Model } = require('objection');

exports.init = (knexConfig) => {
    const environment = process.env.NODE_ENV || 'development';

    if (knexConfig[environment] === undefined) {
        throw new Error('The knexfile is missing the specified environment!');
    }

    // Initialize knex.
    const knex = Knex(knexConfig[environment]);

    // Bind all Objection.js Models to the knex instance.
    Model.knex(knex);

    return knex;
};

exports.ScheduledRecipe = require('./ScheduledRecipe');
exports.Recipe = require('./Recipe');

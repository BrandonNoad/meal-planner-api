'use strict';

const { fetchForDatePaginatedFactory } = require('./factories');

const ScheduledRecipeRepository = require('../../repositories/ScheduledRecipeRepository');

/**
 * Fetch all scheduledRecipes for the given date paginated.
 *  - GET /scheduledRecipes?date=YYYY-MM-DD
 */
exports.fetchForDatePaginated = fetchForDatePaginatedFactory(ScheduledRecipeRepository);

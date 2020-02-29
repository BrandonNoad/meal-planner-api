'use strict';

const { fetchForTeamForDatePaginatedFactory } = require('./factories');

const ScheduledRecipeRepository = require('../../repositories/ScheduledRecipe');

/**
 * Fetch all scheduledRecipes for the given team and date paginated.
 *  - GET /teams/{teamId}/scheduledRecipes?date=YYYY-MM-DD
 */
exports.fetchForTeamForDatePaginated = fetchForTeamForDatePaginatedFactory(
    ScheduledRecipeRepository
);

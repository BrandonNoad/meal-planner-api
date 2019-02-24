'use strict';

const { fetchAllPaginatedFactory, fetchSuggestionsFactory } = require('./factories');

const RecipeRepository = require('../../repositories/RecipeRepository');

/**
 * Fetch all recipes paginated.
 *  - GET /recipes
 */
exports.fetchAllPaginated = fetchAllPaginatedFactory(RecipeRepository);

/**
 * Fetch suggested recipes. The response contains at most MAX_SUGGESTIONS recipes.
 *  - GET /suggestedRecipes
 */
exports.fetchSuggestions = fetchSuggestionsFactory(RecipeRepository);

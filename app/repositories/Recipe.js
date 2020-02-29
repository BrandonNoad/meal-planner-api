'use strict';

const { Recipe } = require('../orm');
const { toJson } = require('./util');

const getCommonQb = () => Recipe.query().pick(Recipe, ['id', 'name', 'url']);

exports.fetchPage = async (page, limit) => {
    const result = await getCommonQb().page(page - 1, limit);

    return {
        results: result.results.map(toJson),
        totalCount: result.total
    };
};

// Returns the top 10 most scheduled recipes. If less than 10 recipes have been scheduled, it uses
// the most recently created recipes to get the result size to 10.
// TODO: use constant for the limit (e.g. MAX_SUGGESTIONS).
exports.fetchSuggestions = (limit = 10) =>
    getCommonQb()
        .select(
            'recipes.*',
            Recipe.relatedQuery('scheduledRecipes')
                .count()
                .as('num_scheduled_recipes')
        )
        .orderBy('num_scheduled_recipes', 'desc')
        .orderBy('created_at', 'desc')
        .limit(limit)
        .map(toJson);

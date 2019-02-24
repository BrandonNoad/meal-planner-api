'use strict';

exports.fetchAllPaginatedFactory = (RecipeRepository) => async (request) => {
    const { page, limit } = request.query;

    const { results, totalCount } = await RecipeRepository.fetchPage(page, limit);

    // Set the total count for the hapi-pagination plugin.
    request.totalCount = totalCount;

    // Set the total count for the total-count plugin.
    request.plugins['total-count'] = { totalCount };

    return results;
};

exports.fetchSuggestionsFactory = (RecipeRepository) => (request) =>
    RecipeRepository.fetchSuggestions();

'use strict';

exports.fetchForDatePaginatedFactory = (ScheduledRecipeRepository) => async (request) => {
    const { page, limit, date } = request.query;

    const { results, totalCount } = await ScheduledRecipeRepository.fetchPageForDate(
        page,
        limit,
        date
    );

    // Set the total count for the hapi-pagination plugin.
    request.totalCount = totalCount;

    // Set the total count for the total-count plugin.
    request.plugins['total-count'] = { totalCount };

    return results;
};

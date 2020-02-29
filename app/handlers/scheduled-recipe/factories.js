'use strict';

exports.fetchForTeamForDatePaginatedFactory = (ScheduledRecipeRepository) => async (request) => {
    const { teamId } = request.params;
    const { page, limit, date } = request.query;

    const { results, totalCount } = await ScheduledRecipeRepository.fetchPageForTeamForDate(
        page,
        limit,
        teamId,
        date
    );

    // Set the total count for the hapi-pagination plugin.
    request.totalCount = totalCount;

    // Set the total count for the total-count plugin.
    request.plugins['total-count'] = { totalCount };

    return results;
};

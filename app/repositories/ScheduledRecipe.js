'use strict';

const { ScheduledRecipe, Recipe, Team } = require('../orm');
const { toJson } = require('./util');

const getCommonQb = () =>
    ScheduledRecipe.query()
        .eager('[recipe, team]')
        .pick(ScheduledRecipe, ['id', 'dateScheduled', 'recipe', 'team'])
        .pick(Recipe, ['id', 'name', 'url'])
        .pick(Team, ['id']);

exports.fetchPageForTeamForDate = async (page, limit, teamId, date) => {
    const result = await getCommonQb()
        .where({
            team_id: teamId,
            date_scheduled: date
        })
        .page(page - 1, limit);

    return {
        results: result.results.map(toJson),
        totalCount: result.total
    };
};

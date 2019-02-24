'use strict';

const { ScheduledRecipe, Recipe } = require('../orm');

const fetchCommon = () =>
    ScheduledRecipe.query()
        .eager('recipe')
        .pick(ScheduledRecipe, ['id', 'dateScheduled', 'recipe'])
        .pick(Recipe, ['id', 'name', 'url']);

exports.fetchPageForDate = async (page, limit, date) => {
    const result = await fetchCommon()
        .where('date_scheduled', date)
        .page(page - 1, limit);

    return {
        results: result.results.map((instance) => instance.toJSON()),
        totalCount: result.total
    };
};

'use strict';

const { Team, TeamMember, Recipe } = require('../orm');
const { toJson } = require('./util');

const getCommonQb = () => Team.query();

const getFindByIdQb = (teamId) => getCommonQb().findById(teamId);

exports.fetchMembersForTeam = async (teamId) => {
    const instance = await getFindByIdQb(teamId)
        .eager('members')
        .pick(Team, ['id', 'name', 'members'])
        .pick(TeamMember, ['auth0UserId']);

    return instance === undefined ? null : toJson(instance);
};

exports.fetchRecipesForTeam = async (teamId) => {
    const instance = await getFindByIdQb(teamId)
        .eager('recipes')
        .pick(Team, ['id', 'name', 'recipes'])
        .pick(Recipe, ['id', 'name', 'url']);

    return instance === undefined ? null : toJson(instance);
};

'use strict';

const factory = require('./factory');

const { fetchForTeamForDatePaginated } = require('../../../handlers/scheduled-recipe');

module.exports = factory(fetchForTeamForDatePaginated);

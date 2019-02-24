'use strict';

const factory = require('./factory');

const { fetchForDatePaginated } = require('../../../handlers/scheduled-recipe');

module.exports = factory(fetchForDatePaginated);

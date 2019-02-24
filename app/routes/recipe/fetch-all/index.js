'use strict';

const factory = require('./factory');

const { fetchAllPaginated } = require('../../../handlers/recipe');

module.exports = factory(fetchAllPaginated);

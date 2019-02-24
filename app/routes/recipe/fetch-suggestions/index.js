'use strict';

const factory = require('./factory');

const { fetchSuggestions } = require('../../../handlers/recipe');

module.exports = factory(fetchSuggestions);

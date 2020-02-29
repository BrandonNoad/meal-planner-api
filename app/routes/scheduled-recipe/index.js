'use strict';

const factory = require('./factory');

const routes = [require('./fetch-for-team-for-date')];

module.exports = factory(routes);

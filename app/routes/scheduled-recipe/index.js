'use strict';

const factory = require('./factory');

const routes = [require('./fetch-for-date')];

module.exports = factory(routes);

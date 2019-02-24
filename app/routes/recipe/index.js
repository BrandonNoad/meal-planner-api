'use strict';

const factory = require('./factory');

const routes = [require('./fetch-all'), require('./fetch-suggestions')];

module.exports = factory(routes);

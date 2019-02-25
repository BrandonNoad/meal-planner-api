'use strict';

const factory = require('./factory');

const routes = [require('./login')];

module.exports = factory(routes);

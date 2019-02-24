'use strict';

module.exports = (routes) => ({
    name: `scheduled-recipe-routes`,
    register(server) {
        server.route(routes);
    }
});

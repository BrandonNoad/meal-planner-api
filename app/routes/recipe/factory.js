'use strict';

module.exports = (routes) => ({
    name: `recipe-routes`,
    register(server) {
        server.route(routes);
    }
});

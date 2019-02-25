'use strict';

module.exports = (routes) => ({
    name: `auth-routes`,
    register(server) {
        server.route(routes);
    }
});

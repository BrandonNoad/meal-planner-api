'use strict';

module.exports = {
    name: 'server-auth-default',
    dependencies: ['jwt-auth-strategy'],
    async register(server) {
        server.auth.default('jwt');
    }
};

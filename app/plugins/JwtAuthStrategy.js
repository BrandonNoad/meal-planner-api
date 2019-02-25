'use strict';

const Jwt = require('jsonwebtoken');

const factory = (exports.factory = (validateFactory) => ({
    name: 'jwt-auth-strategy',
    dependencies: 'hapi-auth-bearer-token',
    async register(server, options) {
        server.auth.strategy('jwt', 'bearer-access-token', {
            validate: validateFactory(options)
        });
    }
}));

const validateFactory = ({ secret }) => async (request, token) => {
    try {
        const credentials = Jwt.verify(token, secret);

        return { isValid: true, credentials };
    } catch (err) {
        let credentials;

        try {
            credentials = Jwt.decode(token);
        } catch (err) {
            credentials = {};
        }

        if (credentials === null) {
            credentials = {};
        }

        return { isValid: false, credentials };
    }
};

// Make the plugin by injecting getOnPostHandler.
exports.plugin = factory(validateFactory);

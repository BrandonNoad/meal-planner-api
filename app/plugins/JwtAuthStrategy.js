'use strict';

const jwksRsa = require('jwks-rsa');

exports.plugin = {
    name: 'jwt-auth-strategy',
    dependencies: 'hapi-auth-jwt2',
    async register(server) {
        server.auth.strategy('jwt', 'jwt', {
            // We need the complete decoded token to get the kid from the header.
            complete: true,
            key: jwksRsa.hapiJwt2KeyAsync({
                cache: true,
                rateLimit: true,
                jwksUri: process.env.JWKS_URI
            }),
            validate() {
                return { isValid: true };
            },
            verifyOptions: {
                audience: process.env.JWT_AUDIENCE,
                issuer: process.env.JWT_ISSUER,
                algorithms: ['RS256']
            }
        });
    }
};

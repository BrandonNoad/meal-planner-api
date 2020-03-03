import { Server } from '@hapi/hapi';
import JwksRsa from 'jwks-rsa';

export const plugin = {
    name: 'jwt-auth-strategy',
    dependencies: 'hapi-auth-jwt2',
    async register(server: Server) {
        server.auth.strategy('jwt', 'jwt', {
            // We need the complete decoded token to get the kid from the header.
            complete: true,
            // Throws a Boom error when key lookup fails.
            key: JwksRsa.hapiJwt2KeyAsync({
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

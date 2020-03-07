import JwksRsa from 'jwks-rsa';
import Jwt from 'jsonwebtoken';
import _has from 'lodash/has';

const client = JwksRsa({
    jwksUri: process.env.JWKS_URI,
    cache: true,
    rateLimit: true
});

interface DecodedJwtPayload {
    payload: object;
    header: any;
    signature: any;
}

export const authenticate = async (request) => {
    // The request must contain the Authorization header field formatted as follows:
    //   Authorization: Bearer {token}
    // Where {token} is a valid JSON Web Token (JWT).

    // Is the Authorization header missing?
    if (!_has(request.headers, 'authorization')) {
        throw new Error('Missing Authorization header');
    }

    const parts = request.headers.authorization.split(/\s+/);

    // There will always be at least 1 part.
    // Is the Authorization header scheme Bearer?
    if (parts[0].toLowerCase() !== 'bearer') {
        throw new Error('Scheme must be Bearer');
    }

    // The Authorization header value must have exactly 2 parts: Authorization: Bearer <JWT>
    if (parts.length !== 2) {
        throw new Error(
            'The Meal Planner API uses Bearer authentication (e.g. Authorization: Bearer <JWT>)'
        );
    }

    const token = parts[1];

    // If the signature, expiration, audience, and issuer are valid, returns the decoded
    // payload. If not, it will throw an error.
    const { payload } = await new Promise((resolve, reject) => {
        Jwt.verify(
            token,
            ({ kid }, cb) => {
                client.getSigningKey(kid, (err, key) => {
                    if (err) {
                        cb(err);
                        return;
                    }

                    cb(null, key.getPublicKey());
                });
            },
            {
                algorithms: ['RS256'],
                audience: process.env.JWT_AUDIENCE,
                complete: true,
                issuer: process.env.JWT_ISSUER
            },
            (err, decoded: DecodedJwtPayload) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(decoded);
            }
        );
    });

    return payload;
};

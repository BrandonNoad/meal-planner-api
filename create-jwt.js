const Jwt = require('jsonwebtoken');

const secret = 'secret';

const token = Jwt.sign({ email: 'Brandon.Noad@gmail.com' }, secret, {
    expiresIn: 24 * 60 * 60
});

/* eslint-disable no-console */
console.log(`JWT: ${token}`);
/* eslint-enable no-console */

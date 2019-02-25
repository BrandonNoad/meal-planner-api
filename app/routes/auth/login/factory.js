'use strict';

const Jwt = require('jsonwebtoken');
const Joi = require('joi');
const Boom = require('boom');

module.exports = () => ({
    method: 'POST',
    path: '/login',
    handler(request) {
        const { email, password } = request.payload;

        // TODO: temporary implementation until the app has a concept of users.
        if (
            email.toLowerCase() !== process.env.LOGIN_EMAIL.toLowerCase() ||
            password !== process.env.LOGIN_PASSWORD
        ) {
            throw Boom.badRequest('Invalid email or password. Please try again.');
        }

        const jwt = Jwt.sign({ email: process.env.LOGIN_EMAIL }, process.env.JWT_SECRET, {
            // 24 hrs
            expiresIn: 24 * 60 * 60
        });

        return { jwt };
    },
    options: {
        auth: false,
        validate: {
            payload: {
                email: Joi.string()
                    .email()
                    .required(),
                password: Joi.string().required()
            }
        }
    }
});

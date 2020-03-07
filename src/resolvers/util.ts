import Joi, { ObjectSchema } from '@hapi/joi';
import { AuthenticationError, UserInputError, ForbiddenError, ResolverFn } from 'apollo-server';

import { authenticate } from '../middleware/authentication';
import { validate } from '../middleware/validation';
import { authorize } from '../middleware/accessControl';

interface QueryResolverFactoryConfig {
    auth?: boolean;
    validate: {
        args: ObjectSchema;
    };
    accessControl?: boolean;
    resolver: ResolverFn;
}

interface Credentials {
    userId?: number;
}

export const queryResolverFactory = (config: QueryResolverFactoryConfig): ResolverFn => async (
    rootValue,
    args,
    context,
    info
) => {
    const credentials: Credentials = {};

    // -- Authentication

    if (config.auth !== false) {
        const { req } = context;

        try {
            const payload = await authenticate(req);

            // Ensure that credentials.userId is valid.

            // auth0|5c96a8c0b2b79f7179e732af
            const userIdSchema = Joi.string()
                .trim()
                .required();

            const { error, value: userId } = userIdSchema.validate(payload.sub);

            if (error === undefined) {
                credentials.userId = userId;
            }
        } catch (e) {
            throw new AuthenticationError('Unauthorized');
        }
    }

    // -- Validation

    let argsForResolver;
    try {
        argsForResolver = await validate(args, config.validate.args);
    } catch (e) {
        throw new UserInputError('Bad Request');
    }

    // -- Access Control

    if (config.accessControl !== false) {
        try {
            await authorize({ credentials, args });
        } catch (e) {
            throw new ForbiddenError('Forbidden');
        }
    }

    return config.resolver(rootValue, argsForResolver, { ...context, credentials }, info);
};

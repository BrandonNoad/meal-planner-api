import Joi, { ObjectSchema } from '@hapi/joi';
import { AuthenticationError, UserInputError, ForbiddenError } from 'apollo-server';

import { authenticate } from '../middleware/authentication';
import { validate } from '../middleware/validation';
import { authorize } from '../middleware/accessControl';

interface ResolverFactoryConfig {
    auth?: boolean;
    validate?: {
        args: ObjectSchema;
    };
    accessControl?:
        | boolean
        | {
              fetchTeamId: (args) => Promise<number | undefined>;
          };
    resolver: any;
}

interface Credentials {
    userId?: number;
}

export const resolverFactory = (config: ResolverFactoryConfig) => async (
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

    let argsForResolver = args;

    if (config.validate !== undefined) {
        try {
            argsForResolver = await validate(args, config.validate.args);
        } catch (e) {
            throw new UserInputError('Bad Request');
        }
    }

    // -- Access Control

    if (config.accessControl !== false) {
        const teamId: number | undefined =
            config.accessControl === undefined || config.accessControl === true
                ? args.teamId
                : await config.accessControl.fetchTeamId(args);

        try {
            await authorize({ credentials, teamId });
        } catch (e) {
            throw new ForbiddenError('Forbidden');
        }
    }

    return config.resolver(rootValue, argsForResolver, { ...context, credentials }, info);
};

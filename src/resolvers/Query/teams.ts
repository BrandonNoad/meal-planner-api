import BaseJoi, { ObjectSchema } from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
const Joi = BaseJoi.extend(JoiDate);

import { resolverFactory } from '../util';
import { TeamMember } from '../../orm';

const resolver = async (rootValue: undefined, args: {}, { credentials }) => {
    const { userId } = credentials;

    const qb = TeamMember.query()
        .withGraphFetched('team')
        .where('auth0_user_id', userId);

    const results = await qb;

    return results.map((instance: any) => ({ id: instance.team.id, name: instance.team.name }));
};

export default resolverFactory({
    accessControl: false,
    resolver
});

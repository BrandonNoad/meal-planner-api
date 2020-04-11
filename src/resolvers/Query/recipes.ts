import BaseJoi, { ObjectSchema } from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
const Joi = BaseJoi.extend(JoiDate);

import { resolverFactory } from '../util';
import { TeamRecipe } from '../../orm';

const argsSchema = Joi.object({
    teamId: Joi.number()
        .integer()
        .positive()
        .required()
}).required();

const resolver = async (rootValue: undefined, { teamId }) => {
    let qb = TeamRecipe.query()
        .withGraphFetched('recipe')
        .where('team_id', teamId);

    const results = await qb;

    return results.map((instance: any) => ({
        ...instance.recipe
    }));
};

export default resolverFactory({
    validate: { args: argsSchema },
    resolver
});

import BaseJoi, { ObjectSchema } from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
const Joi = BaseJoi.extend(JoiDate);

import { resolverFactory } from '../util';
import { ScheduledRecipe } from '../../orm';

const argsSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
}).required();

const fetchTeamId = async (args) => {
    const qb = ScheduledRecipe.query().findById(args.id);

    const result = await qb;

    return result === undefined ? undefined : result.toJSON().teamId;
};

const resolver = async (rootValue: undefined, { id }) => {
    const qb = ScheduledRecipe.query().deleteById(id);

    await qb;

    return true;
};

export default resolverFactory({
    validate: { args: argsSchema },
    accessControl: { fetchTeamId },
    resolver
});

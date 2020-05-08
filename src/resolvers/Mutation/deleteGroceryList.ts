import BaseJoi, { ObjectSchema } from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
const Joi = BaseJoi.extend(JoiDate);

import { resolverFactory } from '../util';
import { GroceryList } from '../../orm';

const argsSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
}).required();

const fetchTeamId = async (args) => {
    const qb = GroceryList.query().findById(args.id);

    const result = await qb;

    return result === undefined ? undefined : result.toJSON().teamId;
};

const resolver = async (rootValue: undefined, { id }) => {
    const qb = GroceryList.query().deleteById(id);

    await qb;

    return true;
};

export default resolverFactory({
    validate: { args: argsSchema },
    accessControl: { fetchTeamId },
    resolver
});

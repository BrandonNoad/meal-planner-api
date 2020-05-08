import BaseJoi, { ObjectSchema } from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
const Joi = BaseJoi.extend(JoiDate);

import { resolverFactory } from '../util';
import { GroceryList } from '../../orm';

const argsSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required(),
    // TODO: improve validation
    items: Joi.array()
}).required();

const fetchTeamId = async (args) => {
    const qb = GroceryList.query().findById(args.id);

    const result = await qb;

    return result === undefined ? undefined : result.toJSON().teamId;
};

const resolver = (rootValue: undefined, { id, items }) => {
    const qb = GroceryList.query().updateAndFetchById(id, { items });

    return qb.execute();
};

export default resolverFactory({
    validate: { args: argsSchema },
    accessControl: { fetchTeamId },
    resolver
});

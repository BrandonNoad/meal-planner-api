import BaseJoi, { ObjectSchema } from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
const Joi = BaseJoi.extend(JoiDate);

import { resolverFactory } from '../util';
import { ScheduledRecipe } from '../../orm';

const argsSchema = Joi.object({
    teamId: Joi.number()
        .integer()
        .positive()
        .required(),
    options: Joi.object({
        filter: Joi.object({
            date: Joi.array()
                .items(
                    Joi.string()
                        .trim()
                        .custom((value: string) => {
                            const schema = Joi.date().format('YYYY-MM-DD');

                            Joi.assert(value, schema);

                            return value;
                        })
                        .required()
                )
                .optional()
        }).optional()
    }).optional()
}).required();

interface ScheduledRecipesArgs {
    teamId: number;
    options?: {
        filter?: {
            date?: string[];
        };
    };
}

const resolver = async (rootValue: undefined, { teamId, options = {} }: ScheduledRecipesArgs) => {
    let qb = ScheduledRecipe.query().where('team_id', teamId);

    const { filter = {} } = options;

    if (filter.date !== undefined) {
        qb = qb.whereIn('date_scheduled', filter.date);
    }

    const results = await qb;

    return results.map((instance: any) => ({
        id: instance.id,
        date: instance.dateScheduled,
        recipeId: instance.recipeId
    }));
};

export default resolverFactory({
    validate: { args: argsSchema },
    resolver
});

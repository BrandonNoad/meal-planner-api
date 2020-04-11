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
    recipeId: Joi.number()
        .integer()
        .positive()
        .required(),
    date: Joi.string()
        .trim()
        .custom((value: string) => {
            const schema = Joi.date().format('YYYY-MM-DD');

            Joi.assert(value, schema);

            return value;
        })
        .required()
}).required();

interface ScheduleRecipeArgs {
    teamId: number;
    recipeId: number;
    date: string;
}

const resolver = (rootValue: undefined, { teamId, recipeId, date }: ScheduleRecipeArgs) => {
    const qb = ScheduledRecipe.query().insertAndFetch({
        teamId: teamId,
        recipeId: recipeId,
        dateScheduled: date
    });

    return qb.execute();
};

export default resolverFactory({
    validate: { args: argsSchema },
    resolver
});

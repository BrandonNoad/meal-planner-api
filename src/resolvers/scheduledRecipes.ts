import BaseJoi, { ObjectSchema } from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
const Joi = BaseJoi.extend(JoiDate);

import { queryResolverFactory } from './util';
import * as ScheduledRecipeService from '../services/ScheduledRecipe';

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
});

interface ScheduledRecipesArgs {
    teamId: number;
    options?: {
        filter?: {
            date?: string[];
        };
    };
}

const resolver = (rootValue: undefined, { teamId, options }: ScheduledRecipesArgs) =>
    ScheduledRecipeService.fetchForTeam(teamId, options);

export default queryResolverFactory({
    validate: {
        args: argsSchema
    },
    resolver
});

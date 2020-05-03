import BaseJoi, { ObjectSchema } from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
const Joi = BaseJoi.extend(JoiDate);
const Moment = require('moment');

import { resolverFactory } from '../util';
import { GroceryList } from '../../orm';

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
                            const schema = Joi.date().format('GGGG-[W]W');

                            Joi.assert(value, schema);

                            return value;
                        })
                        .required()
                )
                .optional()
        }).optional()
    }).optional()
}).required();

interface GroceryListsArgs {
    teamId: number;
    options?: {
        filter?: {
            date?: string[];
        };
    };
}

const resolver = async (rootValue: undefined, { teamId, options = {} }: GroceryListsArgs) => {
    let qb = GroceryList.query().where('team_id', teamId);

    const { filter = {} } = options;

    if (filter.date !== undefined) {
        qb = qb.whereIn(
            ['year', 'week'],
            filter.date.map((dateString) => {
                const moment = Moment(dateString, 'GGGG-[W]W', true);

                const year = moment.isoWeekYear();

                const week = moment.isoWeek();

                return [year, week];
            })
        );
    }

    const results = await qb;

    return results.map((instance) => ({
        ...instance.toJSON()
    }));
};

export default resolverFactory({
    validate: { args: argsSchema },
    resolver
});

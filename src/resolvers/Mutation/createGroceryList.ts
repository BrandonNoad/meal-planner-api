import Moment from 'moment';
import BaseJoi, { ObjectSchema } from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
const Joi = BaseJoi.extend(JoiDate);

import { resolverFactory } from '../util';
import { GroceryList, ScheduledRecipe } from '../../orm';

const argsSchema = Joi.object({
    teamId: Joi.number()
        .integer()
        .positive()
        .required(),
    date: Joi.string()
        .trim()
        .custom((value: string) => {
            const schema = Joi.date().format('GGGG-[W]W');

            Joi.assert(value, schema);

            return value;
        })
        .required()
}).required();

interface CreateGroceryListArgs {
    teamId: number;
    date: string;
}

// TODO: check that a grocery list for this week does not already exist.
const resolver = async (rootValue: undefined, { teamId, date }: CreateGroceryListArgs) => {
    const moment = Moment(date, 'GGGG-[W]W', true);

    const year = moment.isoWeekYear();

    const week = moment.isoWeek();

    // Monday
    const startDate = Moment(moment)
        .isoWeekday(1)
        .format('YYYY-MM-DD');

    // Sunday
    const endDate = Moment(moment)
        .isoWeekday(7)
        .format('YYYY-MM-DD');

    const itemsQb = ScheduledRecipe.query()
        .joinRelated('recipe.ingredients.foodItem')
        .select(
            'recipe:ingredients:foodItem.name',
            'recipe:ingredients:foodItem.category',
            'recipe:ingredients.unit'
        )
        .sum('recipe:ingredients.quantity as quantity')
        .whereBetween('date_scheduled', [startDate, endDate])
        .groupBy(['recipe:ingredients:foodItem.id', 'recipe:ingredients.unit']);

    const results = await itemsQb;

    const items = results.map((instance) => ({
        ...instance.toJSON()
    }));

    const insertGroceryListQb = GroceryList.query().insertAndFetch({
        teamId,
        year,
        week,
        name: `Grocery List - ${date}`,
        items
    });

    return insertGroceryListQb.execute();
};

export default resolverFactory({
    validate: { args: argsSchema },
    resolver
});

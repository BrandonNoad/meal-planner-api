import Joi, { ObjectSchema } from '@hapi/joi';
import Axios from 'axios';

import { resolverFactory } from '../util';
import { ImportRecipeTask, Recipe, FoodItem, Ingredient, TeamRecipe } from '../../orm';

const argsSchema = Joi.object({
    teamId: Joi.number()
        .integer()
        .positive()
        .required(),
    url: Joi.string()
        .uri()
        .required()
}).required();

interface ImportRecipeArgs {
    teamId: number;
    url: string;
}

const importRecipe = async (importRecipeTaskId, teamId, url) => {
    // TODO: use transaction

    const { data: recipeMeta } = await Axios.get(
        'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract',
        {
            headers: {
                'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                'x-rapidapi-key': '9U7HvEFjIymshw8KnNtgianqZYIPp1DlQm5jsntZR5cVhwAz8W'
            },
            params: { url }
        }
    );

    const insertRecipeQb = Recipe.query().insertAndFetch({
        name: recipeMeta.title,
        url,
        meta: recipeMeta
    });

    const result = await insertRecipeQb;

    const recipeId = result.id;

    await Promise.all(
        recipeMeta.extendedIngredients.map(async (ingredient) => {
            const findFoodItemQb = FoodItem.query().findOne({ name: ingredient.name });

            let foodItem = await findFoodItemQb;

            if (foodItem === undefined) {
                const insertFoodItemQb = FoodItem.query().insertAndFetch({
                    name: ingredient.name,
                    category: ingredient.aisle
                });

                foodItem = await insertFoodItemQb;
            }

            // TODO: batch inserts?
            const insertIngredientQb = Ingredient.query().insertAndFetch({
                recipeId,
                foodItemId: foodItem.id,
                quantity: ingredient.amount,
                unit: ingredient.unit === '' ? null : ingredient.unit
            });

            return insertIngredientQb.execute();
        })
    );

    const insertTeamRecipeQb = TeamRecipe.query().insert({ recipeId, teamId: teamId });

    await insertTeamRecipeQb;

    const updateImportRecipeTaskQb = ImportRecipeTask.query()
        .update({ recipeId, state: 'Done' })
        .where('id', importRecipeTaskId);

    return updateImportRecipeTaskQb.execute();

    // TODO: handle errors
    // const updateImportRecipeTaskQb = ImportRecipeTask.query()
    //     .update({ state: 'Error' })
    //     .where('id', importRecipeTaskId);
};

const resolver = async (rootValue: undefined, { teamId, url }: ImportRecipeArgs) => {
    const qb = ImportRecipeTask.query().insertAndFetch({ teamId, state: 'Pending', url });

    const result = await qb;

    // Do not wait for this promise to resolve.
    importRecipe(result.id, teamId, url);

    return {
        teamId: result.teamId,
        state: result.state,
        url: result.url,
        recipeId: result.recipeId
    };
};

export default resolverFactory({
    validate: { args: argsSchema },
    resolver
});

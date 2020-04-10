import { Ingredient } from '../../orm';

const resolver = async ({ id }) => {
    const qb = Ingredient.query()
        .withGraphFetched('foodItem')
        .where('recipe_id', id);

    const results = await qb;

    return results.map((result) => ({
        name: result.foodItem.name,
        quantity: result.quantity,
        unit: result.unit
    }));
};

export default resolver;

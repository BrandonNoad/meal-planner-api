import { Recipe } from '../../orm';

const resolver = async ({ recipeId }) => {
    const qb = Recipe.query().findById(recipeId);

    const result = await qb;

    if (result === undefined) {
        return null;
    }

    const { id, name, url } = result.toJSON();

    return { id, name, url };
};

export default resolver;

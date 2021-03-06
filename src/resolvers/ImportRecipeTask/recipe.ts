import { Recipe } from '../../orm';

const resolver = async ({ recipeId }) => {
    if (recipeId === null) {
        return null;
    }

    const qb = Recipe.query().findById(recipeId);

    const result = await qb;

    if (result === undefined) {
        return null;
    }

    const { id, name, url } = result;

    return { id, name, url };
};

export default resolver;

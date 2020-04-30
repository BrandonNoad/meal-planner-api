import { BaseModel, Ingredient } from '.';

const { HasManyRelation } = BaseModel;

class Recipe extends BaseModel {
    id: number;
    name: string;
    url: string;
    meta: { [key: string]: any };

    static get tableName() {
        return 'recipes';
    }

    static get jsonAttributes() {
        return ['meta'];
    }

    static get relationMappings() {
        return {
            ingredients: {
                relation: HasManyRelation,
                modelClass: Ingredient,
                join: {
                    from: 'recipes.id',
                    to: 'ingredients.recipe_id'
                }
            }
        };
    }
}

export default Recipe;

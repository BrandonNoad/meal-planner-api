import { BaseModel, FoodItem } from '.';

const { BelongsToOneRelation } = BaseModel;

class Ingredient extends BaseModel {
    id: number;
    recipeId: number;
    foodItemId: number;
    quantity: number;
    unit: string | null;

    static get tableName() {
        return 'ingredients';
    }

    static get relationMappings() {
        return {
            foodItem: {
                relation: BelongsToOneRelation,
                modelClass: FoodItem,
                join: {
                    from: 'ingredients.food_item_id',
                    to: 'food_items.id'
                }
            }
        };
    }
}

export default Ingredient;

import { BaseModel, FoodItem } from '.';

const { BelongsToOneRelation } = BaseModel;

class Ingredient extends BaseModel {
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

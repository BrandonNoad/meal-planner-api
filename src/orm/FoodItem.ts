import { BaseModel } from '.';

class FoodItem extends BaseModel {
    static get tableName() {
        return 'food_items';
    }
}

export default FoodItem;

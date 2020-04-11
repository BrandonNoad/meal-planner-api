import { BaseModel } from '.';

class FoodItem extends BaseModel {
    id: number;
    name: string;
    category: string;

    static get tableName() {
        return 'food_items';
    }
}

export default FoodItem;

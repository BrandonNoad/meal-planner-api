import { BaseModel } from '.';

class GroceryList extends BaseModel {
    id: number;
    teamId: number;
    year: number;
    week: number;
    name: string;
    items: any[];

    static get tableName() {
        return 'grocery_lists';
    }

    static get jsonAttributes() {
        return ['items'];
    }
}

export default GroceryList;

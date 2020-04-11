import { BaseModel } from '.';

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
}

export default Recipe;

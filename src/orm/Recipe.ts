import { BaseModel } from '.';

class Recipe extends BaseModel {
    static get tableName() {
        return 'recipes';
    }

    static get jsonAttributes() {
        return ['meta'];
    }
}

export default Recipe;

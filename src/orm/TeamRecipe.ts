import { BaseModel } from '.';

class TeamRecipe extends BaseModel {
    static get tableName() {
        return 'team_recipes';
    }

    static get idColumn() {
        return ['recipe_id', 'team_id'];
    }
}

export default TeamRecipe;

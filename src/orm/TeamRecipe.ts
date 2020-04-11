import { BaseModel, Recipe } from '.';

const { BelongsToOneRelation } = BaseModel;

class TeamRecipe extends BaseModel {
    recipeId: number;
    teamId: number;

    static get tableName() {
        return 'team_recipes';
    }

    static get idColumn() {
        return ['recipe_id', 'team_id'];
    }

    static get relationMappings() {
        return {
            recipe: {
                relation: BelongsToOneRelation,
                modelClass: Recipe,
                join: {
                    from: 'team_recipes.recipe_id',
                    to: 'recipes.id'
                }
            }
        };
    }
}

export default TeamRecipe;

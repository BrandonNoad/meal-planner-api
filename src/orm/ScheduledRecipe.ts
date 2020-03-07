import { BaseModel, Recipe, Team } from '.';

const { BelongsToOneRelation } = BaseModel;

class ScheduledRecipe extends BaseModel {
    static get tableName() {
        return 'scheduled_recipes';
    }

    static get relationMappings() {
        return {
            recipe: {
                relation: BelongsToOneRelation,
                modelClass: Recipe,
                join: {
                    from: 'scheduled_recipes.recipe_id',
                    to: 'recipes.id'
                }
            },
            team: {
                relation: BelongsToOneRelation,
                modelClass: Team,
                join: {
                    from: 'scheduled_recipes.team_id',
                    to: 'teams.id'
                }
            }
        };
    }
}

export default ScheduledRecipe;

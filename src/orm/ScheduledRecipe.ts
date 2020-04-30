import { BaseModel, Recipe } from '.';

const { BelongsToOneRelation } = BaseModel;

class ScheduledRecipe extends BaseModel {
    id: number;
    recipeId: number;
    teamId: number;
    dateScheduled: string;

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
            }
        };
    }
}

export default ScheduledRecipe;

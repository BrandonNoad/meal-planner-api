import { BaseModel } from '.';

class ScheduledRecipe extends BaseModel {
    id: number;
    recipeId: number;
    teamId: number;
    dateScheduled: string;

    static get tableName() {
        return 'scheduled_recipes';
    }
}

export default ScheduledRecipe;

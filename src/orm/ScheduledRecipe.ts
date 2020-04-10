import { BaseModel } from '.';

class ScheduledRecipe extends BaseModel {
    static get tableName() {
        return 'scheduled_recipes';
    }
}

export default ScheduledRecipe;

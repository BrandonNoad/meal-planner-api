import { BaseModel } from '.';

class ImportRecipeTask extends BaseModel {
    id: number;
    teamId: number;
    state: string;
    url: string;
    recipeId: number | null;

    static get tableName() {
        return 'import_recipe_tasks';
    }
}

export default ImportRecipeTask;

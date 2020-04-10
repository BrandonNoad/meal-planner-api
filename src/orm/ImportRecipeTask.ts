import { BaseModel } from '.';

class ImportRecipeTask extends BaseModel {
    static get tableName() {
        return 'import_recipe_tasks';
    }
}

export default ImportRecipeTask;

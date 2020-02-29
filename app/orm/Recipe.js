const { HasManyRelation } = require('objection');
const BaseModel = require('./BaseModel');

class Recipe extends BaseModel {
    static get tableName() {
        return 'recipes';
    }

    static get jsonAttributes() {
        return ['meta'];
    }

    static get relationMappings() {
        const { ScheduledRecipe } = require('./index');

        return {
            scheduledRecipes: {
                relation: HasManyRelation,
                modelClass: ScheduledRecipe,
                join: {
                    from: 'recipes.id',
                    to: 'scheduled_recipes.recipe_id'
                }
            }
        };
    }
}

module.exports = Recipe;

const BaseModel = require('./BaseModel');
const { HasManyRelation } = require('objection');

class Recipe extends BaseModel {
    static get tableName() {
        return 'recipes';
    }

    static get jsonAttributes() {
        return ['meta'];
    }

    static get relationMappings() {
        const ScheduledRecipe = require('./ScheduledRecipe');

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

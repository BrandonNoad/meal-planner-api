const BaseModel = require('./BaseModel');
const { BelongsToOneRelation } = require('objection');

class ScheduledRecipe extends BaseModel {
    static get tableName() {
        return 'scheduled_recipes';
    }

    static get relationMappings() {
        const Recipe = require('./Recipe');

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

module.exports = ScheduledRecipe;

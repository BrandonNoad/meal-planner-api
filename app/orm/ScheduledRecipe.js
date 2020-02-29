const { BelongsToOneRelation } = require('objection');
const BaseModel = require('./BaseModel');

class ScheduledRecipe extends BaseModel {
    static get tableName() {
        return 'scheduled_recipes';
    }

    static get relationMappings() {
        const { Recipe, Team } = require('./index');

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

module.exports = ScheduledRecipe;

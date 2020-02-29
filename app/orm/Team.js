const { HasManyRelation } = require('objection');
const BaseModel = require('./BaseModel');

class Team extends BaseModel {
    static get tableName() {
        return 'teams';
    }

    static get relationMappings() {
        const { TeamMember, Recipe } = require('./index');

        return {
            members: {
                relation: HasManyRelation,
                modelClass: TeamMember,
                join: {
                    from: 'teams.id',
                    to: 'team_members.team_id'
                }
            },
            recipes: {
                relation: HasManyRelation,
                modelClass: Recipe,
                join: {
                    from: 'teams.id',
                    through: {
                        from: 'team_recipes.team_id',
                        to: 'team_recipes.recipe_id'
                    },
                    to: 'recipes.recipe_id'
                }
            }
        };
    }
}

module.exports = Team;

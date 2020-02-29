const { BelongsToOneRelation } = require('objection');
const BaseModel = require('./BaseModel');

class TeamMember extends BaseModel {
    static get tableName() {
        return 'team_members';
    }

    static get relationMappings() {
        const { Team } = require('./index');

        return {
            team: {
                relation: BelongsToOneRelation,
                modelClass: Team,
                join: {
                    from: 'team_members.team_id',
                    to: 'teams.id'
                }
            }
        };
    }
}

module.exports = TeamMember;

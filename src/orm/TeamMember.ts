import { BaseModel, Team } from '.';

const { BelongsToOneRelation } = BaseModel;

class TeamMember extends BaseModel {
    static get tableName() {
        return 'team_members';
    }

    static get relationMappings() {
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

export default TeamMember;
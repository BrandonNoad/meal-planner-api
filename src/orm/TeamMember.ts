import { BaseModel, Team } from '.';

const { BelongsToOneRelation } = BaseModel;

class TeamMember extends BaseModel {
    teamId: number;
    auth0UserId: number;

    static get tableName() {
        return 'team_members';
    }

    static get idColumn() {
        return ['team_id', 'auth0_user_id'];
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

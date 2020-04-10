import { BaseModel } from '.';

class Team extends BaseModel {
    static get tableName() {
        return 'teams';
    }
}

export default Team;

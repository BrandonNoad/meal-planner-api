import { BaseModel } from '.';

class Team extends BaseModel {
    id: number;
    name: string;

    static get tableName() {
        return 'teams';
    }
}

export default Team;

import { Team } from '../../orm';

const resolver = async ({ teamId }) => {
    const qb = Team.query().findById(teamId);

    const result = await qb;

    if (result === undefined) {
        return null;
    }

    const { id, name } = result;

    return { id, name };
};

export default resolver;

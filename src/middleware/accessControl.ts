import { TeamMember, Team } from '../orm';

interface Credentials {
    userId?: number;
}

interface AuthorizeArgs {
    credentials: Credentials;
    teamId: number | undefined;
}

export const authorize = async ({ credentials, teamId }: AuthorizeArgs) => {
    if (credentials.userId === undefined) {
        throw new Error('Invalid credentials');
    }

    if (teamId === undefined) {
        throw new Error('Invalid teamId');
    }

    const qb = TeamMember.query()
        .withGraphFetched('team')
        .where('auth0_user_id', credentials.userId);

    const results = await qb;

    const teamsForUser = results.map((instance: any) => ({ ...instance.team }));

    const match = teamsForUser.find(({ id }) => id === teamId);

    if (match === undefined) {
        throw new Error(`Not a team member of team ${teamId}`);
    }

    return true;
};

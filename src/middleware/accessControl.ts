import * as TeamService from '../services/Team';

export const authorize = async ({ credentials, args }) => {
    if (credentials.userId === undefined) {
        throw new Error('Invalid credentials');
    }

    if (args.teamId === undefined) {
        throw new Error('args is missing the teamId');
    }

    const teamsForUser = await TeamService.fetchForUser(credentials.userId);

    const match = teamsForUser.find(({ id }) => id === args.teamId);

    if (match === undefined) {
        throw new Error(`Not a team member of team ${args.teamId}`);
    }

    return true;
};

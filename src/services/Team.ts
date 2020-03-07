import { Team, TeamMember } from '../orm';

// const getCommonQb = () => Team.query().withGraphFetched('members');

// type Team {
//     id: ID!
//     name: String!
//     members: [User!]!
//     recipes: [Recipe!]!
//     scheduledRecipes: [ScheduledRecipe!]!
//     groceryLists: [GroceryList!]!
// }
const internalToSchema = (instance: Team) => {
    const { id, name, members } = instance.toJSON();

    return {
        id,
        name,
        members: members.map(({ id }) => ({
            id
        }))
    };
};

export const fetchForUser = async (userId: number) => {
    const qb = TeamMember.query()
        .withGraphFetched('team.members')
        .where('auth0_user_id', userId);

    const results = await qb;

    return results.map((instance: any) => internalToSchema(instance.team));
};

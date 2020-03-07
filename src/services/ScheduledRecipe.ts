import { ScheduledRecipe } from '../orm';

const getCommonQb = () => ScheduledRecipe.query().withGraphFetched('recipe');

interface FetchForTeamOptions {
    filter?: {
        date?: string[];
    };
}

const internalToSchema = (instance: ScheduledRecipe) => {
    const { id, dateScheduled, recipe } = instance.toJSON();

    return {
        id,
        date: dateScheduled,
        recipe: {
            id: recipe.id,
            name: recipe.name,
            url: recipe.url
        }
    };
};

export const fetchForTeam = async (teamId: number, { filter = {} }: FetchForTeamOptions = {}) => {
    let qb = getCommonQb().where('team_id', teamId);

    if (filter.date !== undefined) {
        qb = qb.whereIn('date_scheduled', filter.date);
    }

    const results = await qb;

    return results.map(internalToSchema);
};

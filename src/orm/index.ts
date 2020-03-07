import Knex, { Config } from 'knex';
import { Model } from 'objection';

interface KnexEnvironmentConfig {
    [id: string]: Config;
}

const init = (knexEnvironmentConfig: KnexEnvironmentConfig) => {
    const environment = process.env.NODE_ENV || 'development';

    if (knexEnvironmentConfig[environment] === undefined) {
        throw new Error('The knexfile is missing the specified environment!');
    }

    // Initialize knex.
    const knex = Knex(knexEnvironmentConfig[environment]);

    // Bind all Objection.js Models to the knex instance.
    Model.knex(knex);

    return knex;
};

export default init;

export { default as BaseModel } from './BaseModel';
export { default as Recipe } from './Recipe';
export { default as ScheduledRecipe } from './ScheduledRecipe';
export { default as Team } from './Team';
export { default as TeamMember } from './TeamMember';

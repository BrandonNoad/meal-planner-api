// -- Load environment variables

// Load environment variables from a .env file into process.env. If the .env file is missing (e.g.
// production), it will fail silently.
import Dotenv from 'dotenv';

Dotenv.config();

// -- Initialize the ORM

import initOrm from './orm';
import knexEnvironmentConfig from '../knexfile';

initOrm(knexEnvironmentConfig);

// -- Start the GraphQL server

import { ApolloServer } from 'apollo-server';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
});

(async function startServer() {
    const { url } = await server.listen({ port: process.env.PORT || 4000 });

    console.log(`🚀 Server ready at ${url}`);
})();

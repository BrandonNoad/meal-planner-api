'use strict';

// Load environment variables from a .env file into process.env. If the .env file is missing (e.g.
// production), it will fail silently.
require('dotenv').config();

const Server = require('./server');
const orm = require('./orm');
const knexConfig = require('../knexfile');

// Initialize the ORM.
orm.init(knexConfig);

const routeRegistrationOptions = { prefix: '/v1.0' };

const pluginOptions = {
    pagination: {
        query: {
            pagination: {
                active: false
            },
            invalid: 'badRequest'
        },
        meta: {
            location: 'header'
        },
        routes: {
            // Disable pagination by default. Needs to be enabled on a per route basis.
            include: []
        }
    }
};

// manifest specifying the hapi server options, connections, and registrations
const manifest = {
    server: {
        port: process.env.PORT || 3001,
        router: {
            isCaseSensitive: false,
            stripTrailingSlash: true
        },
        debug: {
            log: ['error', 'info', 'debug'],
            request: ['error', 'info', 'debug']
        },
        routes: {
            cors: true
        }
    },
    register: {
        plugins: [
            'hapi-auth-jwt2',
            './plugins/JwtAuthStrategy',
            './plugins/ServerAuthDefault',
            './plugins/TotalCount',
            {
                plugin: 'hapi-pagination',
                options: pluginOptions.pagination
            },
            {
                plugin: './routes/scheduled-recipe',
                routes: routeRegistrationOptions
            },
            {
                plugin: './routes/recipe',
                routes: routeRegistrationOptions
            }
        ]
    }
};

const composeOptions = {
    // File-system path string that is used to resolve loading modules with require. Used in
    // register.plugins[].
    // __dirname is the name of the directory that the currently executing script resides in
    relativeTo: __dirname
};

// Exit gracefully on various events/signals
const exitHandler = (options, err) => {
    if (err) {
        /* eslint-disable no-console */
        console.log('error', err.stack);
        /* eslint-enable no-console */
    }

    if (options.cleanUp) {
        // clean up!
        // TODO: clean up db using ORM?
    }

    if (options.exit) {
        // goodbye!
        process.exit();
    }
};

// clean up when app is closing
process.on('exit', exitHandler.bind(null, { cleanUp: true }));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

// the SIGUSR2 signal is used by nodemon to restart
// https://github.com/remy/nodemon#controlling-shutdown-of-your-script
process.once('SIGUSR2', () => {
    exitHandler({ cleanUp: true });
    process.kill(process.pid, 'SIGUSR2');
});

// Start the server
(async function startServer() {
    try {
        const server = await Server.init(manifest, composeOptions);

        server.log(['info'], `Server started at: ${server.info.uri}`);
    } catch (err) {
        // server failed to start properly...abort

        /* eslint-disable no-console */
        console.log('error', `Server failure: ${err}`);
        /* eslint-enable no-console */

        // clean up!
        exitHandler({ cleanUp: true });
    }
})();

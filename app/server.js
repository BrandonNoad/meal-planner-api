'use strict';

const Glue = require('glue');

exports.init = async (manifest, options) => {
    const server = await Glue.compose(
        manifest,
        options
    );

    await server.start();

    return server;
};

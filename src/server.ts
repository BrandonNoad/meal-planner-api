import Glue, { Manifest, Options } from '@hapi/glue';
import { Server } from '@hapi/hapi';

export const init = async (manifest: Manifest, options?: Options): Promise<Server> => {
    const server = await Glue.compose(manifest, options);

    await server.start();

    return server;
};

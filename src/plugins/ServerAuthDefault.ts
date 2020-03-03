import { Server } from '@hapi/hapi';

export const plugin = {
    name: 'server-auth-default',
    dependencies: ['jwt-auth-strategy'],
    async register(server: Server) {
        server.auth.default('jwt');
    }
};

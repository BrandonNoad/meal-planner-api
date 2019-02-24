'use strict';

const Hapi = require('hapi');

describe('GET /scheduledRecipes?date=YYYY-MM-DD', () => {
    const server = Hapi.server({ debug: false });

    const routeFactory = require('../../../../app/routes/scheduled-recipe/fetch-for-date/factory');

    const handler = jest.fn();

    const route = routeFactory(handler);

    const pluginFactory = require('../../../../app/routes/scheduled-recipe/factory');

    const plugin = pluginFactory([route]);

    beforeAll(() => {
        return server.register(plugin);
    });

    afterEach(() => {
        handler.mockClear();
    });

    const getUrl = (date) => `/scheduledRecipes?date=${date}`;

    it(`should call the route's handler when the request is valid`, async () => {
        await server.inject({ url: getUrl('2019-02-16') });

        expect(handler).toHaveBeenCalledTimes(1);
    });

    // TODO: test it is using the correct validators.
    // context('when the date query param is missing', () => {

    //     const url = '/scheduledRecipes';

    //     it('should respond with status code 400 Bad Request', async () => {

    //         const res = await server.inject({ url });

    //         expect(res.statusCode).to.equal(400);
    //         expect(res.payload).to.include('"statusCode":400,"error":"Bad Request"');
    //     });
    // });

    // context('when the date query param is provided', () => {

    //     context('and it is a valid date in YYYY-MM-DD format', () => {

    //         const url = '/scheduledRecipes?date=2018-07-25';

    //         it('should call the route\'s handler', async () => {

    //             const res = await server.inject({ url });

    //             expect(handler.calledOnce).to.be.true();
    //         });
    //     });

    //     context('and it is NOT a valid date in YYYY-MM-DD format', () => {

    //         const url = '/scheduledRecipes?date=2018/07/25';

    //         it('should respond with status code 400 Bad Request', async () => {

    //             const res = await server.inject({ url });

    //             expect(res.statusCode).to.equal(400);
    //             expect(res.payload).to.include('"statusCode":400,"error":"Bad Request"');
    //         });
    //     });
    // });
});

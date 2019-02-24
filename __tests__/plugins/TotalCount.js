'use strict';

const Hapi = require('hapi');

describe('TotalCount plugin', () => {
    const { factory } = require('../../app/plugins/TotalCount');

    describe('Plugin registration', () => {
        describe('when getOnPostHandler returns an onPostHandler', () => {
            const getOnPostHandler = (options) => async (request, h) => h.continue;

            const plugin = factory(getOnPostHandler);

            it('should not cause the server initialization to fail', () => {
                const server = Hapi.server();

                return server.register(plugin);
            });
        });

        describe('when getOnPostHandler throws', () => {
            const getOnPostHandler = (options) => {
                throw new Error('test');
            };

            const plugin = factory(getOnPostHandler);

            it('should cause the server initialization to fail', () => {
                const registerPlugin = () => {
                    const server = Hapi.server();

                    return server.register(plugin);
                };

                return expect(registerPlugin()).rejects.toThrow();
            });
        });
    });

    describe('onPostHandler', () => {
        const { getOnPostHandler } = require('../../app/plugins/TotalCount');

        const response = {
            header: jest.fn()
        };

        const h = {
            continue: 'toolkit signal'
        };

        afterEach(() => {
            response.header.mockClear();
        });

        describe('when the total-count plugin data in the request is not configured correctly', () => {
            const onPostHandler = getOnPostHandler();

            describe.each([undefined, { totalCount: '42' }])(
                'total-count plugin data is %s',
                (totalCountPluginData) => {
                    const request = {
                        response,
                        plugins: {
                            'total-count': totalCountPluginData
                        }
                    };

                    it('should not call the response.header function', async () => {
                        await onPostHandler(request, h);

                        expect(response.header).not.toHaveBeenCalledTimes(1);
                    });

                    it('should return h.continue', async () => {
                        const result = await onPostHandler(request, h);

                        expect(result).toBe(h.continue);
                    });
                }
            );
        });

        describe('when the total-count plugin data in the request is configured correctly', () => {
            const totalCount = 42;

            const request = {
                plugins: {
                    'total-count': { totalCount }
                },
                response
            };

            const { defaultTotalCountHeaderName } = require('../../app/plugins/TotalCount');

            const customTotalCountHeaderName = 'X-Custom-Total-Count';

            describe.each([
                [undefined, defaultTotalCountHeaderName],
                [customTotalCountHeaderName, customTotalCountHeaderName]
            ])(
                'and totalCountHeaderName passed to getOnPostHandler is %s',
                (totalCountHeaderName, expectedTotalCountHeaderName) => {
                    const onPostHandler = getOnPostHandler({ totalCountHeaderName });

                    it('should call the response.header function with the correct header name and totalCount', async () => {
                        await onPostHandler(request, h);

                        expect(response.header).toHaveBeenCalledWith(
                            expectedTotalCountHeaderName,
                            totalCount
                        );
                    });

                    it('should return h.continue', async () => {
                        const result = await onPostHandler(request, h);

                        expect(result).toBe(h.continue);
                    });
                }
            );
        });
    });
});

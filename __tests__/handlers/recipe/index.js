'use strict';

describe('fetchAllPaginated', () => {
    const { fetchAllPaginatedFactory } = require('../../../app/handlers/recipe/factories');

    const request = {
        query: {
            page: 1,
            limit: 2
        },
        plugins: {}
    };

    describe('when the repository function succeeds', () => {
        describe.each([
            [
                [
                    {
                        id: 23,
                        name: 'nom nom',
                        url: 'https://nomnom.com'
                    },
                    {
                        id: 101,
                        name: 'yum yum',
                        url: 'https://yumyum.com'
                    }
                ],
                101
            ],
            [[], 0]
        ])('results: %p; total count: %p', (results, totalCount) => {
            afterEach(() => {
                delete request.totalCount;

                delete request.plugins['total-count'];
            });
            const fetchPage = (page, limit) => Promise.resolve({ results, totalCount });

            const handler = fetchAllPaginatedFactory({ fetchPage });

            it('should return a promise that is fulfilled with an array of recipe objects', async () => {
                const result = await handler(request);

                expect(result).toEqual(results);
            });

            it('should set request.totalCount for the hapi-pagination plugin', async () => {
                await handler(request);

                expect(request.totalCount).toBe(totalCount);
            });

            it(`should set request.plugins['total-count'] for the total-count plugin`, async () => {
                const result = await handler(request);

                expect(request.plugins['total-count']).toEqual({ totalCount });
            });
        });
    });

    describe('when the repository function fails', () => {
        const fetchPage = (page, limit) => Promise.reject(new Error('repository function failed!'));

        const handler = fetchAllPaginatedFactory({ fetchPage });

        it('should return a promise that is rejected', () => {
            return expect(handler(request)).rejects.toThrow();
        });
    });
});

describe('fetchSuggestions', () => {
    const { fetchSuggestionsFactory } = require('../../../app/handlers/recipe/factories');

    const request = {};

    describe('when the repository function succeeds', () => {
        describe.each([
            [
                {
                    id: 23,
                    name: 'nom nom',
                    url: 'https://nomnom.com'
                },
                {
                    id: 101,
                    name: 'yum yum',
                    url: 'https://yumyum.com'
                }
            ],
            []
        ])('results: %p', (results) => {
            const fetchSuggestions = () => Promise.resolve(results);

            const handler = fetchSuggestionsFactory({ fetchSuggestions });

            it('should return a promise that is fulfilled with an array of recipe objects', async () => {
                const result = await handler(request);

                expect(result).toEqual(results);
            });
        });
    });

    describe('when the repository function fails', () => {
        const fetchSuggestions = () => Promise.reject(new Error('repository function failed!'));

        const handler = fetchSuggestionsFactory({ fetchSuggestions });

        it('should return a promise that is rejected', () => {
            return expect(handler(request)).rejects.toThrow();
        });
    });
});

'use strict';

describe('fetchForDatePaginated', () => {
    const {
        fetchForDatePaginatedFactory
    } = require('../../../app/handlers/scheduled-recipe/factories');

    const request = {
        query: {
            page: 1,
            limit: 2,
            date: '2019-02-16'
        },
        plugins: {}
    };

    describe('when the repository function succeeds', () => {
        describe.each([
            [
                [
                    {
                        id: 42,
                        recipe: {
                            id: 23,
                            name: 'nom nom',
                            url: 'https://nomnom.com'
                        },
                        dateScheduled: request.query.date
                    },
                    {
                        id: 99,
                        recipe: {
                            id: 101,
                            name: 'yum yum',
                            url: 'https://yumyum.com'
                        },
                        dateScheduled: request.query.date
                    }
                ],
                31
            ],
            [[], 0]
        ])('results: %p; total count: %p', (results, totalCount) => {
            afterEach(() => {
                delete request.totalCount;

                delete request.plugins['total-count'];
            });
            const fetchPageForDate = (page, limit, date) =>
                Promise.resolve({ results, totalCount });

            const handler = fetchForDatePaginatedFactory({ fetchPageForDate });

            it('should return a promise that is fulfilled with an array of scheduledRecipe objects', async () => {
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
        const fetchPageForDate = (page, limit, date) =>
            Promise.reject(new Error('repository function failed!'));

        const handler = fetchForDatePaginatedFactory({ fetchPageForDate });

        it('should return a promise that is rejected', () => {
            return expect(handler(request)).rejects.toThrow();
        });
    });
});

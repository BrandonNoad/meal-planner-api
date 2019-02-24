'use strict';

const Joi = require('joi');

const PaginationHelper = require('../../app/util/PaginationHelper');

describe('PaginationHelper', () => {
    describe('queryValidationSchema', () => {
        describe('when some of the pagination query params are missing', () => {
            const expected = {
                page: PaginationHelper.DEFAULT_PAGE_NUMBER,
                limit: PaginationHelper.DEFAULT_RESOURCES_PER_PAGE
            };

            it.each([
                [undefined, PaginationHelper.DEFAULT_RESOURCES_PER_PAGE, expected],
                [PaginationHelper.DEFAULT_PAGE_NUMBER, undefined, expected],
                [undefined, undefined, expected]
            ])('should set the default value for any missing params', (page, limit, expected) => {
                const query = { page, limit };

                const { error, value } = Joi.validate(
                    query,
                    PaginationHelper.queryValidationSchema
                );

                expect(error).toBeNull();
                expect(value).toEqual(expected);
            });
        });

        describe('when the page value is invalid', () => {
            it.each(['foobar', 1.5, 0])(
                'should cause validation to fail when page is %p',
                (page) => {
                    const query = {
                        page,
                        limit: PaginationHelper.DEFAULT_RESOURCES_PER_PAGE
                    };

                    const { error } = Joi.validate(query, PaginationHelper.queryValidationSchema);

                    expect(error).toBeInstanceOf(Error);
                }
            );
        });

        describe('when the limit value is invalid', () => {
            it.each(['foobar', 11.11, 0, PaginationHelper.MAX_RESOURCES_PER_PAGE + 1])(
                'should cause validation to fail when limit is %p',
                (limit) => {
                    const query = {
                        page: PaginationHelper.DEFAULT_PAGE_NUMBER,
                        limit
                    };

                    const { error } = Joi.validate(query, PaginationHelper.queryValidationSchema);

                    expect(error).toBeInstanceOf(Error);
                }
            );
        });
    });
});

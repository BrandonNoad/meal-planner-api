'use strict';

const {
    queryValidationSchema: paginationQueryValidationSchema
} = require('../../../util/PaginationHelper');

module.exports = (handler) => ({
    method: 'GET',
    path: '/recipes',
    handler,
    options: {
        plugins: {
            pagination: {
                enabled: true
            }
        },
        validate: {
            query: {
                ...paginationQueryValidationSchema
            }
        }
    }
});

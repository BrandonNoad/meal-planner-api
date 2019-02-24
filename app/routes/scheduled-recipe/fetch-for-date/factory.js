'use strict';

const JoiDateExtensions = require('joi-date-extensions');
const Joi = require('joi').extend(JoiDateExtensions);

const {
    queryValidationSchema: paginationQueryValidationSchema
} = require('../../../util/PaginationHelper');

module.exports = (handler) => ({
    method: 'GET',
    path: '/scheduledRecipes',
    handler,
    options: {
        plugins: {
            pagination: {
                enabled: true
            }
        },
        validate: {
            query: {
                ...paginationQueryValidationSchema,

                // use .raw() instead of .options({ convert: false })
                // https://github.com/hapijs/joi/issues/762
                date: Joi.date()
                    .format('YYYY-MM-DD')
                    .required()
                    .raw()
            }
        }
    }
});

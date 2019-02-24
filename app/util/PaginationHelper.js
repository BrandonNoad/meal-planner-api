'use strict';

const Joi = require('joi');

const DEFAULT_PAGE_NUMBER = (exports.DEFAULT_PAGE_NUMBER = 1);
const DEFAULT_RESOURCES_PER_PAGE = (exports.DEFAULT_RESOURCES_PER_PAGE = 25);
const MAX_RESOURCES_PER_PAGE = (exports.MAX_RESOURCES_PER_PAGE = 100);

exports.queryValidationSchema = {
    page: Joi.number()
        .integer()
        .positive()
        .default(DEFAULT_PAGE_NUMBER),
    limit: Joi.number()
        .integer()
        .positive()
        .max(MAX_RESOURCES_PER_PAGE)
        .default(DEFAULT_RESOURCES_PER_PAGE)
};

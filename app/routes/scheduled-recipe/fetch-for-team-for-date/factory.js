'use strict';

const JoiDateExtensions = require('joi-date-extensions');
const Joi = require('joi').extend(JoiDateExtensions);
const Boom = require('boom');
const _get = require('lodash/get');
const _find = require('lodash/find');

const TeamRepository = require('../../../repositories/Team');

const {
    queryValidationSchema: paginationQueryValidationSchema
} = require('../../../util/PaginationHelper');

module.exports = (handler) => ({
    method: 'GET',
    path: '/teams/{teamId}/scheduledRecipes',
    handler,
    options: {
        plugins: {
            pagination: {
                enabled: true
            }
        },
        validate: {
            params: {
                teamId: Joi.number()
                    .integer()
                    .positive()
                    .required()
            },
            query: {
                ...paginationQueryValidationSchema,

                // use .raw() instead of .options({ convert: false })
                // https://github.com/hapijs/joi/issues/762
                date: Joi.date()
                    .format('YYYY-MM-DD')
                    .required()
                    .raw()
            }
        },
        pre: [
            {
                assign: 'teamMembers',
                async method(request) {
                    const { teamId } = request.params;

                    const team = await TeamRepository.fetchMembersForTeam(teamId);

                    return _get(team, 'members', []);
                }
            },
            {
                assign: 'isAuthorized',
                method(request) {
                    const auth0UserId = request.auth.credentials.payload.sub;

                    const { teamMembers } = request.pre;

                    if (_find(teamMembers, { auth0UserId }) === undefined) {
                        throw Boom.forbidden();
                    }

                    return true;
                }
            }
        ]
    }
});

import BaseJoi, { ObjectSchema } from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
const Joi = BaseJoi.extend(JoiDate);

import { queryResolverFactory } from './util';
import * as TeamService from '../services/Team';

const resolver = (rootValue: undefined, args: {}, { credentials }) =>
    TeamService.fetchForUser(credentials.userId);

export default queryResolverFactory({
    accessControl: false,
    resolver
});

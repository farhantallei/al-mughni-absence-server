import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  AddAbsentHandler,
  GetAbsentHandler,
  UpdateAbsentHandler,
} from './absent.handlers';
import {
  AddAbsentSchema,
  GetAbsentSchema,
  UpdateAbsentSchema,
} from './absent.schemas';

export const absentRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.get('/', {
    schema: GetAbsentSchema,
    handler: GetAbsentHandler,
  });
  route.post('/', {
    schema: AddAbsentSchema,
    handler: AddAbsentHandler,
  });
  route.patch('/', {
    schema: UpdateAbsentSchema,
    handler: UpdateAbsentHandler,
  });
};

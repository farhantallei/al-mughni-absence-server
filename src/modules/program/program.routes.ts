import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { GetProgramListHandler } from './program.handlers';
import { GetProgramListSchema } from './program.schemas';

export const programRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.get('/:pelajarId', {
    schema: GetProgramListSchema,
    handler: GetProgramListHandler,
  });
};

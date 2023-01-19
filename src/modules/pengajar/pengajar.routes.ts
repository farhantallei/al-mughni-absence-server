import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { GetPengajarHandler } from './pengajar.handlers';
import { GetPengajarSchema } from './pengajar.schemas';

export const pengajarRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.get('/', {
    schema: GetPengajarSchema,
    handler: GetPengajarHandler,
  });
};

import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  GetPengajarHandler,
  RegisterPelajarHandler,
} from './pengajar.handlers';
import { GetPengajarSchema, RegisterPelajarSchema } from './pengajar.schemas';

export const pengajarRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.get('/:programId', {
    schema: GetPengajarSchema,
    handler: GetPengajarHandler,
  });
  route.post('/', {
    schema: RegisterPelajarSchema,
    handler: RegisterPelajarHandler,
  });
};

import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  LoginHandler,
  RegisterHandler,
  ValidationHandler,
} from './pelajar.handlers';
import {
  LoginSchema,
  RegisterSchema,
  ValidationSchema,
} from './pelajar.schemas';

export const pelajarRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.get('/:username', {
    schema: ValidationSchema,
    handler: ValidationHandler,
  });
  route.post('/register', {
    schema: RegisterSchema,
    handler: RegisterHandler,
  });
  route.post('/login', {
    schema: LoginSchema,
    handler: LoginHandler,
  });
};

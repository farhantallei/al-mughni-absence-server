import { RouteHandlerTypebox } from '../../types';
import {
  LoginTSchema,
  RegisterTSchema,
  ValidationTSchema,
} from './pelajar.schemas';
import { createPelajar, getPelajar } from './pelajar.services';

export const RegisterHandler: RouteHandlerTypebox<RegisterTSchema> = async (
  request,
  reply
) => {
  const { username, name } = request.body;

  const pelajar = await getPelajar(reply, { username });
  if (pelajar) return reply.badRequest('Username is already taken.');

  const newPelajar = await createPelajar(reply, { username, name });

  return reply.code(201).send(newPelajar);
};

export const LoginHandler: RouteHandlerTypebox<LoginTSchema> = async (
  request,
  reply
) => {
  const { username } = request.body;

  const pelajar = await getPelajar(reply, { username });
  if (pelajar == null) return reply.badRequest('Username is not exists.');

  return reply.send(pelajar);
};

export const ValidationHandler: RouteHandlerTypebox<ValidationTSchema> = async (
  request,
  reply
) => {
  const { username } = request.params;

  const pelajar = await getPelajar(reply, { username });
  if (pelajar == null) return reply.unauthorized('Username is not exists.');

  return reply.send(pelajar);
};

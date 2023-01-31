import { Pelajar } from '../../models';
import { RouteHandlerTypebox } from '../../types';
import {
  LoginTSchema,
  RegisterTSchema,
  ValidationTSchema,
} from './pelajar.schemas';

export const RegisterHandler: RouteHandlerTypebox<RegisterTSchema> = async (
  request,
  reply
) => {
  const { username, name } = request.body;

  try {
    const pelajar = await Pelajar.findOne({ username });
    if (pelajar) return reply.badRequest('Username is already taken.');

    const newPelajar = await Pelajar.create({
      username: username.trim(),
      name,
    });

    return reply.code(201).send({
      id: newPelajar._id as unknown as string,
      username: newPelajar.username,
      name: newPelajar.name,
    });
  } catch (error) {
    return reply.internalServerError(`Error: ${error}`);
  }
};

export const LoginHandler: RouteHandlerTypebox<LoginTSchema> = async (
  request,
  reply
) => {
  const { username } = request.body;

  try {
    const pelajar = await Pelajar.findOne({ username: username.trim() });
    if (pelajar == null) return reply.badRequest('Username is not exists.');

    return reply.send({
      id: pelajar._id as unknown as string,
      username: pelajar.username,
      name: pelajar.name,
    });
  } catch (error) {
    return reply.internalServerError(`Error: ${error}`);
  }
};

export const ValidationHandler: RouteHandlerTypebox<ValidationTSchema> = async (
  request,
  reply
) => {
  const { username } = request.params;

  try {
    const pelajar = await Pelajar.findOne({ username });
    if (pelajar == null) return reply.unauthorized('Username is not exists.');

    return reply.send({
      id: pelajar._id as unknown as string,
      username: pelajar.username,
      name: pelajar.name,
    });
  } catch (error) {
    return reply.internalServerError(`Error: ${error}`);
  }
};

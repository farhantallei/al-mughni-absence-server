import { RouteHandlerTypebox } from '../../types';
import {
  AddAbsentTSchema,
  GetAbsentTSchema,
  UpdateAbsentTSchema,
} from './absent.schemas';
import {
  addAbsent,
  checkAbsent,
  getAbsent,
  updateAbsent,
} from './absent.services';

export const GetAbsentHandler: RouteHandlerTypebox<GetAbsentTSchema> = async (
  request,
  reply
) => {
  const { date, ...rest } = request.query;
  return await getAbsent(reply, { date: new Date(date), ...rest });
};

export const AddAbsentHandler: RouteHandlerTypebox<AddAbsentTSchema> = async (
  request,
  reply
) => {
  const { pelajarId, programId, date, present, reason, ...rest } = request.body;

  const isAbsentExists = await checkAbsent(reply, {
    pelajarId,
    programId,
    date: new Date(date),
  });
  if (isAbsentExists) return reply.badRequest('Cannot modify existing absent.');

  if (present === false && reason == null)
    return reply.badRequest('Fill the reason.');

  const absent = await addAbsent(reply, {
    pelajarId,
    programId,
    date: new Date(date),
    present,
    reason,
    ...rest,
  });

  return reply.code(201).send(absent);
};

export const UpdateAbsentHandler: RouteHandlerTypebox<
  UpdateAbsentTSchema
> = async (request, reply) => {
  const { pelajarId, programId, date, present, reason, ...rest } = request.body;

  const isAbsentExists = await checkAbsent(reply, {
    pelajarId,
    programId,
    date: new Date(date),
  });
  if (!isAbsentExists) return reply.badRequest('Absent is not found.');

  if (!present && reason == null) return reply.badRequest('Fill the reason.');

  return await updateAbsent(reply, {
    pelajarId,
    programId,
    date: new Date(date),
    present,
    reason: present ? null : reason,
    ...rest,
  });
};

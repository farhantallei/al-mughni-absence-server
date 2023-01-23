import { RouteHandlerTypebox } from '../../types';
import {
  AddScheduleTSchema,
  GetScheduleTSchema,
  UpdateScheduleTSchema,
} from './schedule.schemas';
import {
  addSchedule,
  checkSchedule,
  getSchedule,
  updateSchedule,
} from './schedule.services';

export const GetScheduleHandler: RouteHandlerTypebox<
  GetScheduleTSchema
> = async (request, reply) => {
  const { date, ...rest } = request.query;
  return await getSchedule(reply, { date: new Date(date), ...rest });
};

export const AddScheduleHandler: RouteHandlerTypebox<
  AddScheduleTSchema
> = async (request, reply) => {
  const { pengajarId, programId, date, available, reason } = request.body;

  const isScheduleExists = await checkSchedule(reply, {
    pengajarId,
    programId,
    date: new Date(date),
  });
  if (isScheduleExists)
    return reply.badRequest('Cannot modify existing absent.');

  if (available === false && reason === null)
    return reply.badRequest('Fill the reason.');

  const schedule = await addSchedule(reply, {
    pengajarId,
    programId,
    date: new Date(date),
    available,
    reason,
  });

  return reply.code(201).send(schedule);
};

export const UpdateScheduleHandler: RouteHandlerTypebox<
  UpdateScheduleTSchema
> = async (request, reply) => {
  const { pengajarId, programId, date, available, reason } = request.body;

  const isScheduleExists = await checkSchedule(reply, {
    pengajarId,
    programId,
    date: new Date(date),
  });
  if (!isScheduleExists) return reply.badRequest('Schedule is not found.');

  if (!available && reason === null)
    return reply.badRequest('Fill the reason.');

  return await updateSchedule(reply, {
    pengajarId,
    programId,
    date: new Date(date),
    available,
    reason: available ? null : reason,
  });
};

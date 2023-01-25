import { Absent, Schedule } from '../../models';
import { RouteHandlerTypebox } from '../../types';
import { formatDate } from '../../utils/formatDate';
import {
  AddScheduleTSchema,
  DeleteScheduleTSchema,
  GetScheduleTSchema,
  UpdateScheduleTSchema,
} from './schedule.schemas';

export const GetScheduleHandler: RouteHandlerTypebox<
  GetScheduleTSchema
> = async (request, reply) => {
  const { pengajarId, programId, date } = request.query;

  try {
    const schedule = await Schedule.findOne({ pengajarId, programId, date });
    if (!schedule) return reply.notFound('Schedule is not found.');

    return reply.send({
      id: schedule._id.toString(),
      pengajarId: schedule.pengajarId.toString(),
      programId: schedule.programId.toString(),
      date: formatDate(new Date(date)),
      available: schedule.available,
      reason: schedule.reason || null,
    });
  } catch (error) {
    return reply.internalServerError(`Error: ${error}`);
  }
};

export const AddScheduleHandler: RouteHandlerTypebox<
  AddScheduleTSchema
> = async (request, reply) => {
  const { pengajarId, programId, date, available, reason } = request.body;

  try {
    const schedule = await Schedule.findOne({ pengajarId, programId, date });
    if (schedule) return reply.badRequest('Cannot modify existing absent.');

    if (available === false && reason === null)
      return reply.badRequest('Fill the reason.');

    const newSchedule = await Schedule.create({
      pengajarId,
      programId,
      date: new Date(date),
      available,
      reason,
    });

    return reply.code(201).send({
      id: newSchedule._id as unknown as string,
      pengajarId: newSchedule.pengajarId as unknown as string,
      programId: newSchedule.programId as unknown as string,
      date: formatDate(newSchedule.date),
      available: newSchedule.available,
      reason: newSchedule.reason || null,
    });
  } catch (error) {
    return reply.internalServerError(`Error: ${error}`);
  }
};

export const UpdateScheduleHandler: RouteHandlerTypebox<
  UpdateScheduleTSchema
> = async (request, reply) => {
  const { pengajarId, programId, date, available, reason } = request.body;

  try {
    const schedule = await Schedule.findOne({ pengajarId, programId, date });
    if (!schedule) return reply.notFound('Schedule is not found.');

    if (!available && reason === null)
      return reply.badRequest('Fill the reason.');

    const newSchedule = {
      pengajarId,
      programId,
      date: new Date(date),
      available,
      reason: available ? null : reason,
    };

    await Absent.deleteMany({ pengajarId, programId, date });
    await Schedule.findOneAndUpdate(
      { pengajarId, programId, date },
      newSchedule,
      { new: true }
    );

    return reply.send({
      id: schedule._id as unknown as string,
      pengajarId,
      programId,
      date: formatDate(newSchedule.date),
      available,
      reason: newSchedule.reason || null,
    });
  } catch (error) {
    return reply.internalServerError(`Error: ${error}`);
  }
};

export const DeleteScheduleHandler: RouteHandlerTypebox<
  DeleteScheduleTSchema
> = async (request, reply) => {
  const { pengajarId, programId, date } = request.body;

  try {
    const schedule = await Schedule.findOneAndDelete({
      pengajarId,
      programId,
      date,
    });
    if (!schedule) return reply.notFound('Schedule is not found.');

    return reply.send({
      id: schedule._id.toString(),
      pengajarId: schedule.pengajarId.toString(),
      programId: schedule.programId.toString(),
      date: formatDate(new Date(date)),
      available: schedule.available,
      reason: schedule.reason || null,
    });
  } catch (error) {
    return reply.internalServerError(`Error: ${error}`);
  }
};

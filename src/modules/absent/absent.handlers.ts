import { Absent, Pengajar } from '../../models';
import { RouteHandlerTypebox } from '../../types';
import { formatDate } from '../../utils/formatDate';
import {
  AddAbsentTSchema,
  GetAbsentTSchema,
  UpdateAbsentTSchema,
} from './absent.schemas';

export const GetAbsentHandler: RouteHandlerTypebox<GetAbsentTSchema> = async (
  request,
  reply
) => {
  const { date, ...rest } = request.query;
  try {
    return await Absent.findOne({
      date: new Date(date),
      ...rest,
    }).then((res) => {
      if (!res) return null;
      return {
        id: res._id.toString(),
        pengajarId: res.pengajarId?.toString() || null,
        programId: res.programId.toString(),
        date: formatDate(res.date),
        present: res.present,
        reason: res.reason || null,
      };
    });
  } catch (error) {
    return reply.internalServerError(`Error: ${error}`);
  }
};

export const AddAbsentHandler: RouteHandlerTypebox<AddAbsentTSchema> = async (
  request,
  reply
) => {
  const { pelajarId, pengajarId, programId, date, present, reason } =
    request.body;

  try {
    const isAbsentExists = await Absent.findOne({
      pelajarId,
      programId,
      date: new Date(date),
    });
    if (isAbsentExists)
      return reply.badRequest('Cannot modify existing absent.');

    if (!present && reason == null) return reply.badRequest('Fill the reason.');

    const newAbsent = await Absent.create({
      pelajarId,
      pengajarId,
      programId,
      date: new Date(date),
      present,
      reason: reason?.trim(),
    });

    const pengajar = await Pengajar.findById(newAbsent.pengajarId);

    return reply.code(201).send({
      id: newAbsent._id.toString(),
      pengajarId: pengajar?._id.toString() || null,
      programId: newAbsent.programId.toString(),
      date: formatDate(newAbsent.date),
      present: newAbsent.present,
      reason: newAbsent.reason || null,
    });
  } catch (error) {
    return reply.internalServerError(`Error: ${error}`);
  }
};

export const UpdateAbsentHandler: RouteHandlerTypebox<
  UpdateAbsentTSchema
> = async (request, reply) => {
  const { pelajarId, pengajarId, programId, date, present, reason } =
    request.body;

  try {
    const absent = await Absent.findOne({
      pelajarId,
      programId,
      date: new Date(date),
    });
    if (!absent) return reply.notFound('Absent is not found.');

    if (!present && reason == null) return reply.badRequest('Fill the reason.');

    const newAbsent = {
      pelajarId,
      pengajarId,
      programId,
      date: new Date(date),
      present,
      reason: present ? null : reason?.trim(),
    };

    await Absent.findOneAndUpdate(
      {
        pelajarId,
        programId,
        date: new Date(date),
      },
      newAbsent,
      { new: true }
    );

    return reply.send({
      id: absent._id.toString(),
      pengajarId: absent.pengajarId?.toString() || null,
      programId,
      date: formatDate(newAbsent.date),
      present,
      reason: newAbsent.reason || null,
    });
  } catch (error) {
    return reply.internalServerError(`Error: ${error}`);
  }
};

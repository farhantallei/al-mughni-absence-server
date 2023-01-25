import { Pelajar, PelajarOnPengajar, Pengajar, Schedule } from '../../models';
import { RouteHandlerTypebox } from '../../types';
import { GetPengajarTSchema, RegisterPelajarTSchema } from './pengajar.schemas';

export const GetPengajarHandler: RouteHandlerTypebox<
  GetPengajarTSchema
> = async (request, reply) => {
  const { programId } = request.params;

  try {
    const pengajar = await Pengajar.find({ programId });

    let result: { id: string; username: string; name: string }[] = [];

    for (let i = 0; i < pengajar.length; i++) {
      const pelajar = await Pelajar.findById(pengajar[i].pelajarId);
      if (!pelajar) continue;

      result.push({
        id: pelajar._id as unknown as string,
        username: pelajar.username,
        name: pelajar.name,
      });
    }

    return result;
  } catch (error) {
    return reply.internalServerError(`Error: ${error}`);
  }
};

export const RegisterPelajarHandler: RouteHandlerTypebox<
  RegisterPelajarTSchema
> = async (request, reply) => {
  const { pelajarId, pengajarId, programId } = request.body;

  try {
    const isRegistered = await PelajarOnPengajar.findOne({
      pelajarId,
      pengajarId,
      programId,
    });
    if (isRegistered) return reply.badRequest('Pelajar is already registered.');

    const pengajar = await Pelajar.findById(pengajarId);
    if (!pengajar) return reply.badRequest('Pengajar is not found.');

    const schedule = await Schedule.findOne({ pengajarId, programId });

    const programStatus: 'available' | 'unavailable' | 'alibi' = schedule
      ? schedule.available
        ? 'available'
        : 'alibi'
      : 'unavailable';

    const register = await PelajarOnPengajar.create({
      pelajarId,
      pengajarId,
      programId,
    });

    const reason = schedule && schedule.reason != null ? schedule.reason : null;

    return reply.code(201).send({
      pelajarId: register.pelajarId.toString(),
      pengajarId: register.pengajarId.toString(),
      programId: register.programId.toString(),
      pengajarName: pengajar.name,
      programStatus,
      reason,
    });
  } catch (error) {
    return reply.internalServerError(`Error: ${error}`);
  }
};

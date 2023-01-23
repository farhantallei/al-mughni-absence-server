import { RouteHandlerTypebox } from '../../types';
import { GetPengajarTSchema, RegisterPelajarTSchema } from './pengajar.schemas';
import {
  checkPengajarByPelajarId,
  getPengajarByProgramId,
  getSchedule,
  setPengajar,
} from './pengajar.services';

export const GetPengajarHandler: RouteHandlerTypebox<
  GetPengajarTSchema
> = async (request, reply) => {
  const { programId } = request.params;
  return await getPengajarByProgramId(reply, { programId });
};

export const RegisterPelajarHandler: RouteHandlerTypebox<
  RegisterPelajarTSchema
> = async (request, reply) => {
  const { pelajarId, pengajarId, programId } = request.body;

  const isRegistered = await checkPengajarByPelajarId(reply, {
    pelajarId,
    programId,
  });
  if (isRegistered) return reply.badRequest('Pelajar is already registered.');

  const schedule = await getSchedule(reply, { pengajarId, programId });

  const programStatus: 'available' | 'unavailable' | 'alibi' = schedule
    ? schedule.available
      ? 'available'
      : 'alibi'
    : 'unavailable';

  return await setPengajar(reply, { pelajarId, pengajarId, programId }).then(
    ({ pengajar, ...res }) => ({
      ...res,
      pengajarName: pengajar.pelajar.name,
      programStatus,
      reason: schedule && schedule.reason != null ? schedule.reason : null,
    })
  );
};

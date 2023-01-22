import { RouteHandlerTypebox } from '../../types';
import { GetProgramListTSchema } from './program.schemas';
import {
  getPelajarByProgramId,
  getAbsentByProgramId,
  getProgram,
  getSchedulesByProgramId,
  checkPengajarByPelajarId,
} from './program.services';

export const GetProgramListHandler: RouteHandlerTypebox<
  GetProgramListTSchema
> = async (request, reply) => {
  const { pelajarId } = request.params;

  const programs = await getProgram(reply, { pelajarId });

  let result: {
    id: number;
    pengajarId: number | null;
    name: string;
    pengajar: boolean;
    individual: boolean;
    presentStatus: 'alpha' | 'present' | 'absent';
    programStatus: 'available' | 'unavailable' | 'alibi';
    reason: string | null;
  }[] = [];

  for (let i = 0; i < programs.length; i++) {
    let presentStatus: 'alpha' | 'present' | 'absent' = 'alpha';
    let programStatus: 'available' | 'unavailable' | 'alibi' = 'available';

    const absent = await getAbsentByProgramId(reply, {
      pelajarId,
      programId: programs[i].id,
    });

    if (absent == null) presentStatus = 'alpha';
    else if (absent.present) presentStatus = 'present';
    else presentStatus = 'absent';

    if (programs[i].individual) {
      result.push({
        id: programs[i].id,
        pengajarId: null,
        name: programs[i].name,
        individual: true,
        pengajar: false,
        presentStatus,
        programStatus,
        reason: absent?.reason || null,
      });
      continue;
    }

    const registeredPelajar = await getPelajarByProgramId(reply, {
      pelajarId,
      programId: programs[i].id,
    });

    const schedulesProgram = await getSchedulesByProgramId(reply, {
      programId: programs[i].id,
    });

    const isPengajar = await checkPengajarByPelajarId(reply, {
      pelajarId,
      programId: programs[i].id,
    });

    if (isPengajar) {
      const schedules = schedulesProgram.filter(
        ({ pengajarId }) => pengajarId === pelajarId
      );

      const programStatus: 'available' | 'unavailable' | 'alibi' =
        schedules.length > 0
          ? schedules[0].available
            ? 'available'
            : 'alibi'
          : 'unavailable';
      result.push({
        id: programs[i].id,
        pengajarId: pelajarId,
        name: programs[i].name,
        individual: false,
        pengajar: true,
        presentStatus,
        programStatus,
        reason:
          schedules.length > 0 && schedules[0].reason != null
            ? schedules[0].reason
            : absent?.reason || null,
      });
      continue;
    }

    if (registeredPelajar) {
      const schedules = schedulesProgram.filter(
        ({ pengajarId }) => pengajarId === registeredPelajar.pengajarId
      );

      const programStatus: 'available' | 'unavailable' | 'alibi' =
        schedules.length > 0
          ? schedules[0].available
            ? 'available'
            : 'alibi'
          : 'unavailable';
      result.push({
        id: programs[i].id,
        pengajarId: registeredPelajar.pengajarId,
        name: programs[i].name,
        individual: false,
        pengajar: false,
        presentStatus,
        programStatus,
        reason:
          schedules.length > 0 && schedules[0].reason != null
            ? schedules[0].reason
            : absent?.reason || null,
      });
      continue;
    }

    result.push({
      id: programs[i].id,
      pengajarId: null,
      name: programs[i].name,
      individual: false,
      pengajar: false,
      presentStatus,
      programStatus: 'unavailable',
      reason: absent?.reason || null,
    });
  }

  return result;
};

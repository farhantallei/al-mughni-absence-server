import {
  Absent,
  Pelajar,
  PelajarOnPengajar,
  Pengajar,
  Program,
  Schedule,
} from '../../models';
import { RouteHandlerTypebox } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { GetProgramListTSchema } from './program.schemas';

export const GetProgramListHandler: RouteHandlerTypebox<
  GetProgramListTSchema
> = async (request, reply) => {
  const { pelajarId } = request.params;

  try {
    const programs = await Program.find();
    // const pengajar = await Pengajar.find();

    let result: {
      id: string;
      pengajarId: string | null;
      pengajarName: string;
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

      const absent = await Absent.findOne({
        pelajarId,
        programId: programs[i]._id,
        date: new Date(formatDate(new Date())),
      });

      if (absent == null) presentStatus = 'alpha';
      else if (absent.present) presentStatus = 'present';
      else presentStatus = 'absent';

      if (programs[i].individual) {
        result.push({
          id: programs[i].id,
          pengajarId: null,
          pengajarName: '',
          name: programs[i].name,
          individual: true,
          pengajar: false,
          presentStatus,
          programStatus,
          reason: absent?.reason || null,
        });
        continue;
      }

      const schedulesProgram = await Schedule.find({
        programId: programs[i]._id,
        date: new Date(formatDate(new Date())),
      });

      const isPengajar = await Pengajar.findOne({
        pelajarId,
        programId: programs[i]._id,
      });

      // console.log({ schedulesProgram });
      // console.log({ isPengajar });

      if (isPengajar) {
        const schedules = schedulesProgram.filter(
          ({ pengajarId }) => pengajarId.toString() === pelajarId
        );

        const programStatus: 'available' | 'unavailable' | 'alibi' =
          schedules.length > 0
            ? schedules[0].available
              ? 'available'
              : 'alibi'
            : 'unavailable';

        const pengajar = await Pelajar.findById(pelajarId);
        if (!pengajar) return reply.badRequest('Pengajar is not found.');

        result.push({
          id: programs[i]._id as unknown as string,
          pengajarId: pelajarId,
          pengajarName: pengajar.name,
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

      const registeredPelajar = await PelajarOnPengajar.findOne({
        pelajarId,
        programId: programs[i]._id,
      });

      console.log(registeredPelajar);

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

        const pengajar = await Pelajar.findById(registeredPelajar.pengajarId);
        if (!pengajar) return reply.badRequest('Pengajar is not found.');

        result.push({
          id: programs[i]._id.toString(),
          pengajarId: registeredPelajar.pengajarId.toString(),
          pengajarName: pengajar.name,
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
        pengajarName: '',
        name: programs[i].name,
        individual: false,
        pengajar: false,
        presentStatus,
        programStatus: 'unavailable',
        reason: absent?.reason || null,
      });
    }

    console.log(result);

    return result;
  } catch (error) {
    return reply.internalServerError(`Error: ${error}`);
  }
};

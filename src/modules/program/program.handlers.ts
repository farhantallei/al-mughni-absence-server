import { RouteHandlerTypebox } from '../../types';
import { GetProgramListTSchema } from './program.schemas';
import { getAbsentByPelajarId, getProgram } from './program.services';

export const GetProgramListHandler: RouteHandlerTypebox<
  GetProgramListTSchema
> = async (request, reply) => {
  const { pelajarId } = request.params;

  const programs = await getProgram(reply);

  let result: {
    id: number;
    name: string;
    status: 'alpha' | 'present' | 'absent';
    reason: string | null;
  }[] = [];

  for (let i = 0; i < programs.length; i++) {
    const absent = await getAbsentByPelajarId(reply, {
      pelajarId,
      programId: programs[i].id,
    });

    let status: 'alpha' | 'present' | 'absent' = 'alpha';

    if (absent == null) status = 'alpha';
    else if (absent.present) status = 'present';
    else status = 'absent';

    result.push({
      id: programs[i].id,
      name: programs[i].name,
      status,
      reason: absent?.reason || null,
    });
  }

  return result;
};

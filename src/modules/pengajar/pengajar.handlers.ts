import { RouteHandlerTypebox } from '../../types';
import { GetPengajarTSchema } from './pengajar.schemas';
import { getPengajarByProgram } from './pengajar.services';

export const GetPengajarHandler: RouteHandlerTypebox<
  GetPengajarTSchema
> = async (request, reply) => {
  const { program } = request.query;
  return await getPengajarByProgram(reply, { program });
};

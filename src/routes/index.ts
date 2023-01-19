import { FastifyPluginAsync } from 'fastify';
import { absentRoutes } from '../modules/absent/absent.routes';
import { pelajarRoutes } from '../modules/pelajar/pelajar.routes';
import { pengajarRoutes } from '../modules/pengajar/pengajar.routes';
import { programRoutes } from '../modules/program/program.routes';

export const routes: FastifyPluginAsync = async (route) => {
  route.register(pelajarRoutes, { prefix: 'pelajar' });
  route.register(pengajarRoutes, { prefix: 'pengajar' });
  route.register(absentRoutes, { prefix: 'absent' });
  route.register(programRoutes, { prefix: 'program' });
};

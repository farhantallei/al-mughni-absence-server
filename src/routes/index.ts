import { FastifyPluginAsync } from 'fastify';
import { absentRoutes } from '../modules/absent/absent.routes';
import { pelajarRoutes } from '../modules/pelajar/pelajar.routes';
import { pengajarRoutes } from '../modules/pengajar/pengajar.routes';
import { programRoutes } from '../modules/program/program.routes';
import { scheduleRoutes } from '../modules/schedule/schedule.routes';

export const routes: FastifyPluginAsync = async (route) => {
  route.register(pelajarRoutes, { prefix: 'pelajar' });
  route.register(programRoutes, { prefix: 'program' });
  route.register(pengajarRoutes, { prefix: 'pengajar' });
  route.register(scheduleRoutes, { prefix: 'schedule' });
  route.register(absentRoutes, { prefix: 'absent' });
};

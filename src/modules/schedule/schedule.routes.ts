import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  GetScheduleHandler,
  AddScheduleHandler,
  UpdateScheduleHandler,
} from './schedule.handlers';
import {
  GetScheduleSchema,
  AddScheduleSchema,
  UpdateScheduleSchema,
} from './schedule.schemas';

export const scheduleRoutes: FastifyPluginAsyncTypebox = async (route) => {
  route.get('/', {
    schema: GetScheduleSchema,
    handler: GetScheduleHandler,
  });
  route.post('/', {
    schema: AddScheduleSchema,
    handler: AddScheduleHandler,
  });
  route.patch('/', {
    schema: UpdateScheduleSchema,
    handler: UpdateScheduleHandler,
  });
};

import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  GetScheduleHandler,
  AddScheduleHandler,
  UpdateScheduleHandler,
  DeleteScheduleHandler,
} from './schedule.handlers';
import {
  GetScheduleSchema,
  AddScheduleSchema,
  UpdateScheduleSchema,
  DeleteScheduleSchema,
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
  route.delete('/', {
    schema: DeleteScheduleSchema,
    handler: DeleteScheduleHandler,
  });
};

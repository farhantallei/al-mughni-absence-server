import fastifyCors from '@fastify/cors';
import fastifySensible from '@fastify/sensible';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { routes } from './routes';

const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

export function addPlugins() {
  app.register(fastifySensible);
  app.register(fastifyCors, { origin: '*' });
}

export function addRoutes() {
  app.register(routes, { prefix: 'api' });
}

export default app;

import { FastifyInstance } from 'fastify';
import { registerAuthRoutes } from './auth.routes';

export default async function (fastify: FastifyInstance) {
  fastify.register(registerAuthRoutes, { prefix: '/api/v1/auth' });
}

import { FastifyInstance } from 'fastify';
import { registerAuthRoutes } from './auth.routes';

export default async function (fastify: FastifyInstance) {
  fastify.register(registerAuthRoutes, { prefix: '/api/v1/auth' });
}


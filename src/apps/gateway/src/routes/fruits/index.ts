import { FastifyInstance } from 'fastify';
import { registerFruitRoutes } from './fruit.routes';
import { registerCartRoutes } from './cart.routes';
import { registerOrderRoutes } from './order.routes';

export default async function (fastify: FastifyInstance) {
  fastify.register(registerFruitRoutes, { prefix: '/api/v1/fruits' });
  fastify.register(registerCartRoutes, { prefix: '/api/v1/cart' });
  fastify.register(registerOrderRoutes, { prefix: '/api/v1/orders' });
}

import { FastifyInstance } from 'fastify';
import { registerFruitRoutes } from './fruit.routes';
import { registerCartRoutes } from './cart.routes';
import { registerOrderRoutes } from './order.routes';

export default async function (fastify: FastifyInstance) {
  fastify.register(registerFruitRoutes, { prefix: '/api/v1/fruits' });
  fastify.register(registerCartRoutes, { prefix: '/api/v1/cart' });
  fastify.register(registerOrderRoutes, { prefix: '/api/v1/orders' });
}


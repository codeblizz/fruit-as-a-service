/**
 * Application builder - extracted for testing purposes
 */
import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { logger } from '@codeblizz/shared';

// Import route modules
import authRoutes from './routes/auth';
import fruitRoutes from './routes/fruits';

// Build the Fastify app
export async function build(): Promise<FastifyInstance> {
  const app = fastify({
    logger: logger
  });

  // Register plugins
  await app.register(cors, {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
  });

  await app.register(helmet);

  await app.register(swagger, {
    swagger: {
      info: {
        title: 'Fruit-as-a-Service API Gateway',
        description: 'API Gateway for Fruit-as-a-Service platform',
        version: '1.0.0'
      },
      host: 'localhost',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    }
  });

  // Register route modules
  app.register(authRoutes);
  app.register(fruitRoutes);

  // Register health check route
  app.get('/health', {
    schema: {
      description: 'Health check endpoint',
      tags: ['health'],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            status: { type: 'string' },
            uptime: { type: 'number' },
            timestamp: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
  });

  return app;
}

/**
 * Application builder - extracted for testing purposes
 */
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import swagger from '@fastify/swagger';
import { logger } from '@codeblizz/shared';
import swaggerUi from '@fastify/swagger-ui';
import fastify, { FastifyInstance } from 'fastify';

// Import route modules
import authRoutes from './routes/auth';
import fruitRoutes from './routes/fruits';

// Build the Fastify app
export async function build(): Promise<FastifyInstance> {
  const app = fastify({
    logger: logger
  });

  // Register plugins
  await app.register(cors, {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
  });

  await app.register(helmet);

  await app.register(swagger, {
    swagger: {
      info: {
        title: 'Fruit-as-a-Service API Gateway',
        description: 'API Gateway for Fruit-as-a-Service platform',
        version: '1.0.0'
      },
      host: 'localhost',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    }
  });

  // Register route modules
  app.register(authRoutes);
  app.register(fruitRoutes);

  // Register health check route
  app.get('/health', {
    schema: {
      description: 'Health check endpoint',
      tags: ['health'],
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            status: { type: 'string' },
            uptime: { type: 'number' },
            timestamp: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
  });

  return app;
}


import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '@/packages/database/src';
import { verifyAuth, verifyAdmin } from '../../middleware/auth';

export async function registerFruitRoutes(fastify: FastifyInstance) {
  // Get all fruits with optional filtering
  fastify.get(
    '/',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            category: { type: 'string' },
            organic: { type: 'boolean' },
            seasonal: { type: 'boolean' },
            search: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              fruits: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' },
                    stock: { type: 'number' },
                    imageUrl: { type: 'string', nullable: true },
                    category: { type: 'string', nullable: true },
                    seasonal: { type: 'boolean' },
                    organic: { type: 'boolean' }
                  }
                }
              }
            }
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { category, organic, seasonal, search } = request.query as any;

        // Build filters
        const whereClause: any = {};
        
        if (category) {
          whereClause.category = category;
        }
        
        if (organic !== undefined) {
          whereClause.organic = organic;
        }
        
        if (seasonal !== undefined) {
          whereClause.seasonal = seasonal;
        }
        
        if (search) {
          whereClause.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
          ];
        }

        const fruits = await prisma.fruit.findMany({
          where: whereClause,
          orderBy: { name: 'asc' }
        });

        return reply.send({ fruits });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error fetching fruits' });
      }
    }
  );

  // Get a specific fruit by ID
  fastify.get(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              price: { type: 'number' },
              stock: { type: 'number' },
              imageUrl: { type: 'string', nullable: true },
              category: { type: 'string', nullable: true },
              seasonal: { type: 'boolean' },
              organic: { type: 'boolean' }
            }
          },
          404: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };

        const fruit = await prisma.fruit.findUnique({
          where: { id }
        });

        if (!fruit) {
          return reply.code(404).send({ error: 'Fruit not found' });
        }

        return reply.send(fruit);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error fetching fruit' });
      }
    }
  );

  // Create a new fruit (Admin only)
  fastify.post(
    '/',
    {
      preHandler: [verifyAdmin],
      schema: {
        body: {
          type: 'object',
          required: ['name', 'description', 'price', 'stock'],
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            stock: { type: 'number' },
            imageUrl: { type: 'string' },
            category: { type: 'string' },
            seasonal: { type: 'boolean' },
            organic: { type: 'boolean' }
          }
        },
        response: {
          201: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              price: { type: 'number' },
              stock: { type: 'number' },
              imageUrl: { type: 'string', nullable: true },
              category: { type: 'string', nullable: true },
              seasonal: { type: 'boolean' },
              organic: { type: 'boolean' }
            }
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const fruitData = request.body as any;

        const fruit = await prisma.fruit.create({
          data: fruitData
        });

        return reply.code(201).send(fruit);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error creating fruit' });
      }
    }
  );
}

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '@/packages/database/src';
import { verifyAuth, verifyAdmin } from '../../middleware/auth';

export async function registerFruitRoutes(fastify: FastifyInstance) {
  // Get all fruits with optional filtering
  fastify.get(
    '/',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            category: { type: 'string' },
            organic: { type: 'boolean' },
            seasonal: { type: 'boolean' },
            search: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              fruits: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' },
                    stock: { type: 'number' },
                    imageUrl: { type: 'string', nullable: true },
                    category: { type: 'string', nullable: true },
                    seasonal: { type: 'boolean' },
                    organic: { type: 'boolean' }
                  }
                }
              }
            }
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { category, organic, seasonal, search } = request.query as any;

        // Build filters
        const whereClause: any = {};
        
        if (category) {
          whereClause.category = category;
        }
        
        if (organic !== undefined) {
          whereClause.organic = organic;
        }
        
        if (seasonal !== undefined) {
          whereClause.seasonal = seasonal;
        }
        
        if (search) {
          whereClause.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
          ];
        }

        const fruits = await prisma.fruit.findMany({
          where: whereClause,
          orderBy: { name: 'asc' }
        });

        return reply.send({ fruits });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error fetching fruits' });
      }
    }
  );

  // Get a specific fruit by ID
  fastify.get(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              price: { type: 'number' },
              stock: { type: 'number' },
              imageUrl: { type: 'string', nullable: true },
              category: { type: 'string', nullable: true },
              seasonal: { type: 'boolean' },
              organic: { type: 'boolean' }
            }
          },
          404: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params as { id: string };

        const fruit = await prisma.fruit.findUnique({
          where: { id }
        });

        if (!fruit) {
          return reply.code(404).send({ error: 'Fruit not found' });
        }

        return reply.send(fruit);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error fetching fruit' });
      }
    }
  );

  // Create a new fruit (Admin only)
  fastify.post(
    '/',
    {
      preHandler: [verifyAdmin],
      schema: {
        body: {
          type: 'object',
          required: ['name', 'description', 'price', 'stock'],
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            stock: { type: 'number' },
            imageUrl: { type: 'string' },
            category: { type: 'string' },
            seasonal: { type: 'boolean' },
            organic: { type: 'boolean' }
          }
        },
        response: {
          201: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              price: { type: 'number' },
              stock: { type: 'number' },
              imageUrl: { type: 'string', nullable: true },
              category: { type: 'string', nullable: true },
              seasonal: { type: 'boolean' },
              organic: { type: 'boolean' }
            }
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const fruitData = request.body as any;

        const fruit = await prisma.fruit.create({
          data: fruitData
        });

        return reply.code(201).send(fruit);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error creating fruit' });
      }
    }
  );
}


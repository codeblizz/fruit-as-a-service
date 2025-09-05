import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '@/packages/database/src';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyAuth } from '../../middleware/auth';

// Types for request bodies
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

// JWT helpers
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function generateToken(userId: string): string {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
}

export async function registerAuthRoutes(fastify: FastifyInstance) {
  // Register a new user
  fastify.post<{ Body: RegisterRequest }>(
    '/register',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
            address: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            postalCode: { type: 'string' },
            country: { type: 'string' },
            phone: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              token: { type: 'string' }
            }
          },
          400: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          }
        }
      }
    },
    async (request, reply) => {
      try {
        const { name, email, password, ...addressInfo } = request.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email }
        });

        if (existingUser) {
          return reply.code(400).send({ error: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            ...addressInfo
          }
        });

        // Generate JWT token
        const token = generateToken(user.id);

        return reply.send({
          id: user.id,
          name: user.name,
          email: user.email,
          token
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error during registration' });
      }
    }
  );

  // Login a user
  fastify.post<{ Body: LoginRequest }>(
    '/login',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              token: { type: 'string' }
            }
          },
          401: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          }
        }
      }
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body;

        // Find the user
        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) {
          return reply.code(401).send({ error: 'Invalid email or password' });
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return reply.code(401).send({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = generateToken(user.id);

        return reply.send({
          id: user.id,
          name: user.name,
          email: user.email,
          token
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error during login' });
      }
    }
  );

  // Get current user profile
  fastify.get(
    '/me',
    {
      preHandler: [verifyAuth],
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              role: { type: 'string' },
              address: { type: 'string', nullable: true },
              city: { type: 'string', nullable: true },
              state: { type: 'string', nullable: true },
              postalCode: { type: 'string', nullable: true },
              country: { type: 'string', nullable: true },
              phone: { type: 'string', nullable: true }
            }
          },
          401: {
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
        const userId = (request as any).user.id;

        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            address: true,
            city: true,
            state: true,
            postalCode: true,
            country: true,
            phone: true
          }
        });

        if (!user) {
          return reply.code(404).send({ error: 'User not found' });
        }

        return reply.send(user);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error fetching user profile' });
      }
    }
  );
}

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '@/packages/database/src';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyAuth } from '../../middleware/auth';

// Types for request bodies
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

// JWT helpers
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function generateToken(userId: string): string {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
}

export async function registerAuthRoutes(fastify: FastifyInstance) {
  // Register a new user
  fastify.post<{ Body: RegisterRequest }>(
    '/register',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
            address: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            postalCode: { type: 'string' },
            country: { type: 'string' },
            phone: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              token: { type: 'string' }
            }
          },
          400: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          }
        }
      }
    },
    async (request, reply) => {
      try {
        const { name, email, password, ...addressInfo } = request.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email }
        });

        if (existingUser) {
          return reply.code(400).send({ error: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            ...addressInfo
          }
        });

        // Generate JWT token
        const token = generateToken(user.id);

        return reply.send({
          id: user.id,
          name: user.name,
          email: user.email,
          token
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error during registration' });
      }
    }
  );

  // Login a user
  fastify.post<{ Body: LoginRequest }>(
    '/login',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              token: { type: 'string' }
            }
          },
          401: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          }
        }
      }
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body;

        // Find the user
        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) {
          return reply.code(401).send({ error: 'Invalid email or password' });
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return reply.code(401).send({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = generateToken(user.id);

        return reply.send({
          id: user.id,
          name: user.name,
          email: user.email,
          token
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error during login' });
      }
    }
  );

  // Get current user profile
  fastify.get(
    '/me',
    {
      preHandler: [verifyAuth],
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              role: { type: 'string' },
              address: { type: 'string', nullable: true },
              city: { type: 'string', nullable: true },
              state: { type: 'string', nullable: true },
              postalCode: { type: 'string', nullable: true },
              country: { type: 'string', nullable: true },
              phone: { type: 'string', nullable: true }
            }
          },
          401: {
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
        const userId = (request as any).user.id;

        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            address: true,
            city: true,
            state: true,
            postalCode: true,
            country: true,
            phone: true
          }
        });

        if (!user) {
          return reply.code(404).send({ error: 'User not found' });
        }

        return reply.send(user);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error fetching user profile' });
      }
    }
  );
}


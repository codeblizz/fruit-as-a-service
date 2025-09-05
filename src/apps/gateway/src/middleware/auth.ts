import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { prisma } from '@/packages/database/src';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JwtPayload {
  id: string;
}

export async function verifyAuth(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Get token from authorization header
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized: No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true }
    });
    
    if (!user) {
      return reply.code(401).send({ error: 'Unauthorized: Invalid token' });
    }
    
    // Add user to request object
    (request as any).user = user;
  } catch (error) {
    request.log.error(error);
    return reply.code(401).send({ error: 'Unauthorized: Invalid token' });
  }
}

export async function verifyAdmin(request: FastifyRequest, reply: FastifyReply) {
  try {
    // First verify authentication
    await verifyAuth(request, reply);
    
    // Check if user is an admin
    const user = (request as any).user;
    
    if (user.role !== 'ADMIN') {
      return reply.code(403).send({ error: 'Forbidden: Admin access required' });
    }
  } catch (error) {
    request.log.error(error);
    return reply.code(403).send({ error: 'Forbidden: Admin access required' });
  }
}

import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { prisma } from '@/packages/database/src';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JwtPayload {
  id: string;
}

export async function verifyAuth(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Get token from authorization header
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Unauthorized: No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true }
    });
    
    if (!user) {
      return reply.code(401).send({ error: 'Unauthorized: Invalid token' });
    }
    
    // Add user to request object
    (request as any).user = user;
  } catch (error) {
    request.log.error(error);
    return reply.code(401).send({ error: 'Unauthorized: Invalid token' });
  }
}

export async function verifyAdmin(request: FastifyRequest, reply: FastifyReply) {
  try {
    // First verify authentication
    await verifyAuth(request, reply);
    
    // Check if user is an admin
    const user = (request as any).user;
    
    if (user.role !== 'ADMIN') {
      return reply.code(403).send({ error: 'Forbidden: Admin access required' });
    }
  } catch (error) {
    request.log.error(error);
    return reply.code(403).send({ error: 'Forbidden: Admin access required' });
  }
}


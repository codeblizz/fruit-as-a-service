import { FastifyInstance } from 'fastify';
import { createPaymentGateway } from '../index';

export function registerPaymentRoutes(server: FastifyInstance) {
  // Payment initialization endpoint
  server.post('/api/payments/initialize', {
    schema: {
      description: 'Initialize payment with selected gateway',
      tags: ['payments'],
      body: {
        type: 'object',
        required: ['gatewayType', 'amount', 'currency'],
        properties: {
          gatewayType: { type: 'string', enum: ['stripe', 'paypal', 'paystack'] },
          amount: { type: 'number' },
          currency: { type: 'string' },
          description: { type: 'string' }
        }
      },
      response: {
        200: {
          description: 'Payment session created',
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            sessionId: { type: 'string' },
            redirectUrl: { type: 'string' }
          }
        },
        400: {
          description: 'Invalid request',
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { gatewayType, amount, currency, description } = request.body as any;
      
      const gateway = await createPaymentGateway(gatewayType);
      const result = await gateway.createPaymentSession({
        amount,
        currency,
        description: description || 'Fruit-as-a-Service payment'
      });
      
      return {
        success: true,
        sessionId: result.id,
        redirectUrl: result.url
      };
    } catch (error: any) {
      request.log.error(error);
      reply.code(400);
      return {
        success: false,
        error: error.message
      };
    }
  });
  
  // Payment status check endpoint
  server.get('/api/payments/:gatewayType/:sessionId', {
    schema: {
      description: 'Check payment status',
      tags: ['payments'],
      params: {
        type: 'object',
        required: ['gatewayType', 'sessionId'],
        properties: {
          gatewayType: { type: 'string' },
          sessionId: { type: 'string' }
        }
      },
      response: {
        200: {
          description: 'Payment status',
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            status: { type: 'string' },
            details: { type: 'object', additionalProperties: true }
          }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const { gatewayType, sessionId } = request.params as any;
      
      const gateway = await createPaymentGateway(gatewayType);
      const status = await gateway.getPaymentStatus(sessionId);
      
      return {
        success: true,
        status: status.status,
        details: status.details
      };
    } catch (error: any) {
      request.log.error(error);
      reply.code(400);
      return {
        success: false,
        error: error.message
      };
    }
  });
}


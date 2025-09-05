import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '@/packages/database/src';
import { verifyAuth } from '../../middleware/auth';
import { PayPalServerSDK } from '@/apps/gateway/src/paypal';

// Types
interface CreateOrderRequest {
  paymentMethod: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
}

export async function registerOrderRoutes(fastify: FastifyInstance) {
  // Get all user orders
  fastify.get(
    '/',
    {
      preHandler: [verifyAuth],
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              orders: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    status: { type: 'string' },
                    total: { type: 'number' },
                    createdAt: { type: 'string', format: 'date-time' },
                    items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          name: { type: 'string' },
                          quantity: { type: 'number' },
                          price: { type: 'number' }
                        }
                      }
                    }
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
        const userId = (request as any).user.id;

        const orders = await prisma.order.findMany({
          where: { userId },
          include: {
            items: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        });

        return reply.send({ orders });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error fetching orders' });
      }
    }
  );

  // Get a specific order
  fastify.get(
    '/:id',
    {
      preHandler: [verifyAuth],
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
              order: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  status: { type: 'string' },
                  total: { type: 'number' },
                  paymentMethod: { type: 'string' },
                  shippingAddress: { type: 'string' },
                  shippingCity: { type: 'string' },
                  shippingState: { type: 'string' },
                  shippingZip: { type: 'string' },
                  shippingCountry: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        quantity: { type: 'number' },
                        price: { type: 'number' }
                      }
                    }
                  }
                }
              }
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
        const userId = (request as any).user.id;
        const { id } = request.params as { id: string };

        const order = await prisma.order.findFirst({
          where: {
            id,
            userId
          },
          include: {
            items: true
          }
        });

        if (!order) {
          return reply.code(404).send({ error: 'Order not found' });
        }

        return reply.send({ order });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error fetching order' });
      }
    }
  );

  // Create a new order from cart
  fastify.post<{ Body: CreateOrderRequest }>(
    '/',
    {
      preHandler: [verifyAuth],
      schema: {
        body: {
          type: 'object',
          required: ['paymentMethod', 'shippingAddress', 'shippingCity', 'shippingState', 'shippingZip', 'shippingCountry'],
          properties: {
            paymentMethod: { type: 'string' },
            shippingAddress: { type: 'string' },
            shippingCity: { type: 'string' },
            shippingState: { type: 'string' },
            shippingZip: { type: 'string' },
            shippingCountry: { type: 'string' }
          }
        },
        response: {
          201: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              order: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  total: { type: 'number' },
                  status: { type: 'string' },
                  items: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        quantity: { type: 'number' },
                        price: { type: 'number' }
                      }
                    }
                  }
                }
              }
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
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userId = (request as any).user.id;
        const userEmail = (request as any).user.email;
        const shipping = request.body as CreateOrderRequest;

        // Get user's cart with items
        const cart = await prisma.cart.findFirst({
          where: { userId },
          include: {
            items: {
              include: {
                fruit: true
              }
            }
          }
        });

        if (!cart || cart.items.length === 0) {
          return reply.code(400).send({ error: 'Cart is empty' });
        }

        // Calculate total
        let total = 0;
        for (const item of cart.items) {
          total += item.quantity * item.fruit.price;
        }

        // Set up payment method
        let paymentId = null;

        if (shipping.paymentMethod === 'paypal') {
          try {
            // Initialize PayPal payment
            const paypalSDK = new PayPalServerSDK();
            
            // Create PayPal order
            const paypalOrder = await paypalSDK.createOrder({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  amount: {
                    currency_code: 'USD',
                    value: (total / 100).toFixed(2) // Convert cents to dollars
                  },
                  description: 'Fruit-as-a-Service order'
                }
              ],
              application_context: {
                brand_name: 'Fruit-as-a-Service',
                shipping_preference: 'NO_SHIPPING',
                user_action: 'PAY_NOW',
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fruits/success`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fruits/checkout`
              }
            });
            
            paymentId = paypalOrder.id;
          } catch (paymentError: any) {
            request.log.error('Payment processing error:', paymentError);
            return reply.code(400).send({ 
              error: 'Payment processing failed', 
              details: paymentError.message 
            });
          }
        }

        // Start a transaction
        const order = await prisma.$transaction(async (tx) => {
          // Create order
          const newOrder = await tx.order.create({
            data: {
              userId,
              userEmail,
              total,
              paymentMethod: shipping.paymentMethod,
              paymentId,
              paymentStatus: 'pending',
              shippingAddress: shipping.shippingAddress,
              shippingCity: shipping.shippingCity,
              shippingState: shipping.shippingState,
              shippingZip: shipping.shippingZip,
              shippingCountry: shipping.shippingCountry,
              status: 'pending',
              items: {
                create: cart.items.map(item => ({
                  fruitId: item.fruit.id,
                  name: item.fruit.name,
                  quantity: item.quantity,
                  price: item.fruit.price
                }))
              }
            },
            include: {
              items: true
            }
          });

          // Update stock
          for (const item of cart.items) {
            await tx.fruit.update({
              where: { id: item.fruit.id },
              data: {
                stock: {
                  decrement: item.quantity
                }
              }
            });
          }

          // Clear cart
          await tx.cartItem.deleteMany({
            where: { cartId: cart.id }
          });

          return newOrder;
        });

        return reply.code(201).send({
          message: 'Order created successfully',
          order: {
            id: order.id,
            total: order.total,
            status: order.status,
            items: order.items.map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price
            }))
          }
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error creating order' });
      }
    }
  );
}

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '@/packages/database/src';
import { verifyAuth } from '../../middleware/auth';

// Types
interface CreateOrderRequest {
  paymentMethod: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
}

export async function registerOrderRoutes(fastify: FastifyInstance) {
  // Create a new order from cart
  fastify.post<{ Body: CreateOrderRequest }>(
    '/',
    {
      preHandler: [verifyAuth],
      schema: {
        body: {
          type: 'object',
          required: ['paymentMethod', 'shippingAddress', 'shippingCity', 'shippingState', 'shippingZip', 'shippingCountry'],
          properties: {
            paymentMethod: { type: 'string' },
            shippingAddress: { type: 'string' },
            shippingCity: { type: 'string' },
            shippingState: { type: 'string' },
            shippingZip: { type: 'string' },
            shippingCountry: { type: 'string' }
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userId = (request as any).user.id;
        const userEmail = (request as any).user.email;
        const shipping = request.body as CreateOrderRequest;

        // Get user's cart with items
        const cart = await prisma.cart.findFirst({
          where: { userId },
          include: {
            items: {
              include: {
                fruit: true
              }
            }
          }
        });

        if (!cart || cart.items.length === 0) {
          return reply.code(400).send({ error: 'Cart is empty' });
        }

        // Calculate total
        let total = 0;
        for (const item of cart.items) {
          total += item.quantity * item.fruit.price;
        }

        // Start a transaction
        const order = await prisma.$transaction(async (tx) => {
          // Create order
          const newOrder = await tx.order.create({
            data: {
              userId,
              userEmail,
              total,
              paymentMethod: shipping.paymentMethod,
              shippingAddress: shipping.shippingAddress,
              shippingCity: shipping.shippingCity,
              shippingState: shipping.shippingState,
              shippingZip: shipping.shippingZip,
              shippingCountry: shipping.shippingCountry,
              status: 'pending',
              items: {
                create: cart.items.map(item => ({
                  fruitId: item.fruit.id,
                  name: item.fruit.name,
                  quantity: item.quantity,
                  price: item.fruit.price
                }))
              }
            },
            include: {
              items: true
            }
          });

          // Update stock
          for (const item of cart.items) {
            await tx.fruit.update({
              where: { id: item.fruit.id },
              data: {
                stock: {
                  decrement: item.quantity
                }
              }
            });
          }

          // Clear cart
          await tx.cartItem.deleteMany({
            where: { cartId: cart.id }
          });

          return newOrder;
        });

        return reply.code(201).send({
          message: 'Order created successfully',
          order: {
            id: order.id,
            total: order.total,
            status: order.status,
            items: order.items.map(item => ({
              name: item.name,
              quantity: item.quantity,
              price: item.price
            }))
          }
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error creating order' });
      }
    }
  );

  // Get user's orders
  fastify.get(
    '/',
    {
      preHandler: [verifyAuth]
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userId = (request as any).user.id;

        const orders = await prisma.order.findMany({
          where: { userId },
          include: {
            items: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        });

        return reply.send({ orders });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error fetching orders' });
      }
    }
  );

  // Get a specific order
  fastify.get(
    '/:id',
    {
      preHandler: [verifyAuth],
      schema: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userId = (request as any).user.id;
        const { id } = request.params as { id: string };

        const order = await prisma.order.findFirst({
          where: {
            id,
            userId
          },
          include: {
            items: true
          }
        });

        if (!order) {
          return reply.code(404).send({ error: 'Order not found' });
        }

        return reply.send({ order });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error fetching order' });
      }
    }
  );
}


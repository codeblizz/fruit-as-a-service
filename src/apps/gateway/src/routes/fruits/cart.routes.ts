import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '@/packages/database/src';
import { verifyAuth } from '../../middleware/auth';

// Types
interface AddToCartRequest {
  fruitId: string;
  quantity: number;
}

export async function registerCartRoutes(fastify: FastifyInstance) {
  // Get current user's cart
  fastify.get(
    '/',
    {
      preHandler: [verifyAuth],
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    quantity: { type: 'number' },
                    fruit: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        price: { type: 'number' },
                        imageUrl: { type: 'string', nullable: true }
                      }
                    }
                  }
                }
              },
              total: { type: 'number' }
            }
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userId = (request as any).user.id;

        // Find or create cart
        let cart = await prisma.cart.findFirst({
          where: { userId },
          include: {
            items: {
              include: {
                fruit: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    imageUrl: true
                  }
                }
              }
            }
          }
        });

        if (!cart) {
          cart = await prisma.cart.create({
            data: { userId },
            include: {
              items: {
                include: {
                  fruit: {
                    select: {
                      id: true,
                      name: true,
                      description: true,
                      price: true,
                      imageUrl: true
                    }
                  }
                }
              }
            }
          });
        }

        // Calculate total price
        let total = 0;
        for (const item of cart.items) {
          total += item.quantity * item.fruit.price;
        }

        return reply.send({
          id: cart.id,
          items: cart.items,
          total
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error fetching cart' });
      }
    }
  );

  // Add item to cart
  fastify.post<{ Body: AddToCartRequest }>(
    '/items',
    {
      preHandler: [verifyAuth],
      schema: {
        body: {
          type: 'object',
          required: ['fruitId', 'quantity'],
          properties: {
            fruitId: { type: 'string' },
            quantity: { type: 'number', minimum: 1 }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              cartItem: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  quantity: { type: 'number' },
                  fruit: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      price: { type: 'number' }
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
        const { fruitId, quantity } = request.body as AddToCartRequest;

        // Verify fruit exists and has enough stock
        const fruit = await prisma.fruit.findUnique({
          where: { id: fruitId }
        });

        if (!fruit) {
          return reply.code(404).send({ error: 'Fruit not found' });
        }

        if (fruit.stock < quantity) {
          return reply.code(400).send({
            error: `Not enough stock. Only ${fruit.stock} available.`
          });
        }

        // Find or create cart
        let cart = await prisma.cart.findFirst({
          where: { userId }
        });

        if (!cart) {
          cart = await prisma.cart.create({
            data: { userId }
          });
        }

        // Check if item already exists in cart
        const existingCartItem = await prisma.cartItem.findFirst({
          where: {
            cartId: cart.id,
            fruitId
          },
          include: {
            fruit: {
              select: {
                id: true,
                name: true,
                price: true
              }
            }
          }
        });

        let cartItem;

        if (existingCartItem) {
          // Update existing item
          cartItem = await prisma.cartItem.update({
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity + quantity },
            include: {
              fruit: {
                select: {
                  id: true,
                  name: true,
                  price: true
                }
              }
            }
          });
        } else {
          // Create new item
          cartItem = await prisma.cartItem.create({
            data: {
              cartId: cart.id,
              fruitId,
              quantity
            },
            include: {
              fruit: {
                select: {
                  id: true,
                  name: true,
                  price: true
                }
              }
            }
          });
        }

        return reply.send({
          message: 'Item added to cart',
          cartItem
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error adding item to cart' });
      }
    }
  );

  // Update cart item quantity
  fastify.put(
    '/items/:id',
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
        body: {
          type: 'object',
          required: ['quantity'],
          properties: {
            quantity: { type: 'number', minimum: 1 }
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userId = (request as any).user.id;
        const { id } = request.params as { id: string };
        const { quantity } = request.body as { quantity: number };

        // Check if item exists and belongs to user's cart
        const cartItem = await prisma.cartItem.findFirst({
          where: {
            id,
            cart: {
              userId
            }
          },
          include: {
            fruit: true
          }
        });

        if (!cartItem) {
          return reply.code(404).send({ error: 'Cart item not found' });
        }

        // Check stock
        if (cartItem.fruit.stock < quantity) {
          return reply.code(400).send({
            error: `Not enough stock. Only ${cartItem.fruit.stock} available.`
          });
        }

        // Update quantity
        const updatedCartItem = await prisma.cartItem.update({
          where: { id },
          data: { quantity },
          include: {
            fruit: {
              select: {
                id: true,
                name: true,
                price: true
              }
            }
          }
        });

        return reply.send({
          message: 'Cart item updated',
          cartItem: updatedCartItem
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error updating cart item' });
      }
    }
  );

  // Remove item from cart
  fastify.delete(
    '/items/:id',
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

        // Check if item exists and belongs to user's cart
        const cartItem = await prisma.cartItem.findFirst({
          where: {
            id,
            cart: {
              userId
            }
          }
        });

        if (!cartItem) {
          return reply.code(404).send({ error: 'Cart item not found' });
        }

        // Delete the item
        await prisma.cartItem.delete({
          where: { id }
        });

        return reply.send({
          message: 'Item removed from cart'
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error removing item from cart' });
      }
    }
  );

  // Clear cart
  fastify.delete(
    '/',
    {
      preHandler: [verifyAuth]
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userId = (request as any).user.id;

        // Find cart
        const cart = await prisma.cart.findFirst({
          where: { userId }
        });

        if (!cart) {
          return reply.code(404).send({ error: 'Cart not found' });
        }

        // Delete all items
        await prisma.cartItem.deleteMany({
          where: { cartId: cart.id }
        });

        return reply.send({
          message: 'Cart cleared'
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error clearing cart' });
      }
    }
  );
}

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '@/packages/database/src';
import { verifyAuth } from '../../middleware/auth';

// Types
interface AddToCartRequest {
  fruitId: string;
  quantity: number;
}

export async function registerCartRoutes(fastify: FastifyInstance) {
  // Get current user's cart
  fastify.get(
    '/',
    {
      preHandler: [verifyAuth],
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    quantity: { type: 'number' },
                    fruit: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        price: { type: 'number' },
                        imageUrl: { type: 'string', nullable: true }
                      }
                    }
                  }
                }
              },
              total: { type: 'number' }
            }
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userId = (request as any).user.id;

        // Find or create cart
        let cart = await prisma.cart.findFirst({
          where: { userId },
          include: {
            items: {
              include: {
                fruit: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    imageUrl: true
                  }
                }
              }
            }
          }
        });

        if (!cart) {
          cart = await prisma.cart.create({
            data: { userId },
            include: {
              items: {
                include: {
                  fruit: {
                    select: {
                      id: true,
                      name: true,
                      description: true,
                      price: true,
                      imageUrl: true
                    }
                  }
                }
              }
            }
          });
        }

        // Calculate total price
        let total = 0;
        for (const item of cart.items) {
          total += item.quantity * item.fruit.price;
        }

        return reply.send({
          id: cart.id,
          items: cart.items,
          total
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error fetching cart' });
      }
    }
  );

  // Add item to cart
  fastify.post<{ Body: AddToCartRequest }>(
    '/items',
    {
      preHandler: [verifyAuth],
      schema: {
        body: {
          type: 'object',
          required: ['fruitId', 'quantity'],
          properties: {
            fruitId: { type: 'string' },
            quantity: { type: 'number', minimum: 1 }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              cartItem: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  quantity: { type: 'number' },
                  fruit: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                      price: { type: 'number' }
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
        const { fruitId, quantity } = request.body as AddToCartRequest;

        // Verify fruit exists and has enough stock
        const fruit = await prisma.fruit.findUnique({
          where: { id: fruitId }
        });

        if (!fruit) {
          return reply.code(404).send({ error: 'Fruit not found' });
        }

        if (fruit.stock < quantity) {
          return reply.code(400).send({
            error: `Not enough stock. Only ${fruit.stock} available.`
          });
        }

        // Find or create cart
        let cart = await prisma.cart.findFirst({
          where: { userId }
        });

        if (!cart) {
          cart = await prisma.cart.create({
            data: { userId }
          });
        }

        // Check if item already exists in cart
        const existingCartItem = await prisma.cartItem.findFirst({
          where: {
            cartId: cart.id,
            fruitId
          },
          include: {
            fruit: {
              select: {
                id: true,
                name: true,
                price: true
              }
            }
          }
        });

        let cartItem;

        if (existingCartItem) {
          // Update existing item
          cartItem = await prisma.cartItem.update({
            where: { id: existingCartItem.id },
            data: { quantity: existingCartItem.quantity + quantity },
            include: {
              fruit: {
                select: {
                  id: true,
                  name: true,
                  price: true
                }
              }
            }
          });
        } else {
          // Create new item
          cartItem = await prisma.cartItem.create({
            data: {
              cartId: cart.id,
              fruitId,
              quantity
            },
            include: {
              fruit: {
                select: {
                  id: true,
                  name: true,
                  price: true
                }
              }
            }
          });
        }

        return reply.send({
          message: 'Item added to cart',
          cartItem
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error adding item to cart' });
      }
    }
  );

  // Update cart item quantity
  fastify.put(
    '/items/:id',
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
        body: {
          type: 'object',
          required: ['quantity'],
          properties: {
            quantity: { type: 'number', minimum: 1 }
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userId = (request as any).user.id;
        const { id } = request.params as { id: string };
        const { quantity } = request.body as { quantity: number };

        // Check if item exists and belongs to user's cart
        const cartItem = await prisma.cartItem.findFirst({
          where: {
            id,
            cart: {
              userId
            }
          },
          include: {
            fruit: true
          }
        });

        if (!cartItem) {
          return reply.code(404).send({ error: 'Cart item not found' });
        }

        // Check stock
        if (cartItem.fruit.stock < quantity) {
          return reply.code(400).send({
            error: `Not enough stock. Only ${cartItem.fruit.stock} available.`
          });
        }

        // Update quantity
        const updatedCartItem = await prisma.cartItem.update({
          where: { id },
          data: { quantity },
          include: {
            fruit: {
              select: {
                id: true,
                name: true,
                price: true
              }
            }
          }
        });

        return reply.send({
          message: 'Cart item updated',
          cartItem: updatedCartItem
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error updating cart item' });
      }
    }
  );

  // Remove item from cart
  fastify.delete(
    '/items/:id',
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

        // Check if item exists and belongs to user's cart
        const cartItem = await prisma.cartItem.findFirst({
          where: {
            id,
            cart: {
              userId
            }
          }
        });

        if (!cartItem) {
          return reply.code(404).send({ error: 'Cart item not found' });
        }

        // Delete the item
        await prisma.cartItem.delete({
          where: { id }
        });

        return reply.send({
          message: 'Item removed from cart'
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error removing item from cart' });
      }
    }
  );

  // Clear cart
  fastify.delete(
    '/',
    {
      preHandler: [verifyAuth]
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const userId = (request as any).user.id;

        // Find cart
        const cart = await prisma.cart.findFirst({
          where: { userId }
        });

        if (!cart) {
          return reply.code(404).send({ error: 'Cart not found' });
        }

        // Delete all items
        await prisma.cartItem.deleteMany({
          where: { cartId: cart.id }
        });

        return reply.send({
          message: 'Cart cleared'
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: 'Server error clearing cart' });
      }
    }
  );
}


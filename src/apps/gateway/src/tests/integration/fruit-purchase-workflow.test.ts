/**
 * Integration Test: Fruit Purchase Workflow
 * 
 * This test demonstrates the complete workflow for 5 users purchasing different fruits:
 * - User 1: Purchases Apple
 * - User 2: Purchases Orange
 * - User 3: Purchases Pineapple
 * - User 4: Purchases Mango
 * - User 5: Purchases Fig
 * 
 * The workflow includes:
 * 1. User Registration and Authentication
 * 2. Browsing and Adding Fruits to Cart
 * 3. Checkout Process
 * 4. Order Confirmation
 */

import { test, expect, describe, beforeAll, afterAll } from '@jest/globals';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

// Import app builder to get an instance of the Fastify server
import { build } from '../../app';

// User data for our 5 test users
const testUsers = [
  {
    name: 'Alice Smith',
    email: 'alice@example.com',
    password: 'securePassword1',
    address: '123 Apple St',
    city: 'Fruitville',
    state: 'CA',
    postalCode: '90001',
    country: 'USA',
    phone: '555-111-1111',
    fruitToBuy: 'Apple'
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'securePassword2',
    address: '456 Orange Ave',
    city: 'Fruitville',
    state: 'CA',
    postalCode: '90002',
    country: 'USA',
    phone: '555-222-2222',
    fruitToBuy: 'Orange'
  },
  {
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    password: 'securePassword3',
    address: '789 Pineapple Blvd',
    city: 'Fruitville',
    state: 'CA',
    postalCode: '90003',
    country: 'USA',
    phone: '555-333-3333',
    fruitToBuy: 'Pineapple'
  },
  {
    name: 'Diana Prince',
    email: 'diana@example.com',
    password: 'securePassword4',
    address: '101 Mango Lane',
    city: 'Fruitville',
    state: 'CA',
    postalCode: '90004',
    country: 'USA',
    phone: '555-444-4444',
    fruitToBuy: 'Mango'
  },
  {
    name: 'Ethan Hunt',
    email: 'ethan@example.com',
    password: 'securePassword5',
    address: '202 Fig Court',
    city: 'Fruitville',
    state: 'CA',
    postalCode: '90005',
    country: 'USA',
    phone: '555-555-5555',
    fruitToBuy: 'Fig'
  }
];

// Setup variables to store data between tests
const userTokens: string[] = [];
const fruitIds: Record<string, string> = {};
const cartIds: string[] = [];
const orderIds: string[] = [];

// Initialize the Fastify app and Prisma client
let app: FastifyInstance;
const prisma = new PrismaClient();

beforeAll(async () => {
  // Build the Fastify app
  app = await build();

  // Make sure our test fruit data exists in the database
  const fruits = await prisma.fruit.findMany();
  
  if (fruits.length === 0) {
    console.warn('No fruits found in database. Seed data should be loaded before running tests.');
  } else {
    // Store fruit IDs for later use
    fruits.forEach(fruit => {
      fruitIds[fruit.name] = fruit.id;
    });
  }
});

afterAll(async () => {
  await app.close();
  await prisma.$disconnect();
});

describe('User Registration and Authentication', () => {
  test.each(testUsers)('Register and authenticate user: $name', async (user, index) => {
    // 1. Register a new user
    const registerResponse = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        city: user.city,
        state: user.state,
        postalCode: user.postalCode,
        country: user.country,
        phone: user.phone
      }
    });

    expect(registerResponse.statusCode).toBe(200);
    const registerData = JSON.parse(registerResponse.payload);
    expect(registerData).toHaveProperty('token');
    
    // Store token for later use
    userTokens[index] = registerData.token;

    // 2. Login with the new user
    const loginResponse = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/login',
      payload: {
        email: user.email,
        password: user.password
      }
    });

    expect(loginResponse.statusCode).toBe(200);
    const loginData = JSON.parse(loginResponse.payload);
    expect(loginData).toHaveProperty('token');
    
    // Update token (should be the same)
    userTokens[index] = loginData.token;

    // 3. Verify user profile
    const profileResponse = await app.inject({
      method: 'GET',
      url: '/api/v1/auth/me',
      headers: {
        Authorization: `Bearer ${userTokens[index]}`
      }
    });

    expect(profileResponse.statusCode).toBe(200);
    const profileData = JSON.parse(profileResponse.payload);
    expect(profileData.email).toBe(user.email);
    expect(profileData.name).toBe(user.name);
  });
});

describe('Browsing Fruits and Cart Management', () => {
  test('List all available fruits', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/fruits'
    });

    expect(response.statusCode).toBe(200);
    const data = JSON.parse(response.payload);
    expect(data).toHaveProperty('fruits');
    expect(Array.isArray(data.fruits)).toBe(true);
    expect(data.fruits.length).toBeGreaterThan(0);
    
    // Verify our 5 fruits are in the list
    const fruitNames = data.fruits.map((f: any) => f.name);
    expect(fruitNames).toContain('Apple');
    expect(fruitNames).toContain('Orange');
    expect(fruitNames).toContain('Pineapple');
    expect(fruitNames).toContain('Mango');
    expect(fruitNames).toContain('Fig');
    
    // Store fruit IDs for later use
    data.fruits.forEach((fruit: any) => {
      fruitIds[fruit.name] = fruit.id;
    });
  });

  test.each(testUsers)('User $name adds $fruitToBuy to cart', async (user, index) => {
    // Get fruit ID
    const fruitId = fruitIds[user.fruitToBuy];
    expect(fruitId).toBeDefined();

    // Add fruit to cart
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/cart/items',
      headers: {
        Authorization: `Bearer ${userTokens[index]}`
      },
      payload: {
        fruitId,
        quantity: 1
      }
    });

    expect(response.statusCode).toBe(200);
    const data = JSON.parse(response.payload);
    expect(data).toHaveProperty('message', 'Item added to cart');
    expect(data).toHaveProperty('cartItem');
    expect(data.cartItem.fruit.name).toBe(user.fruitToBuy);
    
    // Verify cart contents
    const cartResponse = await app.inject({
      method: 'GET',
      url: '/api/v1/cart',
      headers: {
        Authorization: `Bearer ${userTokens[index]}`
      }
    });

    expect(cartResponse.statusCode).toBe(200);
    const cartData = JSON.parse(cartResponse.payload);
    expect(cartData).toHaveProperty('id');
    expect(cartData).toHaveProperty('items');
    expect(cartData.items.length).toBe(1);
    expect(cartData.items[0].fruit.name).toBe(user.fruitToBuy);
    
    // Store cart ID for later use
    cartIds[index] = cartData.id;
  });
});

describe('Checkout Process', () => {
  test.each(testUsers)('User $name completes checkout', async (user, index) => {
    // Create order from cart
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/orders',
      headers: {
        Authorization: `Bearer ${userTokens[index]}`
      },
      payload: {
        paymentMethod: 'paypal',
        shippingAddress: user.address,
        shippingCity: user.city,
        shippingState: user.state,
        shippingZip: user.postalCode,
        shippingCountry: user.country
      }
    });

    expect(response.statusCode).toBe(201);
    const data = JSON.parse(response.payload);
    expect(data).toHaveProperty('message', 'Order created successfully');
    expect(data).toHaveProperty('order');
    expect(data.order).toHaveProperty('id');
    expect(data.order.items.length).toBe(1);
    
    // Store order ID for later use
    orderIds[index] = data.order.id;
    
    // Verify cart is now empty (items should be moved to order)
    const cartResponse = await app.inject({
      method: 'GET',
      url: '/api/v1/cart',
      headers: {
        Authorization: `Bearer ${userTokens[index]}`
      }
    });

    expect(cartResponse.statusCode).toBe(200);
    const cartData = JSON.parse(cartResponse.payload);
    expect(cartData.items.length).toBe(0);
  });
});

describe('Order Confirmation', () => {
  test.each(testUsers)('User $name checks order details', async (user, index) => {
    // Get order details
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/orders/${orderIds[index]}`,
      headers: {
        Authorization: `Bearer ${userTokens[index]}`
      }
    });

    expect(response.statusCode).toBe(200);
    const data = JSON.parse(response.payload);
    expect(data).toHaveProperty('order');
    expect(data.order.id).toBe(orderIds[index]);
    expect(data.order.items.length).toBe(1);
    expect(data.order.items[0].name).toBe(user.fruitToBuy);
    
    // Check all orders for the user
    const allOrdersResponse = await app.inject({
      method: 'GET',
      url: '/api/v1/orders',
      headers: {
        Authorization: `Bearer ${userTokens[index]}`
      }
    });

    expect(allOrdersResponse.statusCode).toBe(200);
    const allOrdersData = JSON.parse(allOrdersResponse.payload);
    expect(allOrdersData).toHaveProperty('orders');
    expect(Array.isArray(allOrdersData.orders)).toBe(true);
    expect(allOrdersData.orders.length).toBeGreaterThan(0);
    
    // Verify the order we just created is in the list
    const foundOrder = allOrdersData.orders.find((o: any) => o.id === orderIds[index]);
    expect(foundOrder).toBeDefined();
  });
});

/**
 * Integration Test: Fruit Purchase Workflow
 * 
 * This test script demonstrates the complete workflow for 5 users purchasing different fruits:
 * - User 1: Purchases Apple
 * - User 2: Purchases Orange
 * - User 3: Purchases Pineapple
 * - User 4: Purchases Mango
 * - User 5: Purchases Fig
 * 
 * The workflow includes:
 * 1. User Registration and Authentication
 * 2. Browsing and Adding Fruits to Cart
 * 3. Checkout Process
 * 4. Order Confirmation
 */

import { test, expect, describe, beforeAll, afterAll } from '@jest/globals';
import { build } from '../../app';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

// User data for our 5 test users
const testUsers = [
  {
    name: 'Alice Smith',
    email: 'alice@example.com',
    password: 'securePassword1',
    address: '123 Apple St',
    city: 'Fruitville',
    state: 'CA',
    postalCode: '90001',
    country: 'USA',
    phone: '555-111-1111',
    fruitToBuy: 'Apple'
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'securePassword2',
    address: '456 Orange Ave',
    city: 'Fruitville',
    state: 'CA',
    postalCode: '90002',
    country: 'USA',
    phone: '555-222-2222',
    fruitToBuy: 'Orange'
  },
  {
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    password: 'securePassword3',
    address: '789 Pineapple Blvd',
    city: 'Fruitville',
    state: 'CA',
    postalCode: '90003',
    country: 'USA',
    phone: '555-333-3333',
    fruitToBuy: 'Pineapple'
  },
  {
    name: 'Diana Prince',
    email: 'diana@example.com',
    password: 'securePassword4',
    address: '101 Mango Lane',
    city: 'Fruitville',
    state: 'CA',
    postalCode: '90004',
    country: 'USA',
    phone: '555-444-4444',
    fruitToBuy: 'Mango'
  },
  {
    name: 'Ethan Hunt',
    email: 'ethan@example.com',
    password: 'securePassword5',
    address: '202 Fig Court',
    city: 'Fruitville',
    state: 'CA',
    postalCode: '90005',
    country: 'USA',
    phone: '555-555-5555',
    fruitToBuy: 'Fig'
  }
];

// Setup variables to store data between tests
const userTokens: string[] = [];
const fruitIds: Record<string, string> = {};
const cartIds: string[] = [];
const orderIds: string[] = [];

// Initialize the Fastify app and Prisma client
let app: FastifyInstance;
const prisma = new PrismaClient();

beforeAll(async () => {
  // Build the Fastify app
  app = await build();

  // Make sure our test fruit data exists in the database
  const fruits = await prisma.fruit.findMany();
  
  if (fruits.length === 0) {
    console.warn('No fruits found in database. Seed data should be loaded before running tests.');
  } else {
    // Store fruit IDs for later use
    fruits.forEach(fruit => {
      fruitIds[fruit.name] = fruit.id;
    });
  }
});

afterAll(async () => {
  await app.close();
  await prisma.$disconnect();
});

describe('User Registration and Authentication', () => {
  test.each(testUsers)('Register and authenticate user: $name', async (user) => {
    // 1. Register a new user
    const registerResponse = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/register',
      payload: {
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        city: user.city,
        state: user.state,
        postalCode: user.postalCode,
        country: user.country,
        phone: user.phone
      }
    });

    expect(registerResponse.statusCode).toBe(200);
    const registerData = JSON.parse(registerResponse.payload);
    expect(registerData).toHaveProperty('token');
    
    // Store token for later use
    const userIndex = testUsers.findIndex(u => u.email === user.email);
    userTokens[userIndex] = registerData.token;

    // 2. Login with the new user
    const loginResponse = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/login',
      payload: {
        email: user.email,
        password: user.password
      }
    });

    expect(loginResponse.statusCode).toBe(200);
    const loginData = JSON.parse(loginResponse.payload);
    expect(loginData).toHaveProperty('token');
    
    // Update token (should be the same)
    userTokens[userIndex] = loginData.token;

    // 3. Verify user profile
    const profileResponse = await app.inject({
      method: 'GET',
      url: '/api/v1/auth/me',
      headers: {
        Authorization: `Bearer ${userTokens[userIndex]}`
      }
    });

    expect(profileResponse.statusCode).toBe(200);
    const profileData = JSON.parse(profileResponse.payload);
    expect(profileData.email).toBe(user.email);
    expect(profileData.name).toBe(user.name);
  });
});

describe('Browsing Fruits and Cart Management', () => {
  test('List all available fruits', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/fruits'
    });

    expect(response.statusCode).toBe(200);
    const data = JSON.parse(response.payload);
    expect(data).toHaveProperty('fruits');
    expect(Array.isArray(data.fruits)).toBe(true);
    expect(data.fruits.length).toBeGreaterThan(0);
    
    // Verify our 5 fruits are in the list
    const fruitNames = data.fruits.map((f: any) => f.name);
    expect(fruitNames).toContain('Apple');
    expect(fruitNames).toContain('Orange');
    expect(fruitNames).toContain('Pineapple');
    expect(fruitNames).toContain('Mango');
    expect(fruitNames).toContain('Fig');
    
    // Store fruit IDs for later use
    data.fruits.forEach((fruit: any) => {
      fruitIds[fruit.name] = fruit.id;
    });
  });

  test.each(testUsers)('User $name adds $fruitToBuy to cart', async (user, index) => {
    // Get fruit ID
    const fruitId = fruitIds[user.fruitToBuy];
    expect(fruitId).toBeDefined();

    // Add fruit to cart
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/cart/items',
      headers: {
        Authorization: `Bearer ${userTokens[index]}`
      },
      payload: {
        fruitId,
        quantity: 1
      }
    });

    expect(response.statusCode).toBe(200);
    const data = JSON.parse(response.payload);
    expect(data).toHaveProperty('message', 'Item added to cart');
    expect(data).toHaveProperty('cartItem');
    expect(data.cartItem.fruit.name).toBe(user.fruitToBuy);
    
    // Verify cart contents
    const cartResponse = await app.inject({
      method: 'GET',
      url: '/api/v1/cart',
      headers: {
        Authorization: `Bearer ${userTokens[index]}`
      }
    });

    expect(cartResponse.statusCode).toBe(200);
    const cartData = JSON.parse(cartResponse.payload);
    expect(cartData).toHaveProperty('id');
    expect(cartData).toHaveProperty('items');
    expect(cartData.items.length).toBe(1);
    expect(cartData.items[0].fruit.name).toBe(user.fruitToBuy);
    
    // Store cart ID for later use
    cartIds[index] = cartData.id;
  });
});

describe('Checkout Process', () => {
  test.each(testUsers)('User $name completes checkout', async (user, index) => {
    // Create order from cart
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/orders',
      headers: {
        Authorization: `Bearer ${userTokens[index]}`
      },
      payload: {
        paymentMethod: 'paypal',
        shippingAddress: user.address,
        shippingCity: user.city,
        shippingState: user.state,
        shippingZip: user.postalCode,
        shippingCountry: user.country
      }
    });

    expect(response.statusCode).toBe(201);
    const data = JSON.parse(response.payload);
    expect(data).toHaveProperty('message', 'Order created successfully');
    expect(data).toHaveProperty('order');
    expect(data.order).toHaveProperty('id');
    expect(data.order.items.length).toBe(1);
    
    // Store order ID for later use
    orderIds[index] = data.order.id;
    
    // Verify cart is now empty (items should be moved to order)
    const cartResponse = await app.inject({
      method: 'GET',
      url: '/api/v1/cart',
      headers: {
        Authorization: `Bearer ${userTokens[index]}`
      }
    });

    expect(cartResponse.statusCode).toBe(200);
    const cartData = JSON.parse(cartResponse.payload);
    expect(cartData.items.length).toBe(0);
  });
});

describe('Order Confirmation', () => {
  test.each(testUsers)('User $name checks order details', async (user, index) => {
    // Get order details
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/orders/${orderIds[index]}`,
      headers: {
        Authorization: `Bearer ${userTokens[index]}`
      }
    });

    expect(response.statusCode).toBe(200);
    const data = JSON.parse(response.payload);
    expect(data).toHaveProperty('order');
    expect(data.order.id).toBe(orderIds[index]);
    expect(data.order.items.length).toBe(1);
    expect(data.order.items[0].name).toBe(user.fruitToBuy);
    
    // Check all orders for the user
    const allOrdersResponse = await app.inject({
      method: 'GET',
      url: '/api/v1/orders',
      headers: {
        Authorization: `Bearer ${userTokens[index]}`
      }
    });

    expect(allOrdersResponse.statusCode).toBe(200);
    const allOrdersData = JSON.parse(allOrdersResponse.payload);
    expect(allOrdersData).toHaveProperty('orders');
    expect(Array.isArray(allOrdersData.orders)).toBe(true);
    expect(allOrdersData.orders.length).toBeGreaterThan(0);
    
    // Verify the order we just created is in the list
    const foundOrder = allOrdersData.orders.find((o: any) => o.id === orderIds[index]);
    expect(foundOrder).toBeDefined();
  });
});

// Helper function to correctly build our app for testing
async function build(): Promise<FastifyInstance> {
  try {
    // Import the build function from app.ts instead of directly using the server instance
    const { build: buildApp } = await import('../../app');
    const app = await buildApp();
    return app;
  } catch (error) {
    console.error('Error building app for testing:', error);
    throw error;
  }
}


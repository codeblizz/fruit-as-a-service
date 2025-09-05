/**
 * Test setup file for Jest
 * Sets up environment variables and mocks for testing
 */

// Set environment variables for testing
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.PORT = '3002'; // Use a different port for tests
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/faas_test';

// Reset modules before each test
jest.resetModules();

/**
 * Test setup file for Jest
 * Sets up environment variables for testing
 */

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.PORT = '3002'; // Use a different port for tests


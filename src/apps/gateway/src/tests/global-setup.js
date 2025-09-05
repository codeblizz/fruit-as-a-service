/**
 * Global setup for Jest tests
 * Runs once before all tests
 */

module.exports = async () => {
  console.log('\nSetting up test environment...');

  // Set environment variables for testing
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-jwt-secret';
  process.env.TEST_DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/faas_test';
  
  // Additional database setup can be done here if needed
  // For example, we might want to run migrations or seed test data
  
  console.log('Test environment setup complete.');
};

/**
 * Global setup for Jest tests
 * Runs once before all tests
 */
module.exports = async () => {
  console.log('\nSetting up test environment...');

  // Set environment variables for testing
  process.env.NODE_ENV = 'test';
  process.env.TEST_DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/faas_test';
  
  // You could add additional setup here if needed
  // For example, starting a database container
  
  console.log('Test environment setup complete.');
};


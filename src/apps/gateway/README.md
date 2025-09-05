# Fruit-as-a-Service Gateway

The API Gateway for the Fruit-as-a-Service platform, built with Fastify.

## Features

- User registration and authentication
- Fruit inventory management
- Shopping cart functionality
- Order processing
- Payment integration

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL
- pnpm

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables in `.env`:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/faas?schema=public"
   JWT_SECRET="your-secret-key"
   PORT=3001
   ```

3. Run database migrations and seeding:
   ```bash
   cd ../../packages/database
   pnpm db:push
   pnpm db:seed
   ```

4. Start the server:
   ```bash
   pnpm dev
   ```

## API Usage Example

### Complete User Workflow

The following demonstrates a complete workflow for a user purchasing fruit:

1. **User Registration**
   ```bash
   curl -X POST http://localhost:3001/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Jane Smith",
       "email": "jane@example.com",
       "password": "securePassword123",
       "address": "123 Main St",
       "city": "Fruitville",
       "state": "CA",
       "postalCode": "90210",
       "country": "USA",
       "phone": "555-123-4567"
     }'
   ```

2. **User Login**
   ```bash
   curl -X POST http://localhost:3001/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "jane@example.com",
       "password": "securePassword123"
     }'
   ```
   Save the returned token for subsequent requests.

3. **Browse Fruits**
   ```bash
   curl http://localhost:3001/api/v1/fruits
   ```

4. **Add Fruit to Cart**
   ```bash
   curl -X POST http://localhost:3001/api/v1/cart/items \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{
       "fruitId": "fruit-id-from-previous-step",
       "quantity": 1
     }'
   ```

5. **View Cart**
   ```bash
   curl http://localhost:3001/api/v1/cart \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

6. **Create Order**
   ```bash
   curl -X POST http://localhost:3001/api/v1/orders \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{
       "paymentMethod": "paypal",
       "shippingAddress": "123 Main St",
       "shippingCity": "Fruitville",
       "shippingState": "CA",
       "shippingZip": "90210",
       "shippingCountry": "USA"
     }'
   ```

7. **View Order**
   ```bash
   curl http://localhost:3001/api/v1/orders/ORDER_ID \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

## Testing

Run the integration tests:
```bash
pnpm test
```

The `src/tests/integration/fruit-purchase-workflow.test.ts` file demonstrates the complete workflow for 5 users purchasing different fruits.

## API Documentation

API documentation is available at http://localhost:3001/docs when the server is running.


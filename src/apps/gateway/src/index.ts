import { build } from './app';

// Initialize Fastify server
const server = await build();

// Server startup function
async function start() {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
    
    await server.listen({ port, host: '0.0.0.0' });
    server.log.info(`Server is running on http://localhost:${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

// Start server if this file is run directly
if (require.main === module) {
  start();
}

// Export for testing or programmatic use
export { server };
    //   return FlutterwaveGateway();
    // case "crypto": 
    //   return CryptoGateway();
//     default:
//       throw new Error(`Payment gateway ${gatewayType} not supported`);
//   }
// }

// Export Gateway services
// export { PayPalGateway } from "./paypal";

// Export all Gateway types
export * from './stripe/stripe.type';
export * from "./paypal/paypal.type";


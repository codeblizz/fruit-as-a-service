import { PayPalGateway } from "./paypal";
import { StripeGateway } from "./stripe";
import { PaymentGateway } from "./common/gateway.interface";
export async function createPaymentGateway(gateway: string): Promise<PaymentGateway> {
  "use server";
  switch (gateway) {
    case "stripe":
      return StripeGateway();
    case "paypal":
      return PayPalGateway();
    default:
      throw new Error(`Payment gateway ${gateway} not supported`);
  }
}

// Export common interfaces
export * from "./common/gateway.interface";

// Export Gateway services
export { PayPalGateway } from "./paypal";

// Export all Gateway types
export * from './stripe/stripe.type';
export * from "./paypal/paypal.type";


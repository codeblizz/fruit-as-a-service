import CryptoGateway from "./crypto";
import { PayPalGateway } from "./paypal";
import { StripeGateway } from "./stripe";
import { PaystackGateway } from "./paystack";
import { FlutterwaveGateway } from "./flutterwave";
import { PaymentGateway } from "@/packages/types/src/gateway.type";
export async function createPaymentGateway(gatewayType: string): Promise<PaymentGateway> {
  switch (gatewayType) {
    case "stripe":
      return StripeGateway();
    case "paypal":
      return PayPalGateway();
    case "paystack": 
      return PaystackGateway();
    // case "flutterwave": 
    //   return FlutterwaveGateway();
    // case "crypto": 
    //   return CryptoGateway();
    default:
      throw new Error(`Payment gateway ${gatewayType} not supported`);
  }
}

// Export Gateway services
export { PayPalGateway } from "./paypal";

// Export all Gateway types
export * from './stripe/stripe.type';
export * from "./paypal/paypal.type";


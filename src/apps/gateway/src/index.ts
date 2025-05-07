import { StripeGateway } from "./stripe/stripe.service";
import { PayPalGateway } from "./paypal/paypal.service";
import { PaymentGateway } from "./common/gateway.interface";
import { PaystackGateway } from "./paystack/paystack.service";

type PaymentProvider = "stripe" | "paypal" | "paystack" | "";

// Payment Gateway Factory
export function createPaymentGateway(provider: PaymentProvider): PaymentGateway {
  switch (provider) {
    case "stripe":
      return StripeGateway();
    case "paypal":
      return PayPalGateway();
    case "paystack":
      return PaystackGateway();
    default:
      throw new Error(`Unsupported payment provider: ${provider}`);
  }
}

export { StripeGateway, PayPalGateway, PaystackGateway };

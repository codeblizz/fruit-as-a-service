import { PaymentGateway } from "../common/gateway.interface";
import { core, orders, payments } from "@paypal/checkout-server-sdk";

if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
  throw new Error("PayPal credentials are not defined");
}

const environment =
  process.env.NODE_ENV === "production"
    ? new core.LiveEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
      )
    : new core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
      );

const client = new core.PayPalHttpClient(environment);

export function PayPalGateway(): PaymentGateway {
  return {
    async createPaymentIntent(params) {
      const request = new orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: params.currency.toUpperCase(),
              value: (params.amount / 100).toString(), // Convert from cents to dollars
            },
            description: params.description,
            custom_id: params.metadata?.orderId,
          },
        ],
      });

      const order = await client.execute(request);

      return {
        id: order.result.id,
        amount: params.amount,
        currency: params.currency,
        status: order.result.status.toLowerCase(),
        paymentMethodId: undefined,
      };
    },

    async confirmPaymentIntent(params) {
      const request = new orders.OrdersCaptureRequest(params.paymentIntentId);
      const capture = await client.execute(request);

      return {
        id: capture.result.id,
        amount: parseInt(
          (
            parseFloat(capture.result.purchase_units[0].amount.value) * 100
          ).toString()
        ),
        currency:
          capture.result.purchase_units[0].amount.currency_code.toLowerCase(),
        status: capture.result.status.toLowerCase(),
        paymentMethodId: undefined,
      };
    },

    async createPaymentMethod(params) {
      // PayPal doesn't require storing payment methods as they're handled through their checkout flow
      throw new Error(
        "PayPal doesn't support storing payment methods directly"
      );
    },

    async listPaymentMethods(params) {
      // PayPal doesn't support listing stored payment methods
      return [];
    },

    async refundPayment(params) {
      const captureRequest = new orders.OrdersGetRequest(
        params.paymentIntentId
      );
      const capture = await client.execute(captureRequest);
      const captureId =
        capture.result.purchase_units[0].payments.captures[0].id;

      const refundRequest = new payments.CapturesRefundRequest(captureId);
      if (params.amount) {
        refundRequest.requestBody({
          amount: {
            value: (params.amount / 100).toString(),
            currency_code: "USD",
          },
          note_to_payer: "Refund for order",
          invoice_id: params.paymentIntentId,
        });
      }

      const refund = await client.execute(refundRequest);

      return {
        id: refund.result.id,
        status: refund.result.status ?? "failed",
      };
    },
  };
}

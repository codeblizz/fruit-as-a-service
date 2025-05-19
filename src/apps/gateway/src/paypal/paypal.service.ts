import axios from "axios";
import { PaymentGateway } from "@/apps/gateway/src/common/gateway.interface";


const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;
const PAYPAL_API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

let cachedAccessToken: string | null = null;
let tokenExpiryTime = 0;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedAccessToken && now < tokenExpiryTime) {
    return cachedAccessToken;
  }
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString(
    "base64"
  );
  const response = await axios.post(
    `${PAYPAL_API_BASE}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  cachedAccessToken = response.data.access_token;
  tokenExpiryTime = now + response.data.expires_in * 1000 - 60000; // refresh 1 min early

  return cachedAccessToken ?? "";
}

async function paypalRequest<T>(
  method: "GET" | "POST" | "PATCH",
  path: string,
  data?: any
): Promise<T> {
  const accessToken = await getAccessToken();

  const response = await axios.request<T>({
    method,
    url: `${PAYPAL_API_BASE}${path}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data,
  });

  return response.data;
}


export function PayPalGateway(): PaymentGateway {
  return {
    async createPaymentIntent(params) {
      const body = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: params.currency.toUpperCase(),
              value: (params.amount / 100).toFixed(2),
            },
            description: params.description,
            custom_id: params.metadata?.orderId,
          },
        ],
      };

      const order = await paypalRequest<{ id: string; status: string; }>(
        "POST",
        "/v2/checkout/orders",
        body
      );

      return {
        id: order.id,
        amount: params.amount,
        currency: params.currency,
        status: order.status?.toLowerCase() || "created",
        paymentMethodId: undefined,
      };
    },

    async confirmPaymentIntent(params) {
      // Capture the order
      const capture = await paypalRequest<any>(
        "POST",
        `/v2/checkout/orders/${params.paymentIntentId}/capture`
      );

      const purchaseUnit = capture.purchase_units?.[0];
      const amountValue = purchaseUnit?.payments?.captures?.[0]?.amount?.value;
      const currencyCode = purchaseUnit?.payments?.captures?.[0]?.amount?.currency_code;

      return {
        id: capture.id,
        amount: amountValue ? Math.round(parseFloat(amountValue) * 100) : 0,
        currency: currencyCode?.toLowerCase() || "$",
        status: capture.status?.toLowerCase() || "unknown",
        paymentMethodId: undefined,
      };
    },

    async createPaymentMethod(params) {
      throw new Error(
        "PayPal doesn't support storing payment methods directly"
      );
    },

    async listPaymentMethods(params) {
      return [];
    },

    async refundPayment(params) {
      // First get the capture ID from the order
      const order = await paypalRequest<any>(
        "GET",
        `/v2/checkout/orders/${params.paymentIntentId}`
      );

      const captureId =
        order.purchase_units?.[0]?.payments?.captures?.[0]?.id;

      if (!captureId) {
        throw new Error("Capture ID not found for refund");
      }

      const refundBody: any = {};

      if (params.amount) {
        refundBody.amount = {
          value: (params.amount / 100).toFixed(2),
          currency_code: "USD", // You may want to make this dynamic
        };
        refundBody.note_to_payer = "Refund for order";
        refundBody.invoice_id = params.paymentIntentId;
      }

      const refund = await paypalRequest<any>(
        "POST",
        `/v2/payments/captures/${captureId}/refund`,
        refundBody
      );

      return {
        id: refund.id,
        status: refund.status ?? "failed",
      };
    },

    async createSubscription(params) {
      throw new Error('PayPal subscriptions not implemented');
    },

    async cancelSubscription(subscriptionId: string) {
      throw new Error('PayPal subscriptions not implemented');
    },

    async pauseSubscription(subscriptionId: string) {
      throw new Error('PayPal subscriptions not implemented');
    },

    async resumeSubscription(subscriptionId: string) {
      throw new Error('PayPal subscriptions not implemented');
    },

    async constructWebhookEvent(payload: string, signature: string) {
      throw new Error('PayPal webhooks not implemented');
    }
  };
}

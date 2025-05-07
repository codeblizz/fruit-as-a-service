import axios from 'axios';
import { PaymentGateway } from "../common/gateway.interface";

if (!process.env.PAYSTACK_SECRET_KEY) {
  throw new Error("PAYSTACK_SECRET_KEY is not defined");
}

const paystackApi = axios.create({
  baseURL: process.env.PAYSTACK_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

export function PaystackGateway(): PaymentGateway {
  return {
    async createPaymentIntent(params) {
      const response = await paystackApi.post('/transaction/initialize', {
        amount: params.amount * 100, // Paystack expects amount in kobo (smallest currency unit)
        currency: params.currency,
        email: params.metadata?.email || 'customer@example.com', // Paystack requires email
        reference: params.metadata?.orderId,
        metadata: params.metadata,
      });

      return {
        id: response.data.data.reference,
        amount: params.amount,
        currency: params.currency,
        status: 'pending',
        paymentMethodId: undefined,
      };
    },

    async confirmPaymentIntent(params) {
      const response = await paystackApi.get(`/transaction/verify/${params.paymentIntentId}`);
      const transaction = response.data.data;

      return {
        id: transaction.reference,
        amount: transaction.amount / 100, // Convert from kobo to main currency
        currency: transaction.currency.toLowerCase(),
        status: transaction.status.toLowerCase(),
        paymentMethodId: undefined,
      };
    },

    async createPaymentMethod(params) {
      // Paystack handles payment methods through their hosted payment page
      throw new Error("Paystack doesn't support storing payment methods directly");
    },

    async listPaymentMethods(params) {
      // Paystack doesn't support listing stored payment methods
      return [];
    },

    async refundPayment(params) {
      const response = await paystackApi.post('/refund', {
        transaction: params.paymentIntentId,
        amount: params.amount,
      });

      return {
        id: response.data.data.reference,
        status: response.data.data.status.toLowerCase(),
      };
    },
  };
}

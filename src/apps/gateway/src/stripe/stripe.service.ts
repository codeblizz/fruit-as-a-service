import Stripe from "stripe";
import { PaymentGateway } from "../common/gateway.interface";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-04-30.basil" });

export function StripeGateway(): PaymentGateway {
  return {
    async createPaymentIntent(params) {
      const intent = await stripe.paymentIntents.create({
        amount: params.amount,
        currency: params.currency,
        description: params.description,
        metadata: params.metadata,
      });

      return {
        id: intent.id,
        amount: intent.amount,
        currency: intent.currency,
        status: intent.status,
        paymentMethodId: intent.payment_method as string,
      };
    },

    async confirmPaymentIntent(params) {
      const intent = await stripe.paymentIntents.confirm(params.paymentIntentId, {
        payment_method: params.paymentMethodId,
      });

      return {
        id: intent.id,
        amount: intent.amount,
        currency: intent.currency,
        status: intent.status,
        paymentMethodId: intent.payment_method as string,
      };
    },

    async createPaymentMethod(params) {
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: params.card.number,
          exp_month: params.card.expMonth,
          exp_year: params.card.expYear,
          cvc: params.card.cvc,
        },
        billing_details: params.billingDetails ? {
          name: params.billingDetails.name,
          email: params.billingDetails.email,
          address: params.billingDetails.address ? {
            line1: params.billingDetails.address.line1,
            line2: params.billingDetails.address.line2,
            city: params.billingDetails.address.city,
            state: params.billingDetails.address.state,
            postal_code: params.billingDetails.address.postalCode,
            country: params.billingDetails.address.country,
          } : undefined,
        } : undefined,
      });

      return {
        id: paymentMethod.id,
        type: paymentMethod.type,
        card: paymentMethod.card ? {
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          expMonth: paymentMethod.card.exp_month,
          expYear: paymentMethod.card.exp_year,
        } : undefined,
      };
    },

    async listPaymentMethods(params) {
      const paymentMethods = await stripe.customers.listPaymentMethods(
        params.customerId,
        { type: 'card' }
      );

      return paymentMethods.data.map(pm => ({
        id: pm.id,
        type: pm.type,
        card: pm.card ? {
          brand: pm.card.brand,
          last4: pm.card.last4,
          expMonth: pm.card.exp_month,
          expYear: pm.card.exp_year,
        } : undefined,
      }));
    },

    async refundPayment(params) {
      const refund = await stripe.refunds.create({
        payment_intent: params.paymentIntentId,
        amount: params.amount,
      });

      return {
        id: refund.id,
        status: refund.status ?? 'failed'
      };
    },
  };
}
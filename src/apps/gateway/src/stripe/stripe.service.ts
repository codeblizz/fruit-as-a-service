import Stripe from "stripe";
import env from "@/packages/config/env";
import {
  PaymentIntent,
  PaymentGateway,
  PaymentMethodCreation,
  PaymentIntentAndMethod,
  RefundPaymentParameter,
  ListPaymentMethodReturnType,
  PaymentMethodCreationParameter,
  PaymentIntentCreationParameter,
} from "@/packages/types/src/gateway.type";

export function StripeGateway(): PaymentGateway {
  if (process.env === undefined)
    throw new Error("environmental variable is not defined");
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;
  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2025-04-30.basil",
  });

  return {
    createPaymentIntent: async (
      params: PaymentIntentCreationParameter
    ): Promise<PaymentIntent> => {
      const intent = await stripe.paymentIntents.create({
        amount: params.amount,
        currency: params.currency,
        metadata: params.metadata,
        description: params.description,
      });

      return {
        id: intent.id,
        amount: intent.amount,
        status: intent.status,
        currency: intent.currency,
        paymentMethodId: intent.payment_method as string,
      };
    },

    confirmPaymentIntent: async (
      params: PaymentIntentAndMethod
    ): Promise<PaymentIntent> => {
      const intent = await stripe.paymentIntents.confirm(
        params.paymentIntentId,
        {
          payment_method: params.paymentMethodId,
        }
      );

      return {
        id: intent.id,
        amount: intent.amount,
        status: intent.status,
        currency: intent.currency,
        paymentMethodId: intent.payment_method as string,
      };
    },

    createPaymentMethod: async (params: PaymentMethodCreationParameter): Promise<PaymentMethodCreation> => {
      const paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          number: params.card.number,
          exp_month: params.card.expMonth,
          exp_year: params.card.expYear,
          cvc: params.card.cvc,
        },
        billing_details: params.billingDetails
          ? {
              name: params.billingDetails.name,
              email: params.billingDetails.email,
              address: params.billingDetails.address
                ? {
                    line1: params.billingDetails.address.line1,
                    line2: params.billingDetails.address.line2,
                    city: params.billingDetails.address.city,
                    state: params.billingDetails.address.state,
                    postal_code: params.billingDetails.address.postalCode,
                    country: params.billingDetails.address.country,
                  }
                : undefined,
            }
          : undefined,
      });

      return {
        id: paymentMethod.id,
        type: paymentMethod.type,
        card: paymentMethod.card
          ? {
              brand: paymentMethod.card.brand,
              last4: paymentMethod.card.last4,
              expMonth: paymentMethod.card.exp_month,
              expYear: paymentMethod.card.exp_year,
            }
          : undefined,
      };
    },

    listPaymentMethods: async (params: { customerId: string }): Promise<ListPaymentMethodReturnType> => {
      const paymentMethods = await stripe.customers.listPaymentMethods(
        params.customerId,
        { type: "card" }
      );

      return paymentMethods.data.map((pm) => ({
        id: pm.id,
        type: pm.type,
        card: pm.card
          ? {
              brand: pm.card.brand,
              last4: pm.card.last4,
              expMonth: pm.card.exp_month,
              expYear: pm.card.exp_year,
            }
          : undefined,
      }));
    },

    refundPayment: async (params: RefundPaymentParameter) => {
      const refund = await stripe.refunds.create({
        payment_intent: params.paymentIntentId,
        amount: params.amount,
      });

      return {
        id: refund.id,
        status: refund.status ?? "failed",
      };
    },

    createSubscription: async (params: any) => {
      const subscription = await stripe.subscriptions.create({
        customer: params.customerId,
        items: [{ price: params.planId }],
        payment_behavior: "default_incomplete",
        payment_settings: { payment_method_types: ["card"] },
        default_payment_method: params.paymentMethodId,
        metadata: params.metadata,
      });

      return {
        id: subscription.id,
        status: subscription.status,
        current_period_end:
          Math.floor(Date.now() / 1000) +
          (subscription.trial_end || 30 * 24 * 60 * 60),
      };
    },

    cancelSubscription: async (subscriptionId: string) => {
      await stripe.subscriptions.cancel(subscriptionId);
    },

    pauseSubscription: async (subscriptionId: string) => {
      await stripe.subscriptions.update(subscriptionId, {
        pause_collection: { behavior: "void" },
      });
    },

    resumeSubscription: async (subscriptionId: string) => {
      await stripe.subscriptions.update(subscriptionId, {
        pause_collection: null,
      });
    },

    constructWebhookEvent: async (payload: string, signature: string) => {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      return event;
    },
  };
}

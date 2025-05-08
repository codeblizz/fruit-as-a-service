export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethodId?: string;
}

export interface PaymentGateway {
  createPaymentIntent: (params: {
    amount: number;
    currency: string;
    description?: string;
    metadata?: Record<string, string>;
  }) => Promise<{
    id: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethodId?: string;
  }>;

  confirmPaymentIntent: (params: {
    paymentIntentId: string;
    paymentMethodId: string;
  }) => Promise<{
    id: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethodId?: string;
  }>;

  createPaymentMethod: (params: {
    type: string;
    card: {
      number: string;
      expMonth: number;
      expYear: number;
      cvc: string;
    };
    billingDetails?: {
      name?: string;
      email?: string;
      address?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
      };
    };
  }) => Promise<{
    id: string;
    type: string;
    card?: {
      brand: string;
      last4: string;
      expMonth: number;
      expYear: number;
    };
  }>;

  listPaymentMethods: (params: { customerId: string }) => Promise<
    Array<{
      id: string;
      type: string;
      card?: {
        brand: string;
        last4: string;
        expMonth: number;
        expYear: number;
      };
    }>
  >;

  refundPayment: (params: {
    paymentIntentId: string;
    amount?: number;
  }) => Promise<{
    id: string;
    status: string;
  }>;

  createSubscription: (params: {
    customerId: string;
    planId: string;
    paymentMethodId: string;
    metadata?: Record<string, string>;
  }) => Promise<{
    id: string;
    status: string;
    current_period_end: number;
  }>;

  cancelSubscription: (subscriptionId: string) => Promise<void>;
  pauseSubscription: (subscriptionId: string) => Promise<void>;
  resumeSubscription: (subscriptionId: string) => Promise<void>;

  constructWebhookEvent: (
    payload: string,
    signature: string
  ) => Promise<{
    type: string;
    data: {
      object: any;
    };
  }>;
}

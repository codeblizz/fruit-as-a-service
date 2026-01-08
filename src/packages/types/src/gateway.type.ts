export interface PaymentMethod {
  id: string;
  type: "stripe" | "paypal" | "paystack" | "flutterwave";
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
}

export interface PaymentIntentAndMethod {
  paymentIntentId: string;
  paymentMethodId: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethodId?: string;
}

export interface PaymentIntentCreationParameter {
  intent: "CAPTURE";
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface PaymentMethodCreationParameter {
  type?: string;
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
}

export interface PaymentMethodCreation {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
}

export type ListPaymentMethodReturnType = Array<{
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
}>;

export interface RefundPaymentParameter {
  paymentIntentId: string;
  amount?: number;
}

export interface RefundPayment {
  id: string;
  status: string;
}

export interface PaymentGateway {
  createPaymentIntent: (
    params: PaymentIntentCreationParameter
  ) => Promise<PaymentIntent>;

  confirmPaymentIntent: (
    params: PaymentIntentAndMethod
  ) => Promise<PaymentIntent>;

  createPaymentMethod: (
    params: PaymentMethodCreationParameter
  ) => Promise<PaymentMethodCreation>;

  listPaymentMethods: (params: {
    customerId: string;
  }) => Promise<ListPaymentMethodReturnType>;

  refundPayment: (params: RefundPaymentParameter) => Promise<RefundPayment>;

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

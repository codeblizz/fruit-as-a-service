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
  createPaymentIntent(params: {
    amount: number;
    currency: string;
    description: string;
    metadata?: Record<string, string>;
  }): Promise<PaymentIntent>;

  confirmPaymentIntent(params: {
    paymentIntentId: string;
    paymentMethodId: string;
  }): Promise<PaymentIntent>;

  createPaymentMethod(params: {
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
  }): Promise<PaymentMethod>;

  listPaymentMethods(params: {
    customerId: string;
    type: string;
  }): Promise<PaymentMethod[]>;

  refundPayment(params: {
    paymentIntentId: string;
    amount?: number;
  }): Promise<{ id: string; status: string }>;
}
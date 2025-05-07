import { StripeGateway } from "./stripe.service";

const gateway = StripeGateway();

// Create a payment intent for a fruit order
const paymentIntent = await gateway.createPaymentIntent({
  amount: 2000,
  currency: 'usd',
  description: 'Fruit basket order #123',
  metadata: { orderId: '123' }
});

// Process a payment method
const paymentMethod = await gateway.createPaymentMethod({
  type: 'card',
  card: {
    number: '4242424242424242',
    expMonth: 12,
    expYear: 2024,
    cvc: '123'
  },
  billingDetails: {
    name: 'John Doe',
    email: 'john@example.com'
  }
});

// Confirm the payment
const confirmedPayment = await gateway.confirmPaymentIntent({
  paymentIntentId: paymentIntent.id,
  paymentMethodId: paymentMethod.id
});
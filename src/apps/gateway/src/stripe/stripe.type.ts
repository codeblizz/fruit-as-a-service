export type StripePaymentIntent = {
    amount: number;
    currency: string;
    description?: string;
    metadata?: Record<string, string>
}
import { z } from "zod";

export const PaymentSchema = z.object({
  cardNumber: z.string().min(16).max(16),
  expMonth: z.string().min(1).max(2),
  expYear: z.string().length(4),
  cvc: z.string().length(3),
  type: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  address: z.object({
    line1: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
  }),
});

export type PaymentFormData = z.infer<typeof PaymentSchema>;

import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Field not an email format")
    .min(5)
    .nonempty("Email field is empty ")
    .trim(),
  password: z
    .string()
    .min(5)
    .max(30)
    .nonempty("Password field is empty")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
      "At least a capital, small letter, & special character"
    ),
});

export const RegisterSchema = LoginSchema.extend({
  acceptTerms: z
    .boolean()
    .default(false)
    .refine((term) => term === true, { message: "Field is required" }),
});

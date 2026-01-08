import { z } from "zod";

export const SigninSchema = z.object({
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
  rememberMe: z.boolean().default(false).optional(),
});

export const SignupSchema = SigninSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  businessName: z.string().min(3, "Business name is required"),
  termsAccepted: z
    .boolean()
    .default(false)
    .refine((term) => term === true, { message: "Field is required" }),
}).omit({ rememberMe: true });

export const ResetPasswordSchema = SigninSchema.pick({
  password: true,
}).extend({
  confirmPassword: z
    .string()
    .min(5)
    .max(30)
    .nonempty("Confirm password is empty"),
});

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
export type SignupType = z.infer<typeof SignupSchema>;
export type SigninType = z.infer<typeof SigninSchema>;

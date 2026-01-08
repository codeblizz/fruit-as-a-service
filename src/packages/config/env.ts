// import { z } from "zod";

// const envClientSchema = z.object({
//   NEXT_PUBLIC_PAYPAL_CLIENT_ID: z
//   .string()
//   .min(1, { message: "Value is empty" }),
//   NEXT_PUBLIC_ENV: z
//   .enum(["development", "staging", "production"])
//   .default("development"),
// });

// const envServerSchema = z.object({
//   NEXTAUTH_URL: z.string().min(1, { message: "Value is empty" }).url(),
//   GOOGLE_CLIENT_ID: z.string().min(1, { message: "Value is empty" }),
//   GOOGLE_CLIENT_SECRET: z.string().min(1, { message: "Value is empty" }),
//   FACEBOOK_CLIENT_ID: z.string().min(1, { message: "Value is empty" }),
//   FACEBOOK_CLIENT_SECRET: z.string().min(1, { message: "Value is empty" }),
//   NEXTAUTH_SECRET: z.string().min(1, { message: "Value is empty" }),
//   BACKEND_BASE_URL: z.string().min(1, { message: "Value is empty" }).url(),
// });

// export function validateEnv<T extends z.ZodSchema>(
//   schema: T,
//   env: Record<string, string | undefined> = typeof process !== "undefined"
//     ? process.env
//     : {}
// ): z.infer<T> {
//   try {
//     return schema.parse(env);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       const missingVars = error.issues.map(
//         (err) => `${err.path.join(".")}: ${err.message}`
//       );

//       console.error("\n--- Environment Validation Failed ---");
//       console.error(missingVars.join("\n"));
//       console.error("-------------------------------------\n");

//       throw new Error(
//         `Environment validation failed. Please check your .env files and ensure all required variables are set.`
//       );
//     }
//     throw error;
//   }
// }

// // Module-level cache to prevent re-parsing
// let clientEnvCache: z.infer<typeof envClientSchema> | undefined;
// let serverEnvCache: z.infer<typeof envServerSchema> | undefined;

// export function getClientEnv() {
//   if (!clientEnvCache) {
//     clientEnvCache = validateEnv(envClientSchema);
//   }
//   return clientEnvCache;
// }

// export function getServerEnv() {
//   if (!serverEnvCache) {
//     serverEnvCache = validateEnv(envServerSchema);
//   }
//   return serverEnvCache;
// }

// export type WebEnv = z.infer<typeof envClientSchema>;
// export type ServerEnv = z.infer<typeof envServerSchema>;

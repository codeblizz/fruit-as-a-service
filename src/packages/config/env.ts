import { z } from "zod";
import utils from "@/packages/helpers/src/utils";

const envClientSchema = z.object({
  PUBLIC_NEXT_URL: z.string().min(1, { message: "value is empty" }).url(),
  PUBLIC_NEXT_ENV: z.enum(["development", "staging"]).default("development"),
});

const envServerSchema = z.object({
  AUTH_SECRET: z.string().min(1, { message: "value is empty" }),
  STRIPE_SECRET_KEY: z.string().min(1, { message: "value is empty"}),
  GOOGLE_CLIENT_ID: z.string().min(1, { message: "value is empty" }),
  NODE_BASE_URL: z.string().min(1, { message: "value is empty" }).url(),
  GOOGLE_CLIENT_SECRET: z.string().min(1, { message: "value is empty" }),
});

export type EnvType = z.infer<typeof envServerSchema & typeof envClientSchema>;
export function validateEnv() {
  if(typeof window === "undefined") { 
    const parsedEnv = envServerSchema.safeParse(process.env);
    if (parsedEnv.error) {
      console.error("Environment variable validation failed:", parsedEnv.error.issues);
      throw utils.customError("Invalid environment variable");
    }
    return parsedEnv.data;
  } else return envClientSchema.safeParse(process.env).data;
} 

const env = validateEnv();

export default env;
import { z } from "zod";
import utils from "@/packages/helpers/src/utils";

const envSchema = z.object({
  NEXT_AUTH_URL: z.string().min(1, { message: "value is empty" }),
  JAVA_AUTH_URL: z.string().min(1, { message: "value is empty" }),
  NEXT_AUTH_SECRET: z.string().min(1, { message: "value is empty" }),
  NEXT_GOOGLE_CLIENT_ID: z.string().min(1, { message: "value is empty" }),
  NEXT_NODE_ENV: z.enum(["development", "staging"]).default("development"),
  NEXT_GOOGLE_CLIENT_SECRET: z.string().min(1, { message: "value is empty" }),
});

export type EnvType = z.infer<typeof envSchema>;

const parsedEnvVariables = envSchema.safeParse(process.env);

if (!parsedEnvVariables.success) {
  const { error } = parsedEnvVariables;
  console.error("Environment variable validation failed:", error.issues);
  throw utils.customError("Invalid environment variable");
}
const env = parsedEnvVariables.data;

export default env;
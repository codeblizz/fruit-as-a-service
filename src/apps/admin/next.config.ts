import type { NextConfig } from "next";
// import * as path from "path";
// const dotenv = require("dotenv");

// const rootDir = path.resolve(__dirname, "../..");
// const rootEnvPath = path.join(rootDir, ".env");
// const loadedEnv = dotenv.config({ path: rootEnvPath });

// Optional: Use dotenv-expand if you rely on variable expansion (e.g., DB_URL=${DB_HOST}/...)
// if (loadedEnv.parsed) {
//   require('dotenv-expand').expand(loadedEnv);
// }

// const { getClientEnv, getServerEnv } = require("../../packages/config/lib/env.js");

// const validatedClientEnv = getClientEnv();
// const validatedServerEnv = getServerEnv();

// Safely merge objects into the env block
// const mergeEnv = (env: any) => {
//   return Object.keys(env).reduce((acc, key) => {
//     acc[key] = env[key];
//     return acc;
//   }, {} as Record<string, string | undefined>);
// };

const nextConfig: NextConfig = {
  // env: {
  // Merge all client variables (NEXT_PUBLIC_...)
  // ...mergeEnv(validatedClientEnv),

  // Merge all server variables that might be needed for SSR
  // ...mergeEnv(validatedServerEnv),
  // },
  /* config options here */

    transpilePackages: [
      '@codeblizz/ui',
      '@codeblizz/providers',
      '@codeblizz/helpers',
      '@codeblizz/auth',
      '@codeblizz/config',
      '@codeblizz/services',
      '@codeblizz/store',
      '@codeblizz/types',
    ],
};

export default nextConfig;

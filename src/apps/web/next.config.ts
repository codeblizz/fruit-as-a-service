import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

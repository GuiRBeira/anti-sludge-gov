import type { NextConfig } from "next";
import { readFileSync } from "fs";
import { join } from "path";

const packageJson = JSON.parse(readFileSync(join(__dirname, "package.json"), "utf-8"))

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    APP_VERSION: packageJson.version,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gov.br',
        pathname: '/++theme++padrao_govbr/img/**',
      },
    ],
  },
};

export default nextConfig;

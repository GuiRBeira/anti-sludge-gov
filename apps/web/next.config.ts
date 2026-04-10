import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

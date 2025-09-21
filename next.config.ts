import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable React Server Components temporarily to fix the error
    serverComponentsExternalPackages: [],
  },
  // Enable standalone output for better compatibility
  output: 'standalone',
};

export default nextConfig;

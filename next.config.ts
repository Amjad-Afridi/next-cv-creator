// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['puppeteer'], // Changed from experimental.serverComponentsExternalPackages
};

export default nextConfig;
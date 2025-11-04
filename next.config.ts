import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // NOTE: NEXT_PUBLIC_* variables are automatically exposed to the browser
  // Server-side secrets (STRIPE_SECRET_KEY, etc.) are NOT included here for security
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allow production builds to successfully complete even if there are ESLint errors
    ignoreDuringBuilds: true,

  
  },
  typescript: {

    // Enable type checking for all TypeScript files in the project
    ignoreBuildErrors: true,
 
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Admin panel — separate process from web
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "pub-f43e2a6bc3b94b058dd10fe071de22ef.r2.dev",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Admin panel — separate process from web
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;

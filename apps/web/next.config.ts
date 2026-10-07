import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pub-f43e2a6bc3b94b058dd10fe071de22ef.r2.dev",
      },
    ],
  },
};

export default nextConfig;

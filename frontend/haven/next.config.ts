import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.pexels.com",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.pixabay.com",
      },
    ],
  },
  allowedDevOrigins: [
      "192.168.1.9",
      "192.168.1.44"
  ]
};

export default nextConfig;

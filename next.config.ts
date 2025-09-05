
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/addSchool",
        permanent: true, // 308 redirect
      },
    ];
  },
};

export default nextConfig;

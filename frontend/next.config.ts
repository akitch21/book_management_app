import type { NextConfig } from "next";

const nextConfig = {
  async rewrites() {
    const apiBase = process.env.INTERNAL_API_BASE || "http://localhost:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${apiBase}/:path*`,
      },
    ];
  },
};

export default nextConfig;

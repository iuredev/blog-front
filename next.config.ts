import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/blog", destination: "/notes", permanent: true },
      { source: "/blog/:slug", destination: "/notes/:slug", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "strapi.iure.dev",
      },
    ],
  },
};

export default nextConfig;

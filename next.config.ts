import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [new URL("https://cdn.myanimelist.net/images/anime/**")],
  },
};

export default nextConfig;

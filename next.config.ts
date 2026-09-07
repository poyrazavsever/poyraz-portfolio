import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ghchart.rshah.org",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
      },
      {
        protocol: "https",
        hostname: "substackcdn.com",
      },
      {
        protocol: "https",
        hostname: "substack-post-media.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "www.c-sharpcorner.com",
      },
      {
        protocol: "https",
        hostname: "media.geeksforgeeks.org",
      },
      {
        protocol: "https",
        hostname: "edward-huang.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "cdn.hashnode.com",
      },
      {
        protocol: "https",
        hostname: "i.sstatic.net",
      },
    ],
  },
};

export default withNextIntl(nextConfig);

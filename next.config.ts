import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // User photos are first-class content: serve modern formats.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

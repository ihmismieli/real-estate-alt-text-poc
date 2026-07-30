import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [
      {
        pathname: '/uploads/listings/**',
      },
      {
        pathname: '/listing-image-placeholder.png',
        search: '',
      },
    ],
  }
}

export default nextConfig;

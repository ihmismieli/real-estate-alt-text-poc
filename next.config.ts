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
      {
        pathname: '/hero.png',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wwlwj7f2cipxpkoe.public.blob.vercel-storage.com",
      },
    ],
  }
}

export default nextConfig;

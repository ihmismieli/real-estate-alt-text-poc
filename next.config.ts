import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    localPatterns: [
      {
        pathname: '/uploads/listings/**',
      },
      {
        pathname: '/listing-image-placeholder.png',
        search: '',
      },
      {
        pathname: '/hero.webp',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wwlwj7f2cipxpkoe.public.blob.vercel-storage.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value:
              `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: https://wwlwj7f2cipxpkoe.public.blob.vercel-storage.com; connect-src 'self'; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
          },
        ],
      },
    ];
  },
}

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude server-only modules from client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  },
  transpilePackages: ['@genkit-ai/ai', '@genkit-ai/core', '@genkit-ai/flow', '@genkit-ai/googleai'],
  experimental: {
    esmExternals: 'loose',
  },
}

module.exports = nextConfig

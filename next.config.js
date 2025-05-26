/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    // Disable webpack caching for client-side builds
    if (!isServer) {
      config.cache = {
        type: 'memory'
      };
    }
    return config;
  },
  experimental: {
    // Disable memory watcher to prevent SIGINT handling issues
    memoryWatcher: false
  }
};

module.exports = nextConfig;
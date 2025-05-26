/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    // Disable file system caching completely
    config.cache = false;
    return config;
  },
  experimental: {
    // Disable memory watcher to prevent SIGINT handling issues
    memoryWatcher: false
  }
};

module.exports = nextConfig;
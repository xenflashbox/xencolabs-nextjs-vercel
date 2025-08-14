/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  webpack: (config, { isServer }) => {
    // Fix for zustand/react/shallow compatibility
    config.resolve.alias = {
      ...config.resolve.alias,
      'zustand/react/shallow': 'zustand/shallow',
      'zustand/traditional': 'zustand',
    };

    // Fix for lucide-react/dynamicIconImports
    config.resolve.alias['lucide-react/dynamicIconImports'] = 'lucide-react';

    // Additional fallbacks that might be needed
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    return config;
  },
  
  // Transpile the C1 SDK
  transpilePackages: ['@thesysai/genui-sdk'],
};

export default nextConfig;

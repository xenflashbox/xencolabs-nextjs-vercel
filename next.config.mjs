/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },

  // Payload CMS media hosts for the blog (featured images, hero images,
  // author avatars, editorial image blocks). See the payload-blog-template
  // next-config.remotePatterns snippet.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cms.xencolabs.com', pathname: '/**' },
      { protocol: 'https', hostname: 'publish.xencolabs.com', pathname: '/**' },
    ],
  },

  // Static developer-tools site lives in public/tools/ (migrated from the
  // retired tools.devmaestro.io swarm container). Next.js does not auto-serve
  // index.html from a public/ subfolder, so map the clean SEO URLs to the
  // underlying static files. With trailingSlash=false (the default) Next
  // canonicalises to the no-slash form, so we only rewrite the no-slash URLs;
  // /tools/ and /tools/:slug/ get 308'd to these by Next automatically.
  async rewrites() {
    return [
      { source: '/tools', destination: '/tools/index.html' },
      { source: '/tools/:slug', destination: '/tools/:slug/index.html' },
    ];
  },

  // The small-business web-build offer was briefly published under
  // /growth/ai-growth-system before being repositioned to /websites.
  async redirects() {
    return [
      { source: '/growth/ai-growth-system', destination: '/websites', permanent: true },
    ];
  },

  webpack: (config, { isServer }) => {
    // These aliases were needed for C1 SDK compatibility
    // Keeping them commented out in case we need to restore the SDK later
    /*
    config.resolve.alias = {
      ...config.resolve.alias,
      'zustand/react/shallow': 'zustand/shallow',
      'zustand/traditional': 'zustand',
    };

    // Fix for lucide-react/dynamicIconImports
    config.resolve.alias['lucide-react/dynamicIconImports'] = 'lucide-react';
    */

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
  
  // Temporarily commented out for C1 SDK removal
  // transpilePackages: ['@thesis/c1-sdk'],
};

export default nextConfig;

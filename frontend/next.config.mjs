/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ['image/webp'],
  },

  // Headers for security and performance
  async headers() {
  return [
    {
      source: '/pdfs/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'self'",
        },
      ],
    },
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ];
},


  // Redirects
  async redirects() {
    return [
      // Add any URL redirects here if needed
    ];
  },

  // Rewrites
  async rewrites() {
    return {
      beforeFiles: [
        // Add any rewrites here if needed
      ],
    };
  },
};

export default nextConfig;
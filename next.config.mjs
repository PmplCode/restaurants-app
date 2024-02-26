/** @type {import('next').NextConfig} */
const nextConfig = {
    headers: () => [
        {
            source: '/',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
    ],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
    experimental: {
        serverActions: {
          allowedOrigins: [],
        },
      },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    headers: () => [
        {
            source: 'https://restaurants-app-nine.vercel.app/',
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
        serverActions: true,
    },
};

export default nextConfig;

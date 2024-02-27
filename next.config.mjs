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
                pathname: '**',
                port: '',
            },
            {
                protocol: "http",
                hostname: "**",
                pathname: '**',
                port: '',
            },
        ],
    },
    experimental: {
        serverActions: true,
    },
};

export default nextConfig;
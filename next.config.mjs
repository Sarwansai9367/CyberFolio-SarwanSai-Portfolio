/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    experimental: {
        // Allow LAN access during development to avoid CORS warnings for /_next/*
        allowedDevOrigins: ["http://192.168.56.1:3000"],
    },
}

export default nextConfig
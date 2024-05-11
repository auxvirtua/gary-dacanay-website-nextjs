/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "img.youtube.com"
            },
            {
                hostname: "via.placeholder.com"
            },
        ],
    }
};

export default nextConfig;

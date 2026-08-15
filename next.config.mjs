/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.youtube.com",
      },
      {
        hostname: "image-cdn-fa.spotifycdn.com",
      },
    ],
  },
};

export default nextConfig;

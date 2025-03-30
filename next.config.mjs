/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "127.0.0.1", "https://mission10-be.onrender.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: [
          "http://localhost:8000/uploads/:path*",
          "https://mission10-be.onrender.com/uploads/:path*",
        ],
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   domains: [
  //     "**",
  //     "image.hanatour.com",
  //     "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
  //     "images.unsplash.com",
  //     "cdn.choicenews.co.kr",
  //     "via.placeholder.com",
  //     "example.com",
  //     "i.namu.wiki",
  //   ],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

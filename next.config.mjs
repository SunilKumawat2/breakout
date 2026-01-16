/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   "localhost",
    //   "127.0.0.1",
    //   "192.168.1.100",
    //   "breakout.b-cdn.net",
    //   "breakout.in",
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "breakout.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "breakout.in",
      },
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;

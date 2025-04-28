/** @type {import('next').NextConfig} */
//handle external images
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "anmeshop.com",
      },
      {
        hostname: "static.wixstatic.com",
      },
    ],
  },
};

export default nextConfig;

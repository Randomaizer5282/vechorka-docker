/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  env: {
    OLD_HOST: process.env.OLD_HOST,
    CLIENT_HOST: process.env.CLIENT_HOST,
    API_HOST: process.env.API_HOST,
    UPLOAD_HOST: process.env.UPLOAD_HOST,
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ["vechorka.loc", "vechorka.ru", "admin.vechorka.ru", "localhost"],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [460, 768, 1024, 1200],
  },
  experimental: {
    appDir: false,
    // this also controls running workers https://github.com/vercel/next.js/issues/45508#issuecomment-1597087133, which is causing
    // memory issues in 13.4.4 so until that's fixed, we don't want this.
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_NAME: process.env.DB_NAME,
  },
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/announcement',
      //   permanent: false,
      // },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['github.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; img-src 'self' data: https:;",
  },
};

export default nextConfig;

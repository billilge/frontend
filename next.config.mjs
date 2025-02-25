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
    domains: [
      'github.com',
      'billilge-resources.s3.us-west-2.amazonaws.com', // S3 이미지 도메인 추가
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; img-src 'self' data: https:;",
  },
};

export default nextConfig;

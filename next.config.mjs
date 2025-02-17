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
    dangerouslyAllowSVG: true,  // svg 이미지 허용을 위해 추가 -> 보안 위험 있음음
  },
};

export default nextConfig;

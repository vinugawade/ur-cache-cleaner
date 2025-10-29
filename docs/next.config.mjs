/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',              // Enables static export automatically on build
  images: { unoptimized: true },
  basePath: isProd ? '/ur-cache-cleaner' : '',
  assetPrefix: isProd ? '/ur-cache-cleaner/' : '',
};

export default nextConfig;

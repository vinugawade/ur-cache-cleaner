/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for static export build
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === 'production' ? '/ur-cache-cleaner' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ur-cache-cleaner/' : '',
};

export default nextConfig;

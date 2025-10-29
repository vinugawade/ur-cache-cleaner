/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',              // Required for static export
  images: { unoptimized: true }, // GitHub Pages doesn’t support Next.js Image Optimization
  basePath: isProd ? '/ur-cache-cleaner' : '',  // Repo name here
  assetPrefix: isProd ? '/ur-cache-cleaner/' : '',
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/ur-cache-cleaner',
  assetPrefix: '/ur-cache-cleaner/',
  distDir: 'out',
  trailingSlash: true,
};

export default nextConfig;

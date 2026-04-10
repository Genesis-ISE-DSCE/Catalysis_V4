/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [25, 50, 60, 75, 100], 
    
    // localPatterns is GONE!

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
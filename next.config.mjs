/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
        port: '',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'ph-avatars.imgix.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

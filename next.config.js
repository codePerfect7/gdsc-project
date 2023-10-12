/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zaniyqfdytmbmdwwyyyl.supabase.co',
        port: '',
        pathname: '/storage/**',
      }
    ]
  }
}

module.exports = nextConfig

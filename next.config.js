const { join } = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.production === 'true',
})

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination:
            process.env.production === 'true'
              ? 'https://wsh2022-practice-j5kcv767ma-an.a.run.app/:path*'
              : 'http://localhost:3000/api/:path*',
        },
      ],
    }
  },
}

module.exports = withBundleAnalyzer(nextConfig)

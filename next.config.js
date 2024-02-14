const { join } = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.production === 'true',
})

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {}

module.exports = withBundleAnalyzer(nextConfig)

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/archive', destination: '/explore', permanent: true },
    ]
  },
}

export default nextConfig

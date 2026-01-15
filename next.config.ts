import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", // optional
        pathname: "/**" // optional, ถ้าอนุญาตทุก path
      },
      {
        protocol: "https",
        hostname: "uvazgxncfhreebrhkfbm.supabase.co",
        port: "", // optional
        pathname: "/**" // optional, ถ้าอนุญาตทุก path
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "", // optional
        pathname: "/**" // optional, ถ้าอนุญาตทุก path
      }
    ]
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "4mb"
    }
  }
}

export default nextConfig

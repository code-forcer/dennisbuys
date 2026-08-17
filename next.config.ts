import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://[IP_ADDRESS]", "http://localhost:3000",'10.95.197.57'],
};

export default nextConfig;

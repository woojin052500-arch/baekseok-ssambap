import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 정적 빌드(out/) — 어떤 정적 호스팅으로도 옮길 수 있게
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;

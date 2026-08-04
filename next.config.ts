import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的サイトとして書き出す（Vercel / Netlify / Cloudflare Pages / GitHub Pages のどこにでも置ける）
  output: "export",
  // 静的書き出しでは next/image の最適化サーバーが使えない
  images: { unoptimized: true },
  // /works/xxx/index.html の形で出力し、静的ホスティングでの直リンクを安定させる
  trailingSlash: true,
};

export default nextConfig;

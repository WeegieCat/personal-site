import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Cloudflare Workers の静的アセット配信に載せるため、完全な静的サイトとして out/ に出力する
    output: "export",
    // 静的出力では next/image の最適化サーバーが動かないため無効化する
    images: {
        unoptimized: true,
    },
};

export default nextConfig;

"use client";

import dynamic from "next/dynamic";

/**
 * three.js はバンドルが大きく WebGL はブラウザでしか動かないため ssr: false で遅延読み込みする。
 * next/dynamic の ssr: false はクライアントコンポーネントからしか使えないので、
 * このラッパー自体が "use client" である必要がある。
 */
const CubeScene = dynamic(() => import("@/three/scenes/CubeScene"), {
    ssr: false,
    loading: () => null,
});

export default function CubeBadge({ className = "" }: { className?: string }) {
    return (
        <div
            className={`overflow-hidden rounded-full border-2 border-foreground bg-background ${className}`}>
            <CubeScene />
        </div>
    );
}

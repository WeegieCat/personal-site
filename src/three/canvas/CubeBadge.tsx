"use client";

import { useState } from "react";
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

// クリックのたびにこの順で切り替わる。既定値はサイトの primary / accent。
const PALETTES: readonly (readonly [string, string, string])[] = [
    ["#2563eb", "#7c3aed", "#60a5fa"],
    ["#dc2626", "#f59e0b", "#fbbf24"],
    ["#059669", "#0d9488", "#34d399"],
    ["#db2777", "#e11d48", "#f472b6"],
];

export default function CubeBadge({ className = "" }: { className?: string }) {
    const [paletteIndex, setPaletteIndex] = useState(0);

    return (
        <button
            type='button'
            onClick={() =>
                setPaletteIndex((i) => (i + 1) % PALETTES.length)
            }
            aria-label='キューブの色を変える'
            className={`overflow-hidden rounded-full border-2 border-foreground bg-background transition-transform hover:scale-105 ${className}`}>
            <CubeScene colors={PALETTES[paletteIndex]} />
        </button>
    );
}

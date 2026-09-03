"use client";

import dynamic from "next/dynamic";
import { SITE_THEMES } from "@/lib/themes";
import { useSiteTheme } from "@/lib/theme-context";

/**
 * three.js はバンドルが大きく WebGL はブラウザでしか動かないため ssr: false で遅延読み込みする。
 * next/dynamic の ssr: false はクライアントコンポーネントからしか使えないので、
 * このラッパー自体が "use client" である必要がある。
 */
const BonsaiScene = dynamic(() => import("@/three/scenes/BonsaiScene"), {
    ssr: false,
    loading: () => <div className='h-full w-full animate-pulse bg-surface' />,
});

export default function BonsaiPreview({
    className = "",
}: {
    className?: string;
}) {
    const { themeIndex } = useSiteTheme();
    const theme = SITE_THEMES[themeIndex];

    return (
        <div className={className}>
            <BonsaiScene colors={theme.bonsaiGradient} />
        </div>
    );
}

"use client";

import dynamic from "next/dynamic";
import { SITE_THEMES } from "@/lib/themes";
import { useSiteTheme } from "@/lib/theme-context";

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
    const { themeIndex, setThemeIndex } = useSiteTheme();
    const theme = SITE_THEMES[themeIndex];

    const handleClick = () => {
        setThemeIndex((themeIndex + 1) % SITE_THEMES.length);
    };

    return (
        <button
            type='button'
            onClick={handleClick}
            aria-label={`サイトのテーマカラーを変える（現在: ${theme.label}）`}
            className={`overflow-hidden rounded-full border-2 border-foreground bg-background transition-transform hover:scale-105 ${className}`}>
            <CubeScene
                colors={[
                    theme.vars.primary,
                    theme.vars.accent,
                    theme.vars["primary-hover"],
                ]}
            />
        </button>
    );
}

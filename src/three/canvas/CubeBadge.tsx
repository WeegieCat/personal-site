"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { cubeColorsFromTheme, SITE_THEMES } from "@/lib/themes";
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

// 通常時の右下位置
const REST_POSITION = "bottom-6 sm:bottom-10";
// footer が画面に入っているときはこの高さまで持ち上げてfooterと重ならないようにする
const RAISED_POSITION = "bottom-24 sm:bottom-28";

export default function CubeBadge({ className = "" }: { className?: string }) {
    const { themeIndex, setThemeIndex } = useSiteTheme();
    const theme = SITE_THEMES[themeIndex];
    const [isNearFooter, setIsNearFooter] = useState(false);

    useEffect(() => {
        const footer = document.querySelector("footer");
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsNearFooter(entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(footer);

        return () => observer.disconnect();
    }, []);

    const handleClick = () => {
        setThemeIndex((themeIndex + 1) % SITE_THEMES.length);
    };

    return (
        <button
            type='button'
            onClick={handleClick}
            aria-label={`サイトのテーマカラーを変える（現在: ${theme.label}）`}
            className={`fixed right-6 z-50 overflow-hidden rounded-full border-2 border-foreground bg-background transition-[bottom,transform] duration-500 ease-out hover:scale-105 sm:right-10 ${
                isNearFooter ? RAISED_POSITION : REST_POSITION
            } ${className}`}>
            <CubeScene colors={cubeColorsFromTheme(theme)} />
        </button>
    );
}

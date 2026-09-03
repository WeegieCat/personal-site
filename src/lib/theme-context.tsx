"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { applySiteTheme, SITE_THEMES } from "./themes";

interface ThemeContextValue {
    themeIndex: number;
    setThemeIndex: (index: number) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * サイト全体の配色テーマを保持する。ヘッダーのテーマピッカーと
 * ヒーローのキューブバッジの両方がこれを介して同じ状態を読み書きするため、
 * どちらから切り替えても表示がずれない。
 */
export function SiteThemeProvider({ children }: { children: ReactNode }) {
    const [themeIndex, setThemeIndexState] = useState(0);

    const setThemeIndex = (index: number) => {
        setThemeIndexState(index);
        applySiteTheme(SITE_THEMES[index]);
    };

    return (
        <ThemeContext.Provider value={{ themeIndex, setThemeIndex }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useSiteTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useSiteTheme must be used within SiteThemeProvider");
    }
    return ctx;
}

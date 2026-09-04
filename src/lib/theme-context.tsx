"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { applySiteTheme, SITE_THEMES } from "./themes";

interface ThemeContextValue {
    themeIndex: number;
    setThemeIndex: (index: number) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function SiteThemeProvider({ children }: { children: ReactNode }) {
    const [themeIndex, setThemeIndexState] = useState(0);

    // globals.css の :root はJSが効く前のフォールバックに過ぎないため、
    // マウント時に必ずSITE_THEMES側の値で上書きし、両者がズレても
    // 実際の表示はSITE_THEMESを正として揃える
    useEffect(() => {
        applySiteTheme(SITE_THEMES[themeIndex]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

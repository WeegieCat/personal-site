"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * テーマ設定を一箇所に集約するラッパー。
 * attribute='class' なので <html class="dark"> が付与され、
 * globals.css の @custom-variant dark と対応する。
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <NextThemesProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange>
            {children}
        </NextThemesProvider>
    );
}

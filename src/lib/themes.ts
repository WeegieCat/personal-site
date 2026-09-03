/** globals.css の :root で定義しているカスタムプロパティと1対1で対応する */
export interface SiteThemeVars {
    background: string;
    surface: string;
    foreground: string;
    muted: string;
    border: string;
    primary: string;
    "primary-hover": string;
    accent: string;
    "hero-bg": string;
}

export interface SiteTheme {
    id: string;
    label: string;
    vars: SiteThemeVars;
}

/** 右下のキューブバッジをクリックするたびにこの順で切り替わる */
export const SITE_THEMES: SiteTheme[] = [
    {
        id: "default",
        label: "Default",
        vars: {
            background: "#0b1220",
            surface: "#111a2e",
            foreground: "#f1f5f9",
            muted: "#94a3b8",
            border: "#1f2937",
            primary: "#3b82f6",
            "primary-hover": "#60a5fa",
            accent: "#a78bfa",
            "hero-bg": "#0d1526",
        },
    },
    {
        id: "sunset",
        label: "Sunset",
        vars: {
            background: "#1a0f0f",
            surface: "#2b1414",
            foreground: "#fdf2f2",
            muted: "#e2a8a8",
            border: "#4a1f1f",
            primary: "#dc2626",
            "primary-hover": "#ef4444",
            accent: "#f59e0b",
            "hero-bg": "#1a0f0f",
        },
    },
    {
        id: "terminal",
        label: "Terminal",
        vars: {
            background: "#000000",
            surface: "#0a0a0a",
            foreground: "#22c55e",
            muted: "#16a34a",
            border: "#14532d",
            primary: "#22c55e",
            "primary-hover": "#4ade80",
            accent: "#86efac",
            "hero-bg": "#000000",
        },
    },
    {
        id: "bubblegum",
        label: "Bubblegum",
        vars: {
            background: "#faf5ff",
            surface: "#f3e8ff",
            foreground: "#3b0764",
            muted: "#7e22ce",
            border: "#d8b4fe",
            primary: "#9333ea",
            "primary-hover": "#a855f7",
            accent: "#ec4899",
            "hero-bg": "#f3e8ff",
        },
    },
];

/**
 * <html> にインラインで CSS カスタムプロパティを設定する。
 * globals.css の :root 定義より優先されるため、サイト全体の配色が即座に切り替わる。
 */
export function applySiteTheme(theme: SiteTheme) {
    const root = document.documentElement.style;
    for (const [key, value] of Object.entries(theme.vars)) {
        root.setProperty(`--${key}`, value);
    }
}

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
    /** primary色の円やボタンの上に乗る文字専用の色（背景色と同化しないよう独立させている） */
    "on-primary": string;
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
            "on-primary": "#f8fafc",
        },
    },
    {
        id: "sunset",
        label: "Sunset",
        vars: {
            background: "#ffffff",
            surface: "#fff1e6",
            foreground: "#451a03",
            muted: "#9a3412",
            border: "#fed7aa",
            primary: "#dc2626",
            "primary-hover": "#ef4444",
            accent: "#f59e0b",
            "hero-bg": "#fff1e6",
            "on-primary": "#ffffff",
        },
    },
    {
        id: "terminal",
        label: "Terminal",
        vars: {
            background: "#000000",
            surface: "#0a0a0a",
            foreground: "#d1fae5",
            muted: "#4ade80",
            border: "#14532d",
            primary: "#16a34a",
            "primary-hover": "#22c55e",
            accent: "#4ade80",
            "hero-bg": "#000000",
            "on-primary": "#f0fdf4",
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
            "on-primary": "#ffffff",
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

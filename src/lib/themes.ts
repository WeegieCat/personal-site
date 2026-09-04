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
    /** accent色の円やボタンの上に乗る文字専用の色。黄色系など明度の高いaccentでは白文字が読めなくなるため独立させている */
    "on-accent": string;
}

export interface SiteTheme {
    id: string;
    label: string;
    vars: SiteThemeVars;
    /**
     * Trie Bonsaiの発光ノードに使うグラデーション。2色以上を指定でき、
     * 実際の trie-bonsai (SceneContent.tsx) の nodeGradientPreset と
     * 同じ考え方で、深さに応じて等分に補間する。
     */
    bonsaiGradient: readonly string[];
}

/** 右下のキューブバッジをクリックするたびにこの順で切り替わる */
export const SITE_THEMES: SiteTheme[] = [
    {
        id: "default",
        label: "Default",
        vars: {
            background: "#f3f7e6",
            surface: "#fbfdf3",
            foreground: "#182b12",
            muted: "#5c6b52",
            border: "#d7e3b4",
            primary: "#2e7d32",
            "primary-hover": "#3f9b45",
            accent: "#dc9b18",
            "hero-bg": "#f3f7e6",
            "on-primary": "#111111",
            "on-accent": "#182b12",
        },
        bonsaiGradient: ["#d4fc79", "#96e6a1"],
    },
    {
        id: "midnight",
        label: "Midnight",
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
            "on-accent": "#ffffff",
        },
        bonsaiGradient: ["#d4fc79", "#96e6a1"],
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
            "on-primary": "#111111",
            "on-accent": "#ffffff",
        },
        bonsaiGradient: ["#d4fc79", "#96e6a1"],
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
            "on-accent": "#ffffff",
        },
        bonsaiGradient: ["#d4fc79", "#96e6a1"],
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
            "on-primary": "#111111",
            "on-accent": "#ffffff",
        },
        bonsaiGradient: ["#d4fc79", "#96e6a1"],
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

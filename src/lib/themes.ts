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
        },
        bonsaiGradient: ["#d4fc79", "#96e6a1"],
    },
    {
        id: "default",
        label: "Default",
        vars: {
            background: "#ffffff",
            surface: "#ecfeff",
            foreground: "#0f172a",
            muted: "#64748b",
            border: "#e2e8f0",
            // 木のmochiHoppeプリセット（黄・シアン・ピンク）をサイト全体の
            // テーマカラーとして使う。背景が白なので on-primary は常に
            // 濃い色でよく、primary/accent自体は元の鮮やかな色をそのまま使える
            primary: "#00f3ff",
            "primary-hover": "#00c2d1",
            accent: "#ff70a7",
            "hero-bg": "#f0fdff",
            "on-primary": "#111111",
        },
        // 木の発光ノードは全テーマ共通でdustyGrassに統一
        bonsaiGradient: ["#d4fc79", "#96e6a1"],
    },
    {
        id: "midnight",
        label: "Midnight",
        // 以前 Default テーマだった黒＋青の配色を独立したテーマとして復活させたもの
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

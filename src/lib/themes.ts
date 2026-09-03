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
        // 実際のtrie-bonsaiの "mochiHoppe" プリセットそのまま（黄→シアン→ピンク）
        bonsaiGradient: ["#fff446", "#00f3ff", "#ff70a7"],
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
        bonsaiGradient: ["#dc2626", "#f59e0b"],
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
        bonsaiGradient: ["#16a34a", "#4ade80"],
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
        },
        bonsaiGradient: ["#9333ea", "#ec4899"],
    },
];

/**
 * キューブバッジの立方体6面（3色×対面複製）に使う色を、そのテーマの
 * bonsaiGradient から作る。木のグラデーションとキューブの見た目を揃えることで、
 * 「このテーマを選ぶと木も色も変わる」ことが一目でわかるようにしている。
 * bonsaiGradient が2色しかないテーマは1色目を繰り返して3色にする。
 */
export function cubeColorsFromTheme(theme: SiteTheme): readonly [string, string, string] {
    const [c0, c1, c2] = theme.bonsaiGradient;
    if (c2 !== undefined) return [c0, c1, c2];
    if (c1 !== undefined) return [c0, c1, c0];
    return [theme.vars.primary, theme.vars.accent, theme.vars["primary-hover"]];
}

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

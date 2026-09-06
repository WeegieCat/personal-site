/**
 * Works に並べるプロジェクト
 */
export interface Project {
    id: string;
    /** /works/[slug] のURLに使う */
    slug: string;
    title: string;
    description: string;
    image?: string;
    tags: string[];
    /** 公開URL（外部サイト） */
    link?: string;
    github?: string;
    /**
     * サイト内に埋め込む場合の配信元URL。
     * 指定すると /works/[slug] に iframe 埋め込みが表示される。
     */
    embedUrl?: string;
    featured?: boolean;
    year?: number;
}

/**
 * ブログ記事の frontmatter
 */
export interface BlogPostMeta {
    slug: string;
    title: string;
    description: string;
    /** ISO 8601 (YYYY-MM-DD) */
    date: string;
    tags: string[];
    draft?: boolean;
}

/**
 * 習熟度。細かい数値に客観的な根拠は置けないので3段階に丸める。
 * 3=自信あり / 2=制作で常用 / 1=実装経験あり（対応する表示は SkillMeters の LEVEL_STEPS）
 */
export type SkillLevel = 1 | 2 | 3;

/**
 * Skills & Expertise の1項目
 */
export interface Skill {
    name: string;
    level: SkillLevel;
}

/**
 * Skills & Expertise のカテゴリ1枚分（カード1枚に対応）
 */
export interface SkillCategory {
    category: string;
    items: Skill[];
}

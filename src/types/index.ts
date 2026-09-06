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
 * Skills & Expertise の1項目。
 * level は 0〜100 の自己申告の習熟度で、スライダーの塗り幅と段階ラベルを決める。
 */
export interface Skill {
    name: string;
    /** 0〜100 */
    level: number;
}

/**
 * Skills & Expertise のカテゴリ1枚分（カード1枚に対応）
 */
export interface SkillCategory {
    category: string;
    items: Skill[];
}

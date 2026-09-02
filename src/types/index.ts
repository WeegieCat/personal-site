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

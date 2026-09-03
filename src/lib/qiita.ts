const QIITA_USERNAME = "feynman_1729";

interface QiitaApiTag {
    name: string;
}

interface QiitaApiItem {
    title: string;
    url: string;
    created_at: string;
    tags: QiitaApiTag[];
}

export interface QiitaArticle {
    title: string;
    url: string;
    /** ISO 8601 (YYYY-MM-DD)。BlogPostMeta.date と同じ形式に揃えている */
    date: string;
    tags: string[];
}

/**
 * Qiitaの公開記事一覧を取得する。ビルド時（next build）にのみ実行される。
 * 静的出力なので実行時にAPIへは一切アクセスしない。
 * 取得に失敗しても記事0件として扱い、ビルド自体は落とさない。
 */
export async function getQiitaArticles(): Promise<QiitaArticle[]> {
    try {
        const res = await fetch(
            `https://qiita.com/api/v2/users/${QIITA_USERNAME}/items?per_page=20`
        );
        if (!res.ok) return [];

        const items: QiitaApiItem[] = await res.json();
        return items.map((item) => ({
            title: item.title,
            url: item.url,
            date: item.created_at.slice(0, 10),
            tags: item.tags.map((tag) => tag.name),
        }));
    } catch {
        return [];
    }
}

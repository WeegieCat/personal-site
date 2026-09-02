import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { BlogPostMeta } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

/** 記事の frontmatter を検証しつつ BlogPostMeta に変換する */
function toMeta(slug: string, data: Record<string, unknown>): BlogPostMeta {
    return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        draft: Boolean(data.draft),
    };
}

/** 公開記事を新しい順で返す（ビルド時にのみ実行される） */
export function getAllPosts(): BlogPostMeta[] {
    if (!fs.existsSync(BLOG_DIR)) return [];

    return fs
        .readdirSync(BLOG_DIR)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => {
            const slug = file.replace(/\.mdx$/, "");
            const source = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
            return toMeta(slug, matter(source).data);
        })
        .filter((post) => !post.draft)
        .sort((a, b) => b.date.localeCompare(a.date));
}

/** 1件の記事の frontmatter と本文を返す。存在しなければ null */
export function getPost(
    slug: string
): { meta: BlogPostMeta; content: string } | null {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    return { meta: toMeta(slug, data), content };
}

import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { getAllPosts } from "@/lib/blog";
import { getQiitaArticles } from "@/lib/qiita";

export const metadata: Metadata = {
    title: "Blog",
    description: "Web開発や技術についての記事",
};

interface BlogListItem {
    key: string;
    title: string;
    date: string;
    tags: string[];
    href: string;
    external: boolean;
    description?: string;
}

// output: "export" のビルド時に一度だけ Qiita API を叩き、結果を静的HTMLへ焼き込む
export default async function BlogPage() {
    const localPosts = getAllPosts();
    const qiitaArticles = await getQiitaArticles();

    const items: BlogListItem[] = [
        ...localPosts.map((post) => ({
            key: `local-${post.slug}`,
            title: post.title,
            date: post.date,
            tags: post.tags,
            href: `/blog/${post.slug}`,
            external: false,
            description: post.description,
        })),
        ...qiitaArticles.map((article) => ({
            key: `qiita-${article.url}`,
            title: article.title,
            date: article.date,
            tags: article.tags,
            href: article.url,
            external: true,
        })),
    ].sort((a, b) => b.date.localeCompare(a.date));

    return (
        <Container className='py-16'>
            <header className='mb-12'>
                <h1 className='mb-4 text-4xl font-bold sm:text-5xl'>Blog</h1>
                <p className='text-lg text-muted'>
                    Web開発や技術について書いたものの置き場。Qiitaに投稿した記事もあわせて掲載している。
                </p>
            </header>

            {items.length === 0 ? (
                <p className='text-muted'>まだ記事がありません。</p>
            ) : (
                <ul className='space-y-8'>
                    {items.map((item) => (
                        <li
                            key={item.key}
                            className='border-b border-border pb-8 last:border-0'>
                            <article>
                                <div className='flex items-center gap-3'>
                                    <time
                                        dateTime={item.date}
                                        className='text-sm text-muted'>
                                        {item.date}
                                    </time>
                                    {item.external && (
                                        <span className='inline-flex items-center rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-muted'>
                                            Qiita
                                        </span>
                                    )}
                                </div>
                                <h2 className='mt-2 mb-2 text-2xl font-bold'>
                                    {item.external ? (
                                        <a
                                            href={item.href}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='hv-underline'>
                                            {item.title} ↗
                                        </a>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className='hv-underline'>
                                            {item.title}
                                        </Link>
                                    )}
                                </h2>
                                {item.description && (
                                    <p className='mb-3 text-muted'>
                                        {item.description}
                                    </p>
                                )}
                                <div className='flex flex-wrap gap-2'>
                                    {item.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className='inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted'>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
}

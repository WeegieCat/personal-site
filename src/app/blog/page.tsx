import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { getQiitaArticles } from "@/lib/qiita";

export const metadata: Metadata = {
    title: "Blog",
    description: "Web開発や技術についての記事",
};

// output: "export" のビルド時に一度だけ Qiita API を叩き、結果を静的HTMLへ焼き込む
export default async function BlogPage() {
    const articles = await getQiitaArticles();

    return (
        <Container className='py-16'>
            <header className='mb-12'>
                <h1 className='mb-4 text-4xl font-bold sm:text-5xl'>Blog</h1>
                <p className='text-lg text-muted'>

                </p>
            </header>

            {articles.length === 0 ? (
                <p className='text-muted'>まだ記事がありません。</p>
            ) : (
                <ul className='space-y-8'>
                    {articles.map((article) => (
                        <li
                            key={article.url}
                            className='border-b border-border pb-8 last:border-0'>
                            <article>
                                <div className='flex items-center gap-3'>
                                    <time
                                        dateTime={article.date}
                                        className='text-sm text-muted'>
                                        {article.date}
                                    </time>
                                    <span className='inline-flex items-center rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-muted'>
                                        Qiita
                                    </span>
                                </div>
                                <h2 className='mt-2 mb-2 text-2xl font-bold'>
                                    <a
                                        href={article.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='hv-underline'>
                                        {article.title} ↗
                                    </a>
                                </h2>
                                <div className='flex flex-wrap gap-2'>
                                    {article.tags.map((tag) => (
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

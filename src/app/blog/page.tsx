import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
    title: "Blog",
    description: "Web開発や技術についての記事",
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <Container className='py-16'>
            <header className='mb-12'>
                <h1 className='mb-4 text-4xl font-bold sm:text-5xl'>Blog</h1>
                <p className='text-lg text-muted'>
                    Web開発や技術について書いたものの置き場。
                </p>
            </header>

            {posts.length === 0 ? (
                <p className='text-muted'>まだ記事がありません。</p>
            ) : (
                <ul className='space-y-8'>
                    {posts.map((post) => (
                        <li
                            key={post.slug}
                            className='border-b border-border pb-8 last:border-0'>
                            <article>
                                <time
                                    dateTime={post.date}
                                    className='text-sm text-muted'>
                                    {post.date}
                                </time>
                                <h2 className='mt-2 mb-2 text-2xl font-bold'>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className='transition-colors hover:text-primary'>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className='mb-3 text-muted'>
                                    {post.description}
                                </p>
                                <div className='flex flex-wrap gap-2'>
                                    {post.tags.map((tag) => (
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

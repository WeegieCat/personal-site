import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Container from "@/components/ui/Container";
import { getAllPosts, getPost } from "@/lib/blog";

interface Params {
    params: Promise<{ slug: string }>;
}

// output: "export" では全記事を事前に列挙する必要がある
export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return {};

    return {
        title: post.meta.title,
        description: post.meta.description,
    };
}

export default async function BlogPostPage({ params }: Params) {
    const { slug } = await params;
    const post = getPost(slug);

    if (!post) notFound();

    return (
        <Container className='py-16'>
            <Link
                href='/blog'
                className='hv-underline mb-8 inline-block text-sm text-muted'>
                ← Blog に戻る
            </Link>

            <article>
                <header className='mb-8 border-b border-border pb-8'>
                    <time
                        dateTime={post.meta.date}
                        className='text-sm text-muted'>
                        {post.meta.date}
                    </time>
                    <h1 className='mt-2 mb-4 text-4xl font-bold'>
                        {post.meta.title}
                    </h1>
                    <div className='flex flex-wrap gap-2'>
                        {post.meta.tags.map((tag) => (
                            <span
                                key={tag}
                                className='inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted'>
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div className='article'>
                    <MDXRemote source={post.content} />
                </div>
            </article>
        </Container>
    );
}

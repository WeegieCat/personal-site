import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import ProductEmbed from "@/components/works/ProductEmbed";
import BonsaiPreview from "@/three/canvas/BonsaiPreview";
import { projects } from "@/content/projects";

interface Params {
    params: Promise<{ slug: string }>;
}

// output: "export" では全ページを事前に列挙する必要がある
export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return {};

    return {
        title: project.title,
        description: project.description,
    };
}

export default async function WorkDetailPage({ params }: Params) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) notFound();

    return (
        <Container size='wide' className='py-16'>
            <Link
                href='/works'
                className='hv-underline mb-8 inline-block text-sm text-muted'>
                ← Works に戻る
            </Link>

            <header className='mb-8'>
                <h1 className='mb-4 text-4xl font-bold'>{project.title}</h1>
                <p className='mb-4 text-lg text-muted'>{project.description}</p>

                <div className='flex flex-wrap gap-2'>
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className='inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted'>
                            {tag}
                        </span>
                    ))}
                </div>
            </header>

            {project.slug === "trie-bonsai" ? (
                <div className='relative mb-8 h-80 overflow-hidden rounded-lg border border-border bg-surface sm:h-96'>
                    <BonsaiPreview className='h-full w-full' />
                </div>
            ) : (
                project.image && (
                    <div className='relative mb-8 h-80 overflow-hidden rounded-lg border border-border bg-surface sm:h-96'>
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes='(max-width: 1200px) 100vw, 1024px'
                            className='object-cover'
                        />
                    </div>
                )
            )}

            {/* embedUrl を持つプロダクトはこの場で動かせる */}
            {project.embedUrl && (
                <ProductEmbed src={project.embedUrl} title={project.title} />
            )}

            {(project.link || project.github) && (
                <div className='mt-8 flex gap-4'>
                    {project.link && (
                        <a
                            href={project.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover'>
                            サイトを開く
                        </a>
                    )}
                    {project.github && (
                        <a
                            href={project.github}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='rounded-lg border border-border px-6 py-3 font-medium transition-colors hover:bg-surface'>
                            GitHub
                        </a>
                    )}
                </div>
            )}
        </Container>
    );
}

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import BonsaiPreview from "@/three/canvas/BonsaiPreview";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article className='group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background transition-shadow duration-300 hover:shadow-lg'>
            {project.slug === "trie-bonsai" ? (
                <Link
                    href={`/works/${project.slug}`}
                    className='relative block h-48 shrink-0 overflow-hidden bg-surface'>
                    <BonsaiPreview className='h-full w-full' />
                </Link>
            ) : (
                project.image && (
                    <Link
                        href={`/works/${project.slug}`}
                        className='relative block h-48 shrink-0 overflow-hidden bg-surface'>
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            className='object-contain transition-transform duration-300 group-hover:scale-105'
                        />
                    </Link>
                )
            )}

            {/* flex-1 + 下の mt-auto で、カードごとに説明文・タグの行数が
                違ってもボタン行が常に下端に揃うようにしている */}
            <div className='flex flex-1 flex-col p-6'>
                <h3 className='mb-2 text-lg font-bold'>{project.title}</h3>
                <p className='mb-4 line-clamp-3 text-sm text-muted'>
                    {project.description}
                </p>

                <div className='mb-4 flex flex-wrap gap-2'>
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className='inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted'>
                            {tag}
                        </span>
                    ))}
                </div>

                {(project.link || project.github) && (
                    <div className='mt-auto flex gap-3 border-t border-border pt-4'>
                        {project.link && (
                            <a
                                href={project.link}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex-1 rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-primary-hover'>
                                View Project
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex-1 rounded-lg border border-border px-4 py-2 text-center text-sm font-medium transition-colors hover:bg-surface'>
                                GitHub
                            </a>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}

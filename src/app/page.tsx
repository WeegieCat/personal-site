import Link from "next/link";
import Container from "@/components/ui/Container";
import Hero from "@/components/home/Hero";
import ProjectCard from "@/components/works/ProjectCard";
import { featuredProjects, skills } from "@/content/projects";
import { affiliation, bio } from "@/content/profile";
import { SITE_NAME } from "@/lib/site";

// Header / Footer は app/layout.tsx が描画するのでここでは呼ばない
export default function HomePage() {
    return (
        <>
            <Hero />

            <section id='hero-next' className='py-20'>
                <Container size='default'>
                    <h2 className='mb-2 text-4xl font-bold sm:text-5xl'>
                        About {SITE_NAME}
                    </h2>
                    <p className='mb-4 text-lg text-muted'>{affiliation}</p>
                    <p className='leading-relaxed text-foreground'>{bio}</p>
                </Container>
            </section>

            <section className='bg-surface py-20'>
                <Container size='wide'>
                    <div className='mb-16 text-center'>
                        <h2 className='mb-4 text-4xl font-bold sm:text-5xl'>
                            Featured Projects
                        </h2>
                        <p className='text-lg text-muted'>
                            計画と実装の両面から、課題解決に取り組んだプロダクトです。
                        </p>
                    </div>

                    <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    <div className='text-center'>
                        <Link
                            href='/works'
                            className='hv-underline font-semibold text-primary'>
                            すべてのプロジェクトを見る →
                        </Link>
                    </div>
                </Container>
            </section>

            <section className='py-20'>
                <Container size='wide'>
                    <div className='mb-16 text-center'>
                        <h2 className='mb-4 text-4xl font-bold sm:text-5xl'>
                            Skills &amp; Expertise
                        </h2>
                        <p className='text-lg text-muted'>
                            要件に応じて選定した技術スタックで、実装から運用まで一貫して担当します。
                        </p>
                    </div>

                    <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                        {Object.entries(skills).map(([category, items]) => (
                            <div
                                key={category}
                                className='rounded-lg border border-border p-8'>
                                <h3 className='mb-6 text-2xl font-bold'>
                                    {category}
                                </h3>
                                <ul className='space-y-3'>
                                    {items.map((skill) => (
                                        <li
                                            key={skill}
                                            className='flex items-center text-muted'>
                                            <span className='mr-3 h-2 w-2 rounded-full bg-primary' />
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </>
    );
}

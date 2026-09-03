import Link from "next/link";
import Container from "@/components/ui/Container";
import Hero from "@/components/home/Hero";
import ProjectCard from "@/components/works/ProjectCard";
import { featuredProjects, skills } from "@/content/projects";

// Header / Footer は app/layout.tsx が描画するのでここでは呼ばない
export default function HomePage() {
    return (
        <>
            <Hero />

            <section id='hero-next' className='bg-surface py-20'>
                <Container size='wide'>
                    <div className='mb-16 text-center'>
                        <h2 className='mb-4 text-4xl font-bold sm:text-5xl'>
                            Featured Projects
                        </h2>
                    </div>

                    <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    <div className='text-center'>
                        <Link
                            href='/works'
                            className='inline-block border-b-2 border-primary px-8 py-3 font-semibold text-primary'>
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
                            幅広い技術スタックと開発経験を持ちます。
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

            <section className='bg-gradient-to-r from-primary to-accent py-20'>
                <Container className='text-center text-white'>
                    <h2 className='mb-6 text-4xl font-bold sm:text-5xl'>
                        一緒にプロジェクトを作りませんか？
                    </h2>
                    <p className='mb-8 text-xl text-white/80'>
                        新しいプロジェクト、改善提案、協業のお誘い。お気軽にお問い合わせください。
                    </p>
                    <Link
                        href='/inquiry'
                        className='inline-block rounded-lg bg-white px-8 py-3 font-semibold text-primary transition-opacity hover:opacity-90'>
                        お問い合わせはこちら
                    </Link>
                </Container>
            </section>
        </>
    );
}

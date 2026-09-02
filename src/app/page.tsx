import Link from "next/link";
import Container from "@/components/ui/Container";
import Preloader from "@/components/ui/Preloader";
import ProjectCard from "@/components/works/ProjectCard";
import HeroCanvas from "@/three/canvas/HeroCanvas";
import { featuredProjects, skills } from "@/content/projects";

// Header / Footer は app/layout.tsx が描画するのでここでは呼ばない
export default function HomePage() {
    return (
        <>
            {/* ローディング演出はトップページだけに出す */}
            <Preloader />
            <section className='py-20'>
                <Container size='wide'>
                    <div className='grid items-center gap-12 md:grid-cols-2'>
                        <div className='animate-fade'>
                            <h1 className='mb-6 text-5xl font-bold sm:text-6xl'>
                                <span className='gradient-text'>
                                    Web Engineer
                                </span>
                                <br />
                                <span>&amp; Creative Developer</span>
                            </h1>

                            <p className='mb-8 text-lg leading-relaxed text-muted'>
                                Next.js、TypeScript、Tailwind CSS
                                を使った高速で拡張性の高いウェブサイト・アプリケーション開発。
                                Cloudflare Workers
                                でのサーバーレス実装も得意です。
                            </p>

                            <div className='flex flex-col gap-4 sm:flex-row'>
                                <Link
                                    href='/works'
                                    className='rounded-lg bg-primary px-8 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-hover'>
                                    プロジェクトを見る
                                </Link>
                                <Link
                                    href='/inquiry'
                                    className='rounded-lg border border-border px-8 py-3 text-center font-semibold transition-colors hover:bg-surface'>
                                    お問い合わせ
                                </Link>
                            </div>
                        </div>

                        <HeroCanvas className='h-72 w-full md:h-96' />
                    </div>
                </Container>
            </section>

            <section className='bg-surface py-20'>
                <Container size='wide'>
                    <div className='mb-16 text-center'>
                        <h2 className='mb-4 text-4xl font-bold sm:text-5xl'>
                            Featured Projects
                        </h2>
                        <p className='text-lg text-muted'>
                            最新の技術スタックで実装した注目プロジェクト。
                        </p>
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

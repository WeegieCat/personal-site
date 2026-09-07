import Link from "next/link";
import Container from "@/components/ui/Container";
import Hero from "@/components/home/Hero";
import ProjectCard from "@/components/works/ProjectCard";
import SkillMeters from "@/components/home/SkillMeters";
import { featuredProjects, skills } from "@/content/projects";
import { affiliation, bio } from "@/content/profile";

// Header / Footer は app/layout.tsx が描画するのでここでは呼ばない
export default function HomePage() {
    return (
        <>
            <Hero />

            {/*
             * ヒーロー(bg-hero-bg)との境目に直線が出るため、About側の上端で
             * hero-bg から background へ徐々に落として境目を消す。
             * ヒーロー側に要素を足すとヒーロー内の高さ計算に影響するので、
             * 処理はこちら（後続セクション）に持たせている。
             */}
            <section
                id='hero-next'
                className='bg-[linear-gradient(to_bottom,var(--hero-bg),var(--background)_240px)] py-20'>
                <Container size='default'>
                    <h2 className='mb-2 text-4xl font-bold sm:text-5xl'>
                        About Me
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
                            計画と実装の両面から、課題解決に取り組んだプロダクトです
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
                        <h2 className='text-4xl font-bold sm:text-5xl'>
                            Skills &amp; Expertise
                        </h2>
                    </div>

                    <SkillMeters categories={skills} />
                </Container>
            </section>
        </>
    );
}

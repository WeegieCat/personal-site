import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import CodeRise, { PAGE_CODE_RISE } from "@/components/ui/CodeRise";
import ProjectCard from "@/components/works/ProjectCard";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
    title: "Works",
    description: "これまでに手がけたプロジェクトとプロダクトの一覧",
};

export default function WorksPage() {
    return (
        <>
            {/*
             * ヒーローと同じコード上昇の演出を、通常ページ用に本数を減らし
             * ゆっくりにして敷く。ページ全体の背景にしたいので fixed。
             * -z-10 でも body の背景（canvas に伝播する）より手前に描画される。
             */}
            <CodeRise
                className='fixed inset-0 -z-10'
                count={PAGE_CODE_RISE.count}
                minDuration={PAGE_CODE_RISE.minDuration}
                durationSpan={PAGE_CODE_RISE.durationSpan}
                opacity={PAGE_CODE_RISE.opacity}
            />

            <Container size='wide' className='py-16'>
                <header className='mb-12'>
                    <h1 className='mb-4 text-4xl font-bold sm:text-5xl'>
                        Works
                    </h1>
                    <p className='text-lg text-muted'>
                        これまでに作ったプロダクトとプロジェクト
                    </p>
                </header>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </Container>
        </>
    );
}

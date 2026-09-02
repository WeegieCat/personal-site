import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProjectCard from "@/components/works/ProjectCard";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
    title: "Works",
    description: "これまでに手がけたプロジェクトとプロダクトの一覧",
};

export default function WorksPage() {
    return (
        <Container size='wide' className='py-16'>
            <header className='mb-12'>
                <h1 className='mb-4 text-4xl font-bold sm:text-5xl'>Works</h1>
                <p className='text-lg text-muted'>
                    これまでに作ったプロダクトとプロジェクト。
                </p>
            </header>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </Container>
    );
}

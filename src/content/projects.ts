import { Project } from "@/types";

/**
 * Works 一覧の元データ。
 * 将来サイト内に埋め込むプロダクトは embedPath を指定すると
 * /works/[slug] に埋め込みビューが生成される。
 */
export const projects: Project[] = [
    {
        id: "1",
        slug: "e-commerce-platform",
        title: "E-Commerce Platform",
        description:
            "Next.js + Tailwind CSS + TypeScript で構築した高速なECサイト。Cloudflare Workers でバックエンド処理を実装。",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare"],
        featured: true,
        year: 2025,
    },
    {
        id: "2",
        slug: "realtime-chat",
        title: "Real-time Chat Application",
        description:
            "WebSocket を使用したリアルタイムチャットアプリケーション。React + Node.js で実装し、数千のコネクションを処理可能。",
        tags: ["React", "Node.js", "WebSocket", "MongoDB"],
        featured: true,
        year: 2025,
    },
    {
        id: "3",
        slug: "design-system",
        title: "Design System Component Library",
        description:
            "再利用可能な UI コンポーネントライブラリ。Storybook で管理し、Tailwind CSS で統一されたデザイン。",
        tags: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
        featured: true,
        year: 2024,
    },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const skills = {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Three Fiber"],
    Backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST API"],
    "Tools & Deployment": ["Git", "Docker", "Cloudflare Workers", "GitHub"],
} as const;

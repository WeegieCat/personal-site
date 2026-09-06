import { Project, SkillCategory } from "@/types";

/**
 * Works 一覧の元データ。
 * 将来サイト内に埋め込むプロダクトは embedPath を指定すると
 * /works/[slug] に埋め込みビューが生成される。
 */
export const projects: Project[] = [
    {
        id: "trie-bonsai",
        slug: "trie-bonsai",
        title: "Trie Bonsai",
        description:
            "入力文字列をトライ木・パトリシア木・接尾辞木の3種類から選択して解析し、3Dの盆栽風アート作品として可視化するWebプロダクト。作品の保存・共有・ギャラリー閲覧機能を備える。150人規模のサークルが開催した個人制作クリエイタソンで2位を受賞。",
        tags: [
            "Next.js",
            "React Three Fiber",
            "TypeScript",
            "Zustand",
            "Cloudflare",
            "Hono",
        ],
        link: "https://2939976d.trie-bonsai.pages.dev/",
        github: "https://github.com/WeegieCat/trie-bonsai",
        featured: true,
        year: 2026,
    },
    {
        id: "aruke-ru",
        slug: "aruke-ru",
        title: "アルケール",
        image: "/images/demo.gif",
        description:
            "車イス利用者・高齢者・ランナーなど7属性の多様なニーズに合わせ、最適な経路を提案する歩行者向け地図アプリ。開発未経験者を含む4人チームのリーダー兼バックエンド・PM担当として牽引した。第13回e-ZUKAスマートアプリコンテスト2024 トヨタ自動車九州株式会社賞、九州アプリチャレンジ・キャラバン 特別賞を受賞。",
        tags: ["Flutter", "Firebase", "Google Maps Platform"],
        link: "https://aruke-ru-v2.web.app/",
        github: "https://github.com/giant-shrimp/Chikuhou_frontend",
        featured: true,
        year: 2024,
    },
];

export const featuredProjects = projects.filter((p) => p.featured);

/**
 * Skills & Expertise のスライダー。
 * level は 3=自信あり / 2=制作で常用 / 1=実装経験あり の3段階（SkillLevel）。
 * カード内は level の降順で並べる。
 */
export const skills: SkillCategory[] = [
    {
        category: "Languages",
        items: [
            { name: "TypeScript", level: 3 },
            { name: "JavaScript", level: 3 },
            { name: "C++", level: 3 },
            { name: "Dart", level: 1 },
            { name: "Python", level: 1 },
            { name: "C", level: 1 },
        ],
    },
    {
        category: "Frameworks & Libraries",
        items: [
            { name: "Next.js", level: 3 },
            { name: "React", level: 3 },
            { name: "Tailwind CSS", level: 2 },
            { name: "React Three Fiber", level: 2 },
            { name: "Flutter", level: 2 },
            { name: "Zustand", level: 2 },
            { name: "Hono", level: 1 },
            { name: "Drizzle ORM", level: 1 },
        ],
    },
    {
        category: "Infra & Platforms",
        items: [
            { name: "Cloudflare (Workers/R2/D1)", level: 2 },
            { name: "Firebase", level: 1 },
            { name: "Google Maps Platform", level: 1 },
            { name: "Arduino", level: 1 },
        ],
    },
];

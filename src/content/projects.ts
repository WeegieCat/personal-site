import { Project } from "@/types";

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

export const skills = {
    Languages: ["TypeScript", "JavaScript", "Dart", "C++", "Python", "C"],
    "Frameworks & Libraries": [
        "Next.js",
        "React",
        "React Three Fiber",
        "Zustand",
        "Tailwind CSS",
        "Flutter",
        "Hono",
        "Drizzle ORM",
    ],
    "Infra & Platforms": [
        "Cloudflare (Workers/R2/D1)",
        "Firebase",
        "Google Maps Platform",
        "Arduino",
    ],
} as const;

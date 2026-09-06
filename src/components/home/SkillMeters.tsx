"use client";

import { useEffect, useRef, useState } from "react";
import type { SkillCategory, SkillLevel } from "@/types";

/**
 * 3段階の習熟度と、ラベル・塗り幅の対応表。
 * 塗り幅だけでは「満タンが何を意味するのか」が読み手に伝わらないため、
 * バーの横には必ずラベルを出す。
 */
const LEVEL_STEPS: Record<SkillLevel, { label: string; width: string }> = {
    3: { label: "主戦力", width: "100%" },
    2: { label: "制作で常用", width: "66%" },
    1: { label: "実装経験あり", width: "33%" },
};

interface SkillMetersProps {
    categories: SkillCategory[];
}

export default function SkillMeters({ categories }: SkillMetersProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    // 画面に入るまで幅0で待たせ、入った瞬間に level まで伸ばす。
    // モーションを抑える設定では motion-reduce:transition-none で即座に確定させる
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setRevealed(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={rootRef}
            className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {categories.map((category) => (
                <div
                    key={category.category}
                    className='rounded-lg border border-border p-8'>
                    <h3 className='mb-6 text-2xl font-bold'>
                        {category.category}
                    </h3>
                    <ul className='space-y-5'>
                        {category.items.map((skill, index) => (
                            <li key={skill.name}>
                                <div className='mb-2 flex items-baseline justify-between gap-3'>
                                    <span className='text-sm font-medium'>
                                        {skill.name}
                                    </span>
                                    <span className='shrink-0 font-mono text-xs text-muted'>
                                        {LEVEL_STEPS[skill.level].label}
                                    </span>
                                </div>
                                <div
                                    role='progressbar'
                                    aria-label={skill.name}
                                    aria-valuemin={1}
                                    aria-valuemax={3}
                                    aria-valuenow={skill.level}
                                    aria-valuetext={
                                        LEVEL_STEPS[skill.level].label
                                    }
                                    className='h-2 w-full overflow-hidden rounded-full bg-border'>
                                    <div
                                        className='h-full rounded-full bg-linear-to-r from-primary to-accent transition-[width] duration-1000 ease-out motion-reduce:transition-none'
                                        style={{
                                            width: revealed
                                                ? LEVEL_STEPS[skill.level]
                                                      .width
                                                : "0%",
                                            // カード内で上から順に伸びていくよう少しずつ遅らせる
                                            transitionDelay: `${index * 80}ms`,
                                        }}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

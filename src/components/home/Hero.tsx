"use client";

import { useRef } from "react";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { SITE_NAME } from "@/lib/site";

const NAME = SITE_NAME.toUpperCase();

function scrollToNext() {
    document
        .getElementById("hero-next")
        ?.scrollIntoView({ behavior: "smooth" });
}

function ArrowDownIcon() {
    return (
        <svg
            viewBox='0 0 24 24'
            className='mt-1 h-4 w-4'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'>
            <path d='M12 5v14m0 0-5-5m5 5 5-5' />
        </svg>
    );
}

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const wordmarkRef = useRef<HTMLDivElement>(null);
    const interestedRef = useRef<HTMLButtonElement>(null);

    // 数値が大きいほど手前にあるように見える（動く量が大きい）。
    // 右下のキューブバッジはクリックで色を変える操作対象なので、
    // パララックスでは動かさずレイヤーに含めない。
    usePointerParallax(containerRef, [
        { ref: circleRef, strength: 20 },
        { ref: introRef, strength: 12 },
        { ref: wordmarkRef, strength: 28 },
        { ref: interestedRef, strength: 16 },
    ]);

    return (
        <section className='relative overflow-hidden bg-hero-bg'>
            <div
                ref={containerRef}
                className='relative mx-auto min-h-[92vh] w-full max-w-6xl px-6 py-8 sm:px-10 sm:py-12'>
                {/* 左上から画面外へ抜ける円。装飾なので読み上げ対象から外す */}
                <div
                    ref={circleRef}
                    aria-hidden='true'
                    className='absolute -top-[30%] -left-[25%] aspect-square w-[95%] max-w-[620px] rounded-full bg-primary sm:w-[65%]'
                />

                {/* 実際のページ見出しはこちら。視覚的な表現はすべて装飾として下に重ねる */}
                <h1 className='sr-only'>
                    Hi, I&apos;m {SITE_NAME} — a Playful Developer
                </h1>

                <div ref={introRef} className='relative z-10 max-w-xs'>
                    <p className='text-sm font-extrabold tracking-[0.4em] text-white sm:text-base'>
                        {NAME}
                    </p>
                    <p
                        aria-hidden='true'
                        className='mt-6 text-4xl text-white italic sm:text-5xl'>
                        Hi! I&apos;m a
                    </p>
                </div>

                {/*
                 * PLAYFUL DEVELOPER のワードマーク。A/V を三角形、O を顔写真に置き換えた装飾表現。
                 * パララックスの translate は外側の div が担い、静的な -rotate-6 は内側の div に
                 * 分離している（同じ要素に両方を inline transform と Tailwind の transform
                 * ユーティリティで持たせると inline 側が上書きしてしまうため）。
                 */}
                <div
                    ref={wordmarkRef}
                    aria-hidden='true'
                    className='relative z-10 mx-auto mt-20 max-w-4xl sm:mt-28'>
                    <div className='flex -rotate-6 flex-col items-center gap-1'>
                        <div className='flex items-center text-[clamp(3.25rem,14.5vw,6rem)] leading-[0.8] font-black tracking-tight text-on-primary uppercase'>
                            <span>PL</span>
                            <svg
                                viewBox='0 0 100 92'
                                className='mx-[0.08em] inline-block h-[0.75em] w-[0.82em]'>
                                <polygon
                                    points='50,10 10,84 90,84'
                                    strokeWidth='4'
                                    strokeLinejoin='round'
                                    className='fill-accent stroke-foreground'
                                />
                            </svg>
                            <span>YFUL</span>
                        </div>
                        <div className='-mt-[0.08em] flex items-center text-[clamp(3.25rem,14.5vw,6rem)] leading-[0.8] font-black tracking-tight text-on-primary uppercase'>
                            <span>DE</span>
                            <svg
                                viewBox='0 0 100 92'
                                className='mx-[0.08em] inline-block h-[0.75em] w-[0.82em]'>
                                <polygon
                                    points='10,8 90,8 50,82'
                                    strokeWidth='4'
                                    strokeLinejoin='round'
                                    className='fill-primary-hover stroke-foreground'
                                />
                            </svg>
                            <span>EL</span>
                            <span className='hero-photo mx-[0.06em] inline-block h-[0.85em] w-[0.85em] rounded-full border-2 border-foreground' />
                            <span>PER</span>
                        </div>
                    </div>
                </div>

                <button
                    ref={interestedRef}
                    type='button'
                    onClick={scrollToNext}
                    className='relative z-10 mx-auto mt-32 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-accent text-center text-on-accent shadow-lg transition-transform hover:scale-105 sm:mt-10 sm:h-44 sm:w-44'>
                    <span className='text-sm font-semibold sm:text-lg'>
                        Interested?
                    </span>
                    <span className='text-xs sm:text-base'>scroll down</span>
                    <ArrowDownIcon />
                </button>
            </div>
        </section>
    );
}

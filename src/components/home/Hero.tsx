"use client";

import { useRef } from "react";
import { usePointerParallax } from "@/hooks/usePointerParallax";
import { useAutoFitScale } from "@/hooks/useAutoFitScale";
import { useSpaceBelow } from "@/hooks/useSpaceBelow";
import CodeRise from "@/components/ui/CodeRise";
import { SITE_NAME } from "@/lib/site";

const NAME = SITE_NAME.toUpperCase();

// ワードマークのパララックス移動量。左右どちらにも最大この分だけ動くため、
// 自動縮小(useAutoFitScale)の安全マージンにもそのまま使う
const WORDMARK_PARALLAX_STRENGTH = 28;

// Interestedボタンの上端を、ビューポート高さのこの比率より上には置かない。
// ワードマークの高さは画面幅で変わるため、下端基準だけだとボタンの高さが
// 幅ごとに大きくばらつく。比率で下限を設けてどの幅でも同じ位置に揃える。
const BUTTON_MIN_TOP_RATIO = 0.73;

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
    const wordmarkScaleRef = useRef<HTMLDivElement>(null);
    const wordmarkContentRef = useRef<HTMLDivElement>(null);
    const interestedRef = useRef<HTMLButtonElement>(null);

    // 数値が大きいほど手前にあるように見える（動く量が大きい）。
    // 右下のキューブバッジはクリックで色を変える操作対象なので、
    // パララックスでは動かさずレイヤーに含めない。
    usePointerParallax(containerRef, [
        { ref: circleRef, strength: 20 },
        { ref: introRef, strength: 12 },
        { ref: wordmarkRef, strength: WORDMARK_PARALLAX_STRENGTH },
        { ref: interestedRef, strength: 16 },
    ]);

    // ワードマークはパララックスで左右に最大WORDMARK_PARALLAX_STRENGTH px動くため、
    // その分の余白(左右合計で2倍)を差し引いた幅に収まらない場合だけ自動で縮小する
    useAutoFitScale(
        wordmarkContentRef,
        wordmarkScaleRef,
        containerRef,
        WORDMARK_PARALLAX_STRENGTH * 2
    );

    // -rotate-6 は見た目だけを回転させ、ドキュメントフロー上の高さには
    // 反映されないため、静的なmarginだけではInterestedボタンがワードマークと
    // 重なることがある。実測した下端より下、かつどの画面幅でもだいたい同じ
    // 高さ（ビューポートの73%あたり）に来るように配置する。
    // gapは0。通常はminTopRatio側が効いて位置が決まり、gapは
    // 「ワードマークが極端に高いときに重ならないための最低保証」として働く。
    useSpaceBelow(wordmarkContentRef, interestedRef, {
        gap: 0,
        containerRef,
        minTopRatio: BUTTON_MIN_TOP_RATIO,
    });

    // section の横方向は clip（hidden ではない）。overflow-x を hidden にすると
    // CSSの仕様で overflow-y の visible が auto に計算され、下へはみ出した
    // コード上昇レイヤーのぶんヒーロー内に縦スクロールバーが出てしまう。
    // clip なら他方の軸は visible のまま保てる。
    return (
        <section className='relative overflow-x-clip bg-hero-bg'>
            <div
                ref={containerRef}
                className='relative mx-auto min-h-[92vh] w-full max-w-6xl px-6 py-8 sm:px-10 sm:py-12'>
                {/* 左上から画面外へ抜ける円。装飾なので読み上げ対象から外す */}
                <div
                    ref={circleRef}
                    aria-hidden='true'
                    className='absolute -top-[30%] -left-[25%] aspect-square w-[95%] max-w-[620px] rounded-full bg-primary sm:w-[65%]'
                />

                {/*
                 * 背景の「コードが炎のように立ち上る」演出。
                 * 描画範囲はヒーロー最上部からセクション外（Aboutの手前）まで。
                 * 密度・速度の既定値がそのままヒーローの見た目になる。
                 */}
                <CodeRise className='absolute inset-x-0 top-0 bottom-[-8rem]' />

                {/* 実際のページ見出しはこちら。視覚的な表現はすべて装飾として下に重ねる */}
                <h1 className='sr-only'>
                    Hi, I&apos;m {SITE_NAME} — a Playful Developer
                </h1>

                <div
                    ref={introRef}
                    className='relative z-10 mt-12 max-w-xs sm:mt-16'>
                    <p className='text-sm font-extrabold tracking-[0.4em] text-on-primary sm:text-base'>
                        {NAME}
                    </p>
                    <p
                        aria-hidden='true'
                        className='mt-6 text-4xl font-bold text-on-primary italic sm:text-5xl'>
                        Hi! I&apos;m a
                    </p>
                </div>

                {/*
                 * PLAYFUL DEVELOPER のワードマーク。A/V を三角形、O を顔写真に置き換えた装飾表現。
                 * パララックスの translate は一番外側の div (wordmarkRef) が担い、
                 * 自動縮小の scale は wordmarkScaleRef が、静的な -rotate-6 は
                 * 一番内側の div (wordmarkContentRef) が担う——という3層構造にしている。
                 * 同じ要素に translate/scale/rotate を inline styleとTailwindの
                 * transformユーティリティで混在させると片方が上書きしてしまうため、
                 * 層ごとに分離している。
                 *
                 * wordmarkContentRef の実測幅（回転込みの見た目上の幅）が、
                 * ヒーローのコンテナ幅からパララックス分の余白を引いた幅を超える
                 * 場合だけ useAutoFitScale が wordmarkScaleRef に scale(...) を
                 * 適用して縮小する（狭い画面でパララックスが動いても画面外に
                 * はみ出さないようにするための保険）。
                 */}
                <div
                    ref={wordmarkRef}
                    aria-hidden='true'
                    className='relative z-10 mx-auto mt-20 max-w-4xl sm:mt-28'>
                    <div ref={wordmarkScaleRef}>
                        <div
                            ref={wordmarkContentRef}
                            className='flex -rotate-6 flex-col items-center gap-1'>
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
                </div>

                <button
                    ref={interestedRef}
                    type='button'
                    onClick={scrollToNext}
                    className='relative z-10 mx-auto mt-32 flex h-[clamp(7rem,20vw,11rem)] w-[clamp(7rem,20vw,11rem)] flex-col items-center justify-center rounded-full bg-accent text-center text-on-accent shadow-lg transition-transform hover:scale-105'>
                    <span className='text-[clamp(0.875rem,2vw,1.125rem)] font-semibold'>
                        Interested?
                    </span>
                    <span className='text-[clamp(0.75rem,1.5vw,1rem)]'>
                        scroll down
                    </span>
                    <ArrowDownIcon />
                </button>
            </div>
        </section>
    );
}

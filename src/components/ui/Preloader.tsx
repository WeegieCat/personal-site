"use client";

import { useEffect, useState } from "react";

export const PRELOADER_SESSION_KEY = "preloader:shown";

/** カウンターが 100 に到達するまでの最短時間 */
const MIN_DURATION = 1400;
/** load イベントが来なくても必ず終わらせる上限 */
const MAX_DURATION = 3000;
/** カーテンが引き上がる時間（globals.css の transition と合わせる） */
const EXIT_DURATION = 800;

type Phase = "counting" | "exiting" | "done";

export default function Preloader() {
    const [progress, setProgress] = useState(0);
    // サーバー描画と初期クライアント描画を一致させるため、常に "counting" から始める。
    // 2回目以降の訪問でチラつかないよう、実際の非表示は
    // layout.tsx のインラインスクリプトが付ける data-preloader="done" と CSS が担う。
    const [phase, setPhase] = useState<Phase>("counting");

    useEffect(() => {
        const root = document.documentElement;

        // このセッションで表示済み、または動きを減らす設定なら演出しない
        const skip =
            root.dataset.preloader === "done" ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (skip) {
            root.dataset.preloader = "done";
            // どちらの場合も CSS が先に非表示にしているので、
            // 次のフレームで静かに取り外すだけでよい
            const skipRaf = requestAnimationFrame(() => setPhase("done"));
            return () => cancelAnimationFrame(skipRaf);
        }

        document.body.style.overflow = "hidden";

        let loaded = document.readyState === "complete";
        const onLoad = () => {
            loaded = true;
        };
        if (!loaded) window.addEventListener("load", onLoad, { once: true });

        let raf = 0;
        let exitTimer: ReturnType<typeof setTimeout>;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            let value = Math.min(100, (elapsed / MIN_DURATION) * 100);

            // まだ読み込みが終わっていなければ 90% で足踏みさせる。
            // ただし MAX_DURATION を過ぎたら待たずに完了させる。
            if (!loaded && elapsed < MAX_DURATION) {
                value = Math.min(value, 90);
            }

            setProgress(Math.floor(value));

            if (value >= 100) {
                setPhase("exiting");
                try {
                    sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
                } catch {
                    // プライベートモード等で sessionStorage が使えなくても演出は成立させる
                }
                exitTimer = setTimeout(() => {
                    root.dataset.preloader = "done";
                    document.body.style.overflow = "";
                    setPhase("done");
                }, EXIT_DURATION);
                return;
            }

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(exitTimer);
            window.removeEventListener("load", onLoad);
            document.body.style.overflow = "";
        };
    }, []);

    if (phase === "done") return null;

    return (
        <div
            className={`preloader ${phase === "exiting" ? "preloader--exiting" : ""}`}
            aria-hidden='true'>
            <div className='flex h-full w-full flex-col justify-end px-6 pb-10 sm:px-12 sm:pb-14'>
                <div className='flex items-end justify-between gap-6'>
                    <span className='text-sm tracking-[0.3em] text-muted uppercase'>
                        Loading
                    </span>
                    <span className='font-mono text-[22vw] leading-[0.8] font-bold sm:text-[16vw] lg:text-[12vw]'>
                        {progress}
                    </span>
                </div>
                <div className='mt-8 h-px w-full bg-border'>
                    <div
                        className='h-full bg-foreground transition-[width] duration-100 ease-linear'
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, type RefObject } from "react";

interface ParallaxLayer {
    ref: RefObject<HTMLElement | null>;
    /** カーソルがコンテナ端にあるときの最大移動量(px)。値が大きいほど手前に見える */
    strength: number;
}

/**
 * container 内でのポインタ位置を中心基準の -1..1 に正規化し、
 * lerp で滑らかに追従させながら各レイヤーへ translate3d を直接適用する。
 * React state を経由しないので、動いている間も再レンダーは発生しない。
 *
 * タッチ端末（hover不可）と prefers-reduced-motion では何もしない。
 */
export function usePointerParallax(
    containerRef: RefObject<HTMLElement | null>,
    layers: ParallaxLayer[]
) {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        const noHover = window.matchMedia("(hover: none)").matches;
        if (reduceMotion || noHover) return;

        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let raf = 0;

        const onMove = (e: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        };

        const onLeave = () => {
            targetX = 0;
            targetY = 0;
        };

        const tick = () => {
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;

            for (const { ref, strength } of layers) {
                const el = ref.current;
                if (!el) continue;
                el.style.transform = `translate3d(${(currentX * strength).toFixed(2)}px, ${(currentY * strength).toFixed(2)}px, 0)`;
            }

            raf = requestAnimationFrame(tick);
        };

        container.addEventListener("pointermove", onMove);
        container.addEventListener("pointerleave", onLeave);
        raf = requestAnimationFrame(tick);

        return () => {
            container.removeEventListener("pointermove", onMove);
            container.removeEventListener("pointerleave", onLeave);
            cancelAnimationFrame(raf);
            for (const { ref } of layers) {
                if (ref.current) ref.current.style.transform = "";
            }
        };
        // layers は Hero 側で useRef により安定した参照のみを持つ配列のため、
        // 依存配列には含めずマウント時の値をそのまま使う
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef]);
}

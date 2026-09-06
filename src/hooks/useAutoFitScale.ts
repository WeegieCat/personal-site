"use client";

import { useEffect, type RefObject } from "react";
import { getVisualBounds } from "@/lib/visual-bounds";

/**
 * measureRef の実際の描画幅（回転などのtransformを含む見た目上の幅）が、
 * containerRef の横幅から margin を引いた「利用可能幅」にちょうど一致する
 * ように scaleTargetRef へ scale(...) を適用する。利用可能幅より小さければ
 * 拡大し（枠いっぱいに描画）、大きければ縮小する（はみ出し防止）——常に
 * 利用可能幅ぴったりに合わせる双方向フィット。
 *
 * ウィンドウのリサイズと、containerRef自体のサイズ変化（レイアウト変更）の
 * 両方に追従する。
 */
export function useAutoFitScale(
    measureRef: RefObject<HTMLElement | null>,
    scaleTargetRef: RefObject<HTMLElement | null>,
    containerRef: RefObject<HTMLElement | null>,
    margin: number
) {
    useEffect(() => {
        const measure = measureRef.current;
        const scaleTarget = scaleTargetRef.current;
        const container = containerRef.current;
        if (!measure || !scaleTarget || !container) return;

        function update() {
            if (!measure || !scaleTarget || !container) return;
            // 縮小したまま測ると幅が縮んだ値になり、際限なく縮小し続けて
            // しまうため、測る前に一旦等倍へ戻す
            scaleTarget.style.transform = "";
            // 親のボックスからはみ出した子（行のテキスト）も含めて測る
            const naturalWidth = getVisualBounds(measure).width;
            const available = container.clientWidth - margin;
            const scale =
                available > 0 && naturalWidth > 0
                    ? available / naturalWidth
                    : 1;
            scaleTarget.style.transform =
                scale !== 1 ? `scale(${scale})` : "";
        }

        update();

        const resizeObserver = new ResizeObserver(update);
        resizeObserver.observe(container);
        window.addEventListener("resize", update);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", update);
            if (scaleTarget) scaleTarget.style.transform = "";
        };
    }, [measureRef, scaleTargetRef, containerRef, margin]);
}

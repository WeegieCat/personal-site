"use client";

import { useEffect, type RefObject } from "react";
import { getVisualBounds } from "@/lib/visual-bounds";

interface SpaceBelowOptions {
    /** aboveRef の描画下端から最低限あけるすき間(px) */
    gap: number;
    /**
     * 位置の下限を決めるための基準コンテナ。
     * containerの上端 + ビューポート高さ * minTopRatio より上には来ないようにする。
     */
    containerRef: RefObject<HTMLElement | null>;
    /**
     * ビューポート高さに対する、belowRef の上端の下限比率(0〜1)。
     * これがないと belowRef の位置が aboveRef の高さ次第で画面幅ごとに
     * 大きくばらついてしまうため、どの幅でも同じくらいの高さに揃える。
     */
    minTopRatio: number;
}

/**
 * belowRef を aboveRef の実際の描画下端より下に、かつビューポート高さに対して
 * 一定の位置より下に配置されるよう、belowRef の margin-top を動的に設定する。
 *
 * -rotate-6 のようなCSS transformは要素の見た目上のサイズを変えるが、
 * ドキュメントフロー上のレイアウト高さには反映されない（親要素は回転前の
 * 高さのまま）。そのため、後続要素に静的なmarginを設定するだけでは、
 * 画面幅によって回転後の見た目が margin の想定より下まで伸び、重なって
 * しまうことがある。実測した位置を基準にすることでこれを避ける。
 *
 * 下限比率にコンテナ自身の高さではなくビューポート高さを使うのは、
 * margin-top を足すとコンテナの高さも伸びるため、コンテナ基準にすると
 * 「下げる→コンテナが伸びる→さらに下がる」というループになるため。
 */
export function useSpaceBelow(
    aboveRef: RefObject<HTMLElement | null>,
    belowRef: RefObject<HTMLElement | null>,
    { gap, containerRef, minTopRatio }: SpaceBelowOptions
) {
    useEffect(() => {
        const above = aboveRef.current;
        const below = belowRef.current;
        const container = containerRef.current;
        if (!above || !below || !container) return;

        function update() {
            if (!above || !below || !container) return;
            // marginをリセットしてから測ることで、「余白ゼロの場合の
            // belowRef本来のtop位置」を得る
            below.style.marginTop = "0px";

            // 親のボックスからはみ出した子も含めた実際の下端を使う
            const aboveBottom = getVisualBounds(above).bottom;
            const minTop =
                container.getBoundingClientRect().top +
                window.innerHeight * minTopRatio;
            const desiredTop = Math.max(aboveBottom + gap, minTop);

            const belowTopAtZeroMargin = below.getBoundingClientRect().top;
            const needed = desiredTop - belowTopAtZeroMargin;
            below.style.marginTop = needed > 0 ? `${needed}px` : "0px";
        }

        update();
        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("resize", update);
            if (below) below.style.marginTop = "";
        };
    }, [aboveRef, belowRef, containerRef, gap, minTopRatio]);
}

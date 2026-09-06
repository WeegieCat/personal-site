/**
 * 「実際に描画されている中身」の外接矩形を返す。子要素があればその和を、
 * なければ要素自身の矩形を使う。
 *
 * 親要素の getBoundingClientRect() をそのまま使えない理由は2つある。
 *
 * 1. 子が親より広いとき、子は親のボックスからはみ出して描画されるが、
 *    親の矩形にはそのはみ出し分が含まれない（→ 実際より狭く見積もり、
 *    枠外へ文字がはみ出す）。
 * 2. 逆に親が子より広いとき（flexのitems-centerで中身が中央寄せされて
 *    左右に余白ができる場合など）、親の矩形は中身より広い（→ 実際より
 *    広く見積もり、中身が枠いっぱいにならない）。
 *
 * どちらも「中身そのもの」を測れば正しく求まる。
 *
 * transform（回転・拡大縮小・移動）は getBoundingClientRect() に反映されるので、
 * 戻り値は最終的な描画結果としての座標になる。
 */
export function getVisualBounds(el: HTMLElement) {
    const children = Array.from(el.children).filter((child) => {
        const r = child.getBoundingClientRect();
        // 非表示要素は 0x0 になるため除外する
        return r.width > 0 || r.height > 0;
    });

    if (children.length === 0) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height,
        };
    }

    let left = Infinity;
    let right = -Infinity;
    let top = Infinity;
    let bottom = -Infinity;

    for (const child of children) {
        const r = child.getBoundingClientRect();
        left = Math.min(left, r.left);
        right = Math.max(right, r.right);
        top = Math.min(top, r.top);
        bottom = Math.max(bottom, r.bottom);
    }

    return {
        left,
        right,
        top,
        bottom,
        width: right - left,
        height: bottom - top,
    };
}

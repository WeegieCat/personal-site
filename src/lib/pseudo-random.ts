/**
 * サーバー/クライアントで同じ値になる必要がある場所で使う、
 * indexから決定的に0〜1の値を作る簡易疑似乱数。
 *
 * Math.random() はSSRとハイドレーションで異なる値になり、
 * 「アニメーションのばらつき」のような見た目だけの用途でも
 * hydration mismatch を起こすため使わない。
 */
export function pseudoRandom(seed: number) {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
}

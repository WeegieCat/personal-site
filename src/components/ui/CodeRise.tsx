import { pseudoRandom } from "@/lib/pseudo-random";

// 背景で下から上へコードが立ち上る演出（全テーマ共通）。
// ヒーローと、Works / Blog のような通常ページで密度と速度を変えて使い回す。
//
// hooks を持たない純粋な描画のみなので "use client" は付けない。
// クライアントコンポーネント（Hero）から呼んでも、サーバーコンポーネント
// （Works / Blog）から呼んでも同じ静的マークアップになる。

// 立ち上るダミーのコード片。意味のあるロジックである必要はなく、
// 見た目のリアリティだけを狙っている。
//
// 1行が「}」だけのような極端に短い断片は、背景に記号がぽつんと浮かんでいる
// ようにしか見えないため、各行は必ず単体で「コードらしく」見える長さにする
// （閉じ括弧は前の行に畳んで一行にまとめている）。
const CODE_FRAGMENTS = [
    "const flame = new Particle();",
    "for (let i = 0; i < n; i++) { step(i); }",
    "  col[i].y -= speed * dt;",
    "if (y < top) reset(col[i]);",
    "gl_FragColor = vec4(rgb, a);",
    "function flicker(seed) { return noise(seed); }",
    "  return noise(seed) * 0.5;",
    "requestAnimationFrame(loop);",
    "ctx.globalAlpha = fade(t);",
    "class Ember extends Sprite { life = 1; }",
    "  update(dt) { this.life -= dt; }",
    "export function rise(cols) { return cols; }",
    "  return cols.map(draw);",
    // 上の意図を将来の編集でも壊さないための保険。3文字以下の断片は使わない
].filter((fragment) => fragment.trim().length > 3);

/**
 * Works / Blog のような通常ページ用のプリセット。
 * 読ませるページなのでヒーローより本数を減らし、速度も落として
 * 視線が背景に持っていかれないようにする（ヒーローは既定値のまま）。
 */
export const PAGE_CODE_RISE = {
    count: 8,
    minDuration: 16,
    durationSpan: 12,
    opacity: 0.4,
} as const;

interface CodeRiseProps {
    /**
     * 同時に流すコード片の本数（＝密度）。
     * CODE_FRAGMENTS の先頭から使い、横方向にはこの本数で等分して配置する。
     */
    count?: number;
    /** 1周にかかる秒数の下限。大きいほどゆっくり上る */
    minDuration?: number;
    /** minDuration に上乗せされる秒数の幅。本数ぶんばらけさせるために使う */
    durationSpan?: number;
    /**
     * レイヤー全体にかける不透明度(0〜1)。
     * 各コード片が持つ明滅のopacityに掛け算されるため、
     * 明滅の抑揚はそのままに全体だけを薄くできる。
     */
    opacity?: number;
    /**
     * レイヤーの位置指定。呼び出し側の都合で
     * absolute（セクション内に敷く）と fixed（ページ全体に敷く）を切り替える。
     */
    className?: string;
}

export default function CodeRise({
    count = CODE_FRAGMENTS.length,
    minDuration = 7,
    durationSpan = 6,
    opacity = 1,
    className = "absolute inset-0",
}: CodeRiseProps) {
    const fragments = CODE_FRAGMENTS.slice(0, count);

    return (
        // 文字色は text-primary / text-accent というテーマトークン参照なので、
        // テーマを切り替えるとその配色のまま追従する。
        // 各ストリームはindex由来の疑似乱数でduration/delay/横位置をずらし、
        // 一斉に同じ動きにならないようにしている（負のdelayで開始時点から
        // 既に流れている状態にする）。装飾なので読み上げ対象から外す。
        <div
            aria-hidden='true'
            style={{ opacity }}
            className={`pointer-events-none overflow-hidden ${className}`}>
            {fragments.map((fragment, i) => {
                const duration =
                    minDuration + pseudoRandom(i * 1.7) * durationSpan;
                const delay = -(pseudoRandom(i * 3.1) * duration);
                const left = Math.min(
                    94,
                    (i / fragments.length) * 100 +
                        (pseudoRandom(i * 5.3) - 0.5) * 6
                );
                const isAccent = i % 4 === 3;
                return (
                    <span
                        key={i}
                        style={{
                            left: `${left.toFixed(2)}%`,
                            bottom: "30%",
                            animationName: "code-rise",
                            animationDuration: `${duration.toFixed(2)}s`,
                            animationDelay: `${delay.toFixed(2)}s`,
                            animationTimingFunction: "linear",
                            animationIterationCount: "infinite",
                            textShadow: "0 0 6px currentColor",
                        }}
                        className={`animate-code-rise absolute font-mono text-[11px] whitespace-nowrap opacity-0 sm:text-xs motion-reduce:[animation:none] motion-reduce:opacity-[0.18] ${
                            isAccent ? "text-accent" : "text-primary"
                        }`}>
                        {fragment}
                    </span>
                );
            })}
        </div>
    );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./navItems";

/*
 * ヘッダーは2層構成にしている。
 *
 * 1層目(実体・合成あり): header 自身に mix-blend-mode: difference をかける。
 *   - 非選択の項目は白で描く → 背景を反転した色になり、薄い背景でも
 *     primary色の円の上でも常に読める「ネガ」表示になる。
 *   - 選択中の項目は塗りを透明にし、白い縁取り(-webkit-text-stroke)だけを描く。
 *     縁取りも合成されるので背景の反転色になり、背景と紛らわしい色のときでも
 *     文字の輪郭が必ず立つ。
 * 2層目(装飾・合成なし): 選択中の項目だけを accent 色の塗りで重ねる。
 *   合成対象外なので、defaultなら黄・bubblegumならピンクと、テーマの
 *   サブカラーがそのままの色味で出る。
 *
 * 2層に分けているのは、header が position:fixed でスタッキングコンテキストを
 * 作るため、その内側の要素に mix-blend-mode を指定してもページ本体とは合成
 * されない（ヘッダー内で閉じてしまう）から。合成は header 自身にかける必要が
 * あり、するとヘッダー内すべてが反転してしまうので、色をそのまま出したい
 * 選択中の塗りだけを合成対象外の別レイヤーに逃がしている。
 *
 * 1層目では選択中の塗りを透明にしているだけでリンク自体はDOMに残るため、
 * キーボード操作・読み上げは通常どおり効く。2層目は aria-hidden かつ
 * pointer-events-none の純粋な見た目用。
 */
const SHELL_CLASS = "fixed top-0 right-0 z-50 p-6 sm:p-10";
const NAV_CLASS =
    "flex items-center gap-[2vw] text-[clamp(1.1rem,3vw,1.75rem)] font-bold tracking-wide uppercase";
const ITEM_CLASS = "flex items-center gap-[2vw]";
const LABEL_CLASS = "inline-block py-2";

export default function Header() {
    const pathname = usePathname();

    return (
        <>
            <header className={`${SHELL_CLASS} mix-blend-difference`}>
                <nav className={`${NAV_CLASS} text-white`}>
                    {navItems.map((item, index) => (
                        <span key={item.href} className={ITEM_CLASS}>
                            {index > 0 && <span aria-hidden='true'>/</span>}
                            <Link
                                href={item.href}
                                aria-current={
                                    pathname === item.href ? "page" : undefined
                                }
                                className={`hv-underline ${LABEL_CLASS} ${
                                    pathname === item.href
                                        ? "text-transparent [-webkit-text-stroke:1px_white]"
                                        : ""
                                }`}>
                                {item.label}
                            </Link>
                        </span>
                    ))}
                </nav>
            </header>

            <div
                aria-hidden='true'
                className={`${SHELL_CLASS} pointer-events-none`}>
                <div className={NAV_CLASS}>
                    {navItems.map((item, index) => (
                        <span key={item.href} className={ITEM_CLASS}>
                            {index > 0 && (
                                <span className='text-transparent'>/</span>
                            )}
                            <span
                                className={`${LABEL_CLASS} ${
                                    pathname === item.href
                                        ? "text-accent"
                                        : "text-transparent"
                                }`}>
                                {item.label}
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}

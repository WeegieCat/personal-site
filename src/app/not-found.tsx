import Link from "next/link";
import CodeRise, { PAGE_CODE_RISE } from "@/components/ui/CodeRise";

/**
 * 404ページ。ヒーローの記号（hero-bgの下地・画面外へ抜ける単色の円・
 * -rotate-6 の極太ワードマーク・Oに入る顔写真・accentの丸ボタン）を
 * そのまま流用して、行き止まりでもサイトの世界から出ていないと分かるようにする。
 *
 * 円はヒーローの「左上から抜ける」と対になるよう右下に置く。中央の文字と
 * 重ならない位置なので、ヒーローのように text-on-primary を使う必要はなく
 * text-foreground（hero-bg の上で読める色）のままでよい。
 */
export default function NotFound() {
    return (
        // overflow-x は clip。hidden にすると overflow-y も auto に計算され、
        // はみ出した装飾のぶん縦スクロールバーが出る（ヒーローと同じ理由）。
        <section
            // 右下の円がフッターに重なるので、フッターをネガ表示に切り替える。
            // 実際の切り替えは globals.css の body:has([data-negative-footer])
            data-negative-footer
            className='relative flex min-h-[80vh] items-center overflow-x-clip bg-hero-bg'>
            {/* 右下から画面外へ抜ける円。装飾なので読み上げ対象から外す */}
            <div
                aria-hidden='true'
                className='absolute -right-[25%] -bottom-[40%] aspect-square w-[80%] max-w-[520px] rounded-full bg-primary sm:w-[50%]'
            />

            {/* 他のページと同じ密度・速度・濃さのコード上昇 */}
            <CodeRise className='absolute inset-0' {...PAGE_CODE_RISE} />

            {/* 実際の見出しはこちら。以下の巨大な404は装飾として扱う */}
            <h1 className='sr-only'>404 — Page Not Found</h1>

            <div className='relative z-10 mx-auto w-full max-w-4xl px-6 py-16 sm:px-10'>
                <div
                    aria-hidden='true'
                    className='flex -rotate-6 flex-col items-center gap-2'>
                    <div className='flex items-center text-[clamp(4rem,20vw,9rem)] leading-[0.8] font-black tracking-tight text-foreground uppercase'>
                        <span>4</span>
                        {/* ワードマークの O と同じ顔写真。0 の位置に入れる */}
                        <span className='hero-photo mx-[0.06em] inline-block h-[0.85em] w-[0.85em] rounded-full border-2 border-foreground' />
                        <span>4</span>
                    </div>
                    <p className='text-[clamp(0.9rem,3.5vw,1.5rem)] font-extrabold tracking-[0.3em] text-muted uppercase'>
                        Page Not Found
                    </p>
                </div>

                <div className='mt-16 flex justify-center'>
                    <Link
                        href='/'
                        className='flex h-[clamp(7rem,20vw,10rem)] w-[clamp(7rem,20vw,10rem)] flex-col items-center justify-center rounded-full bg-accent text-center text-on-accent shadow-lg transition-transform hover:scale-105'>
                        <span className='text-[clamp(0.875rem,2vw,1.125rem)] font-semibold'>
                            Lost?
                        </span>
                        <span className='mt-1 text-[clamp(0.75rem,1.6vw,0.9rem)]'>
                            back to home
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

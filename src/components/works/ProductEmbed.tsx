interface ProductEmbedProps {
    /** 埋め込むプロダクトの配信元URL */
    src: string;
    title: string;
    /** アスペクト比を保てない全画面アプリ等では固定高さにする */
    className?: string;
}

/**
 * 別途デプロイした自作プロダクトをサイト内に埋め込むための枠。
 * サンドボックスを明示して、埋め込み先に過剰な権限を渡さないようにする。
 */
export default function ProductEmbed({
    src,
    title,
    className = "aspect-video",
}: ProductEmbedProps) {
    return (
        <div
            className={`w-full overflow-hidden rounded-lg border border-border bg-surface ${className}`}>
            <iframe
                src={src}
                title={title}
                loading='lazy'
                sandbox='allow-scripts allow-same-origin allow-forms allow-popups'
                className='h-full w-full border-0'
            />
        </div>
    );
}

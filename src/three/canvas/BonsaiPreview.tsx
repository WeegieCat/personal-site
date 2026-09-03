"use client";

import dynamic from "next/dynamic";

/**
 * three.js はバンドルが大きく WebGL はブラウザでしか動かないため ssr: false で遅延読み込みする。
 * next/dynamic の ssr: false はクライアントコンポーネントからしか使えないので、
 * このラッパー自体が "use client" である必要がある。
 */
const BonsaiScene = dynamic(() => import("@/three/scenes/BonsaiScene"), {
    ssr: false,
    loading: () => <div className='h-full w-full animate-pulse bg-surface' />,
});

export default function BonsaiPreview({
    className = "",
}: {
    className?: string;
}) {
    return (
        <div className={className}>
            <BonsaiScene />
        </div>
    );
}

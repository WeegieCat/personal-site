import type { ReactNode } from "react";

const widths = {
    narrow: "max-w-2xl",
    default: "max-w-4xl",
    wide: "max-w-6xl",
} as const;

interface ContainerProps {
    /** narrow: 問い合わせ等 / default: 記事 / wide: 一覧・グリッド */
    size?: keyof typeof widths;
    className?: string;
    children: ReactNode;
}

export default function Container({
    size = "default",
    className = "",
    children,
}: ContainerProps) {
    return (
        <div
            className={`mx-auto w-full ${widths[size]} px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
}

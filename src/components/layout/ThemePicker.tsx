"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_THEMES } from "@/lib/themes";
import { useSiteTheme } from "@/lib/theme-context";

function PaletteIcon() {
    return (
        <svg
            viewBox='0 0 24 24'
            className='h-5 w-5'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path d='M12 22a10 10 0 1 1 0-20 8 8 0 0 1 8 8c0 1.5-1 3-3 3h-2a2 2 0 0 0 0 4h.5a1.5 1.5 0 0 1 0 3A1 1 0 0 0 12 22Z' />
            <circle cx='7' cy='11' r='1' fill='currentColor' stroke='none' />
            <circle cx='10.5' cy='7.5' r='1' fill='currentColor' stroke='none' />
            <circle cx='15.5' cy='7.5' r='1' fill='currentColor' stroke='none' />
        </svg>
    );
}

export default function ThemePicker() {
    const { themeIndex, setThemeIndex } = useSiteTheme();
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const onClickOutside = (e: MouseEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, [isOpen]);

    return (
        <div ref={rootRef} className='relative'>
            <button
                type='button'
                onClick={() => setIsOpen((v) => !v)}
                aria-label='テーマカラーを選ぶ'
                aria-expanded={isOpen}
                className='inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface'>
                <PaletteIcon />
            </button>

            {isOpen && (
                <ul className='absolute top-full right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-border bg-background py-1 shadow-lg'>
                    {SITE_THEMES.map((theme, i) => (
                        <li key={theme.id}>
                            <button
                                type='button'
                                onClick={() => {
                                    setThemeIndex(i);
                                    setIsOpen(false);
                                }}
                                className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-surface ${
                                    i === themeIndex
                                        ? "font-semibold text-primary"
                                        : "text-foreground"
                                }`}>
                                <span className='flex shrink-0 overflow-hidden rounded'>
                                    <span
                                        className='h-4 w-2'
                                        style={{
                                            backgroundColor: theme.vars.primary,
                                        }}
                                    />
                                    <span
                                        className='h-4 w-2'
                                        style={{
                                            backgroundColor: theme.vars.accent,
                                        }}
                                    />
                                    <span
                                        className='h-4 w-2'
                                        style={{
                                            backgroundColor:
                                                theme.vars.background,
                                        }}
                                    />
                                </span>
                                {theme.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

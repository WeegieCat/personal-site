"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { navItems } from "./navItems";
import Container from "@/components/ui/Container";

function SunIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-5 w-5 ${className}`}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'>
            <circle cx='12' cy='12' r='3' />
            <path d='M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36-1.42-1.42M7.05 6.05 5.64 4.64M18.36 5.64l-1.42 1.41M6.34 17.66l-1.41 1.42' />
        </svg>
    );
}

function MoonIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`h-5 w-5 ${className}`}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'>
            <path d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' />
        </svg>
    );
}

function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <button
            type='button'
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label='テーマを切り替える'
            className='inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface'>
            {/*
             * どちらのアイコンも描画しておき、表示の切り替えは CSS の dark: に任せる。
             * サーバー描画時にテーマが未確定でもマークアップが変わらないため、
             * ハイドレーション不一致もマウント判定用の state も不要になる。
             */}
            <MoonIcon className='dark:hidden' />
            <SunIcon className='hidden dark:block' />
        </button>
    );
}

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className='fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md'>
            <Container size='wide'>
                <div className='flex h-16 items-center justify-between'>
                    <Link href='/' className='flex items-center gap-2'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent'>
                            <span className='text-sm font-bold text-white'>
                                F
                            </span>
                        </div>
                        <span className='hidden text-lg font-bold text-foreground sm:inline'>
                            Feynman
                        </span>
                    </Link>

                    <nav className='hidden items-center gap-8 md:flex'>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`transition-colors hover:text-primary ${
                                    pathname === item.href
                                        ? "font-semibold text-primary"
                                        : "text-muted"
                                }`}>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className='flex items-center gap-2'>
                        <ThemeToggle />
                        <button
                            type='button'
                            aria-label='メニューを開閉する'
                            aria-expanded={isOpen}
                            className='inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface md:hidden'
                            onClick={() => setIsOpen(!isOpen)}>
                            <svg
                                className='h-6 w-6'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth={2}
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                viewBox='0 0 24 24'>
                                <path
                                    d={
                                        isOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <nav className='pb-4 md:hidden'>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`block rounded-md px-3 py-2 transition-colors hover:bg-surface ${
                                    pathname === item.href
                                        ? "font-semibold text-primary"
                                        : "text-muted"
                                }`}>
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </Container>
        </header>
    );
}

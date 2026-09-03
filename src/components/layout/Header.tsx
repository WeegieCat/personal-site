"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "./navItems";
import Container from "@/components/ui/Container";
import ThemePicker from "./ThemePicker";
import { SITE_NAME } from "@/lib/site";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className='fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md'>
            <Container size='wide'>
                {/*
                 * flex + justify-between だと、左（ロゴ+名前）と右
                 * （テーマピッカー+ハンバーガー）の幅が違うぶんだけ
                 * 中央のnavが真ん中からズレる。左右を等幅の1frにして
                 * navを中央カラムに置くことで、幅の差に関係なく
                 * 常にヘッダー全体の中央に揃う。
                 */}
                <div className='grid h-16 grid-cols-[1fr_auto_1fr] items-center'>
                    <Link href='/' className='flex items-center gap-2 justify-self-start'>
                        <div className='relative h-8 w-8 overflow-hidden rounded-lg'>
                            <Image
                                src='/images/profile.png'
                                alt={SITE_NAME}
                                fill
                                sizes='32px'
                                className='object-cover'
                            />
                        </div>
                        <span className='hidden text-lg font-bold text-foreground sm:inline'>
                            {SITE_NAME}
                        </span>
                    </Link>

                    <nav className='hidden items-center gap-8 md:flex'>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`hv-underline ${
                                    pathname === item.href
                                        ? "font-semibold text-primary"
                                        : "text-muted"
                                }`}>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className='flex items-center justify-self-end gap-2'>
                        <ThemePicker />
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

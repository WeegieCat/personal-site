"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./navItems";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className='fixed top-0 right-0 z-50 p-6 sm:p-10'>
            <nav className='flex items-center gap-[2vw] text-[clamp(1.1rem,3vw,1.75rem)] font-bold tracking-wide uppercase'>
                {navItems.map((item, index) => (
                    <span key={item.href} className='flex items-center gap-[2vw]'>
                        {index > 0 && <span aria-hidden='true'>/</span>}
                        <Link
                            href={item.href}
                            className={`hv-underline inline-block py-2 ${
                                pathname === item.href
                                    ? "text-accent"
                                    : "text-on-primary sm:text-foreground"
                            }`}>
                            {item.label}
                        </Link>
                    </span>
                ))}
            </nav>
        </header>
    );
}

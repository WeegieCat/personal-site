import Link from "next/link";
import { navItems } from "./navItems";
import Container from "@/components/ui/Container";
import {
    GITHUB_URL,
    QIITA_URL,
    SITE_EMAIL,
    SITE_INITIAL,
    SITE_NAME,
    SITE_TAGLINE,
} from "@/lib/site";

const socialLinks = [
    { label: "Email", href: `mailto:${SITE_EMAIL}`, external: false },
    { label: "GitHub", href: GITHUB_URL, external: true },
    { label: "Qiita", href: QIITA_URL, external: true },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='border-t border-border bg-surface text-foreground'>
            <Container size='wide' className='py-12'>
                <div className='mb-8 grid grid-cols-1 gap-8 md:grid-cols-3'>
                    <div>
                        <div className='mb-4 flex items-center gap-2'>
                            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent'>
                                <span className='text-sm font-bold text-white'>
                                    {SITE_INITIAL}
                                </span>
                            </div>
                            <span className='font-bold'>{SITE_NAME}</span>
                        </div>
                        <p className='text-sm text-muted'>{SITE_TAGLINE}</p>
                    </div>

                    <div>
                        <h2 className='mb-4 font-semibold'>Quick Links</h2>
                        <ul className='space-y-2'>
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className='text-sm text-muted transition-colors hover:text-primary'>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className='mb-4 font-semibold'>Contact</h2>
                        <ul className='space-y-2'>
                            {socialLinks.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        {...(item.external && {
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                        })}
                                        className='text-sm text-muted transition-colors hover:text-primary'>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='border-t border-border pt-8'>
                    <p className='text-sm text-muted'>
                        © {currentYear} {SITE_NAME}. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
}

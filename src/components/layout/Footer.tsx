import Container from "@/components/ui/Container";
import { GITHUB_URL, QIITA_URL, SITE_NAME } from "@/lib/site";

const socialLinks = [
    { label: "GitHub", href: GITHUB_URL },
    { label: "Qiita", href: QIITA_URL },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='border-t border-border bg-surface text-foreground'>
            <Container
                size='wide'
                className='flex flex-col items-center justify-between gap-4 py-8 sm:flex-row'>
                <p className='text-sm text-muted'>
                    © {currentYear} {SITE_NAME}
                </p>

                <nav className='flex items-center gap-6'>
                    {socialLinks.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hv-underline text-sm text-muted'>
                            {item.label}
                        </a>
                    ))}
                </nav>
            </Container>
        </footer>
    );
}

import Container from "@/components/ui/Container";
import { GITHUB_URL, QIITA_URL, SITE_EMAIL } from "@/lib/site";

const socialLinks = [
    { label: "GitHub", href: GITHUB_URL },
    { label: "Qiita", href: QIITA_URL },
];

export default function Footer() {
    return (
        <footer className='border-t border-border bg-surface text-foreground'>
            <Container
                size='wide'
                /*
                 * 右下に fixed 表示のキューブバッジ(sm以上は right-10 幅80px)
                 * と重なるぶん、sm以上でのみ右側に余白を確保する。
                 * モバイルは flex-col で中央寄せになり衝突しないため不要。
                 */
                className='flex flex-col items-center justify-between gap-4 py-8 sm:flex-row sm:pr-32'>
                <a
                    href={`mailto:${SITE_EMAIL}`}
                    className='hv-underline text-sm text-muted'>
                    {SITE_EMAIL}
                </a>

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

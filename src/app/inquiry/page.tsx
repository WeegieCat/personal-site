import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { GITHUB_URL, QIITA_URL, SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Contact",
    description: "お仕事のご依頼・協業のご相談はこちらから",
};

const contacts = [
    {
        label: "Email",
        value: SITE_EMAIL,
        href: `mailto:${SITE_EMAIL}`,
    },
    {
        label: "GitHub",
        value: "@WeegieCat",
        href: GITHUB_URL,
    },
    {
        label: "Qiita",
        value: "@feynman_1729",
        href: QIITA_URL,
    },
];

export default function InquiryPage() {
    return (
        <Container size='narrow' className='py-16'>
            <header className='mb-12'>
                <h1 className='mb-4 text-4xl font-bold sm:text-5xl'>Contact</h1>
                <p className='text-lg text-muted'>
                    お仕事のご依頼、協業のご相談などお気軽にどうぞ。
                </p>
            </header>

            <ul className='space-y-4'>
                {contacts.map((contact) => (
                    <li
                        key={contact.label}
                        className='flex items-center justify-between rounded-lg border border-border p-6'>
                        <span className='font-semibold'>{contact.label}</span>
                        <a
                            href={contact.href}
                            {...(contact.href.startsWith("http") && {
                                target: "_blank",
                                rel: "noopener noreferrer",
                            })}
                            className='text-primary transition-colors hover:text-primary-hover'>
                            {contact.value}
                        </a>
                    </li>
                ))}
            </ul>
        </Container>
    );
}

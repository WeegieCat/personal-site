import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
    title: "Contact",
    description: "お仕事のご依頼・協業のご相談はこちらから",
};

const contacts = [
    {
        label: "GitHub",
        value: "@WeegieCat",
        href: "https://github.com/WeegieCat",
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
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-primary transition-colors hover:text-primary-hover'>
                            {contact.value}
                        </a>
                    </li>
                ))}
            </ul>
        </Container>
    );
}

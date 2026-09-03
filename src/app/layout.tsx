import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    // 各ページは title だけを定義すれば `<title> | ${SITE_NAME}` になる
    title: {
        default: SITE_NAME,
        template: `%s | ${SITE_NAME}`,
    },
    description: `${SITE_TAGLINE} のポートフォリオサイト`,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ja'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
                <div className='flex min-h-screen flex-col'>
                    <Header />
                    {/* Header が fixed のぶん本文を押し下げる（旧: 各ページの pt-20） */}
                    <main className='flex-1 pt-16'>{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}

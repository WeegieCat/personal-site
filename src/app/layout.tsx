import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CubeBadge from "@/three/canvas/CubeBadge";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import { SiteThemeProvider } from "@/lib/theme-context";

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
                <SiteThemeProvider>
                    <div className='flex min-h-screen flex-col'>
                        <Header />
                        {/* Header が fixed のぶん本文を押し下げる（旧: 各ページの pt-20） */}
                        <main className='flex-1 pt-16'>{children}</main>
                        <Footer />
                    </div>
                    {/*
                     * ヘッダーのテーマピッカーを廃止したため、このキューブが
                     * テーマカラーを変える唯一の操作になった。fixed でビュー
                     * ポート基準に固定し、どのページでもスクロールしても
                     * 常に右下に留まるようにしている。
                     */}
                    <CubeBadge className='fixed right-6 bottom-24 z-50 h-16 w-16 sm:right-10 sm:bottom-28 sm:h-20 sm:w-20' />
                </SiteThemeProvider>
            </body>
        </html>
    );
}

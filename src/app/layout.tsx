import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CubeBadge from "@/three/canvas/CubeBadge";
import { SITE_NAME } from "@/lib/site";
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
        default: "Portfolio",
        template: `%s | ${SITE_NAME}`,
    },
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
                    <div className='relative flex min-h-screen flex-col'>
                        <Header />
                        <main className='flex-1'>{children}</main>
                        <Footer />
                    </div>
                    {/*
                     * ヘッダーのテーマピッカーを廃止したため、このキューブが
                     * テーマカラーを変える唯一の操作になった。fixed でビュー
                     * ポート基準に固定し、どのページでもスクロールしても
                     * 常に右下に留まる。位置(bottom)自体はCubeBadge内部で
                     * footerの表示状態を見て動的に切り替えているので、
                     * ここではサイズだけを渡す。
                     */}
                    <CubeBadge className='h-16 w-16 sm:h-20 sm:w-20' />
                </SiteThemeProvider>
            </body>
        </html>
    );
}

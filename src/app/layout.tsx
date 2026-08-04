import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_JP, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { profile } from "@/content/profile";
import { site } from "@/content/site";

import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.shortTitle}`,
  },
  description: site.description,
  authors: [{ name: profile.name }],
  keywords: [
    "ポートフォリオ",
    "Unity",
    "ゲーム開発",
    "XR",
    "VR",
    "C#",
    profile.name,
    profile.handle,
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.title,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-md bg-accent px-4 py-2 text-bg focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

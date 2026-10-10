import type { Metadata, Viewport } from "next";
import { business } from "@/content/business";
import { isDemo, pageTitle, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: pageTitle,
  description: business.description,
  alternates: { canonical: "/" },
  // 시안 모드: 검색 노출 차단
  robots: isDemo ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: business.name,
    title: pageTitle,
    description: business.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${business.name} — ${business.hero.tagline}` }],
  },
  twitter: { card: "summary_large_image", title: pageTitle, description: business.description, images: ["/og.png"] },
  icons: { icon: [{ url: "/favicon.png", type: "image/png", sizes: "64x64" }], apple: "/apple-touch-icon.png" },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: business.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 스크롤 페이드는 JS가 있을 때만 (없으면 그냥 다 보이게) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

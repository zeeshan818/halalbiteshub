// app/layout.tsx
import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HalalBitesHub | Discover Halal Restaurants Near You",
  description: "Find HFSAA-certified and self-declared halal restaurants across the USA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google AdSense Script (loads once globally, safe for Next.js) */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4019963781711119"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

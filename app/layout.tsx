// app/layout.tsx
import "../styles/globals.css"; // <-- fixed path (one level up to /styles)
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HalalBitesHub | Discover Halal Restaurants Near You",
  description: "Find HFSAA-certified and self-declared halal restaurants across Illinois.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script (global) */}
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

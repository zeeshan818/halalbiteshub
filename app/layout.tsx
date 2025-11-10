// app/layout.tsx
import "../styles/globals.css";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HalalBitesHub | Discover Halal Restaurants Near You",
  description:
    "Find HFSAA-certified and self-declared halal restaurants across Illinois. Search by city, ZIP, or cuisine.",
  keywords: [
    "halal restaurants",
    "HFSAA certified",
    "halal food Chicago",
    "halal directory",
    "halal bites",
    "halalbiteshub",
  ],
  openGraph: {
    title: "HalalBitesHub | Discover Halal Restaurants Near You",
    description:
      "Find HFSAA-certified and self-declared halal restaurants across Illinois. Updated directory with ZIP and city filters.",
    url: "https://halalbiteshub.com",
    siteName: "HalalBitesHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HalalBitesHub Directory",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script */}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4019963781711119"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        {/* Main Page Content */}
        <div className="flex-1">{children}</div>

        {/* Footer */}
        <footer className="border-t bg-white mt-12">
          <div className="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm">
            {/* Column 1: Branding */}
            <div>
              <h2 className="font-bold text-lg text-emerald-700">HalalBitesHub</h2>
              <p className="text-gray-600 mt-1">
                Discover halal dining options near you. Curated listings of HFSAA-certified and
                self-declared halal restaurants across Illinois.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Quick Links</h3>
              <ul className="space-y-1">
                <li>
                  <a href="/" className="hover:underline">Home</a>
                </li>
                <li>
                  <a href="/about" className="hover:underline">About</a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">Contact</a>
                </li>
                <li>
                  <a href="/submit" className="hover:underline">Suggest a Restaurant</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Legal</h3>
              <ul className="space-y-1">
                <li>
                  <a href="/legal/privacy" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="/legal/terms" className="hover:underline">Terms of Service</a>
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                © {new Date().getFullYear()} HalalBitesHub. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

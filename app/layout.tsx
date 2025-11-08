import "./../styles/globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "HalalBitesHub — Chicago & Suburbs",
  description: "One‑stop halal restaurant directory for Chicago & suburbs with HFSAA certification filters.",
  openGraph: {
    title: "HalalBitesHub — Chicago & Suburbs",
    description: "Find HFSAA‑certified and self‑declared halal restaurants across Chicago metro.",
    url: "https://www.halalbiteshub.com",
    siteName: "HalalBitesHub",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HalalBitesHub" }],
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"Organization",
    "name":"HalalBitesHub",
    "url":"https://www.halalbiteshub.com",
    "logo":"https://www.halalbiteshub.com/favicon.ico"
  };
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX" />
        <Script id="ga4">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXX');
        `}</Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen">
        <div className="border-b bg-white sticky top-0 z-50">
          <div className="container flex items-center justify-between py-3">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <span className="font-bold text-xl">HalalBitesHub</span>
            </a>
            <nav className="flex items-center gap-4 text-sm">
              <a href="/submit" className="hover:underline">Submit a Restaurant</a>
              <a href="/contact" className="hover:underline">Contact</a>
            </nav>
          </div>
        </div>
        {children}
        <footer className="mt-16 border-t">
          <div className="container py-8 text-sm text-gray-600 grid md:grid-cols-3 gap-6">
            <div>
              <div className="font-semibold mb-2">About</div>
              <p>HalalBitesHub highlights HFSAA‑certified and self‑declared halal restaurants across Chicagoland.</p>
            </div>
            <div>
              <div className="font-semibold mb-2">Certification</div>
              <p><span className="badge bg-green-50 border-green-300 text-green-700">HFSAA</span> vs <span className="badge bg-yellow-50 border-yellow-300 text-yellow-700">Self‑declared</span></p>
            </div>
            <div>
              <div className="font-semibold mb-2">Links</div>
              <ul className="space-y-2">
                <li><a className="hover:underline" href="/sitemap.xml">Sitemap</a></li>
                <li><a className="hover:underline" href="https://www.hfsaa.org" target="_blank">HFSAA</a></li>
              </ul>
            </div>
          </div>
          <div className="container pb-8 text-xs text-gray-500">© {new Date().getFullYear()} HalalBitesHub — Chicago & Suburbs</div>
        </footer>
      </body>
    </html>
  );
}

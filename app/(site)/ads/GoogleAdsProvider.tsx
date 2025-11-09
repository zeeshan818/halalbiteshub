"use client";
import Script from "next/script";

export default function GoogleAdsProvider({ publisherId }:{ publisherId?: string }){
  if (!publisherId) return null;
  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${publisherId}`}
      crossOrigin="anonymous"
    />
  );
}

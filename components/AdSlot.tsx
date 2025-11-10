"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSlot({ slot }: { slot: string }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("AdSense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", margin: "20px auto" }}
      data-ad-client="ca-pub-4019963781711119"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}

"use client";
import React from "react";

declare global {
  interface Window { adsbygoogle: any[]; }
}

type Props = {
  publisherId: string; // e.g., "pub-1234567890123456" WITHOUT "ca-"
  slotId: string;      // ad slot id from AdSense
  className?: string;
  style?: React.CSSProperties;
};

export default function AdSlot({ publisherId, slotId, className, style }: Props){
  React.useEffect(()=>{
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch(_){}
  }, []);

  if (!publisherId || !slotId) return null;

  return (
    <ins className={`adsbygoogle ${className||""}`}
      style={style||{ display: "block", minHeight: 90 }}
      data-ad-client={`ca-${publisherId}`}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

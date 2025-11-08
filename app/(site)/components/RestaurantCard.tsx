"use client";
import React from "react";

function InitialBadge({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
  return (
    <div className="w-full h-40 bg-gradient-to-br from-emerald-100 to-cyan-100 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-white/70 flex items-center justify-center text-xl font-bold text-slate-700 shadow">
        {initials || "HB"}
      </div>
    </div>
  );
}

export default function RestaurantCard({ r }: { r: any }) {
  // Build a Google Maps *search* URL (no API key needed)
  const q = [r.name, r.address, r.city, r.state, r.zip].filter(Boolean).join(" ");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border hover:shadow-md transition bg-white">
      {/* Hero image (no-API fallback) */}
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${r.name} on Google Maps`}>
        {/* If you later add r.image (a local path under /public/images) show it; else show initials */}
        {r.image ? (
          <img src={r.image} alt={r.name} className="w-full h-40 object-cover" loading="lazy" />
        ) : (
          <InitialBadge name={r.name || "HalalBitesHub"} />
        )}
      </a>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-lg hover:underline">
            {r.name}
          </a>
          <span
            className={
              "px-2 py-0.5 rounded-full text-xs border " +
              ((r.certification || "").toLowerCase().includes("hfsaa")
                ? "bg-green-50 border-green-300 text-green-700"
                : "bg-yellow-50 border-yellow-300 text-yellow-700")
            }
          >
            {r.certification || "self-declared"}
          </span>
        </div>

        <div className="text-sm text-gray-600">{r.cuisine || r.category}</div>
        <div className="text-sm text-gray-600">
          {[r.address, r.city, r.state, r.zip].filter(Boolean).join(", ")}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {r.website && (
            <a
              className="px-3 py-1 rounded-full border text-sm hover:bg-gray-50"
              href={r.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          )}
          <a
            className="px-3 py-1 rounded-full border text-sm hover:bg-gray-50"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Directions
          </a>
          {r.phone && (
            <a className="px-3 py-1 rounded-full border text-sm hover:bg-gray-50" href={`tel:${r.phone}`}>
              Call
            </a>
          )}
          <a
            className="px-3 py-1 rounded-full border text-sm hover:bg-gray-50"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View reviews
          </a>
        </div>
      </div>
    </div>
  );
}

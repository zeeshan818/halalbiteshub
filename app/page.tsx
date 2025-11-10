"use client";
import React, { useMemo, useState } from "react";
import data from "./data/restaurants.json";
import RestaurantCard from "./(site)/components/RestaurantCard";
import AdSlot from "../components/AdSlot"; // <-- fixed path (../components)

type Rec = {
  id: string;
  name: string;
  category?: string;
  cuisine?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  website?: string;
  certification?: string;
};

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr.filter(Boolean))) as T[];
}

function Filters({ rows, onChange }: { rows: Rec[]; onChange: (q: any) => void }) {
  const zips = useMemo(() => unique(rows.map((r) => r.zip || "")).sort(), [rows]);
  const cities = useMemo(() => unique(rows.map((r) => r.city || "")).sort(), [rows]);
  const cats = useMemo(() => unique(rows.map((r) => r.category || "")).sort(), [rows]);

  const [text, setText] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [cat, setCat] = useState("");
  const [certOnly, setCertOnly] = useState(false);

  React.useEffect(() => {
    onChange({ text, zip, city, cat, certOnly });
  }, [text, zip, city, cat, certOnly, onChange]);

  return (
    <div className="grid gap-3 md:grid-cols-5">
      <input
        className="border rounded-xl px-4 py-2 shadow-sm"
        placeholder="Search name or cuisine (e.g., 'broast', 'shawarma')"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select className="border rounded-xl px-4 py-2 shadow-sm" value={zip} onChange={(e) => setZip(e.target.value)}>
        <option value="">All ZIPs</option>
        {zips.map((z) => (
          <option key={z} value={z}>
            {z}
          </option>
        ))}
      </select>
      <select className="border rounded-xl px-4 py-2 shadow-sm" value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">All Cities</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select className="border rounded-xl px-4 py-2 shadow-sm" value={cat} onChange={(e) => setCat(e.target.value)}>
        <option value="">All Categories</option>
        {cats.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <label className="flex items-center gap-2 text-sm px-2">
        <input type="checkbox" checked={certOnly} onChange={(e) => setCertOnly(e.target.checked)} />
        HFSAA only
      </label>
    </div>
  );
}

export default function Page() {
  const rows: Rec[] = (data as any) || [];
  const [q, setQ] = useState<any>({});

  const filtered = useMemo(() => {
    const txt = (q.text || "").toLowerCase();
    return rows.filter((r) => {
      if (q.zip && r.zip !== q.zip) return false;
      if (q.city && (r.city || "") !== q.city) return false;
      if (q.cat && (r.category || "") !== q.cat) return false;
      if (q.certOnly && !(r.certification || "").toLowerCase().includes("hfsaa")) return false;
      if (txt) {
        const hay = [r.name, r.cuisine, r.category, r.address, r.city, r.zip].join(" ").toLowerCase();
        if (!hay.includes(txt)) return false;
      }
      return true;
    });
  }, [rows, q]);

  return (
    <main className="container py-8">
      {/* Hero */}
      <section className="rounded-3xl p-6 md:p-10 bg-gradient-to-br from-emerald-50 to-cyan-50 border mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Find Halal Food in Illinois</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          HFSAA-certified first, plus clearly labeled self-declared listings. Search by city, zip, or cuisine.
        </p>
        <div className="mt-6">
          <Filters rows={rows} onChange={setQ} />
        </div>
      </section>

      {/* Top Ad */}
      <div className="my-6">
        <AdSlot slot="7967646625" />
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-600">{filtered.length} places</div>
        <a href="/submit" className="text-sm underline">
          Suggest a restaurant
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((r: any) => (
          <RestaurantCard key={r.id} r={r} />
        ))}
      </div>

      {/* Bottom Ad */}
      <div className="my-12">
        <AdSlot slot="7967646625" />
      </div>
    </main>
  );
}

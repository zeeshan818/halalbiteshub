"use client";

import RestaurantCard from "./(site)/components/RestaurantCard";
import data from "../public/data/restaurants.json";
import { useMemo, useState } from "react";

type R = typeof data extends Array<infer T> ? T : never;

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export default function Home() {
  const all: R[] = (data as any) as R[];
  const zips = uniq(all.map((r) => r.zip)).sort();
  const cities = uniq(all.map((r) => r.city)).sort();

  return (
    <main className="container py-6">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Find Halal Spots Nearby</h1>
        <p className="text-gray-600 mt-1">
          HFSAA-certified first, clearly labeled self-declared options too.
        </p>
      </header>
      <Filters zips={zips} cities={cities} />
      <Results all={all} />
    </main>
  );
}

const bus: any = typeof window !== "undefined" ? window : {};
function setQ(k: string, v: string) {
  bus.state = { ...(bus.state || {}), [k]: v };
  window.dispatchEvent(new Event("q"));
}

function Filters({ zips, cities }: { zips: string[]; cities: string[] }) {
  return (
    <div className="grid md:grid-cols-5 gap-3 mb-5">
      <select className="border rounded-xl p-2" onChange={(e) => setQ("zip", e.target.value)}>
        <option value="">All ZIPs</option>
        {zips.map((z) => (
          <option key={z} value={z}>
            {z}
          </option>
        ))}
      </select>

      <select className="border rounded-xl p-2" onChange={(e) => setQ("city", e.target.value)}>
        <option value="">All Cities</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select className="border rounded-xl p-2" onChange={(e) => setQ("cert", e.target.value)}>
        <option value="">All Certifications</option>
        <option value="hfsaa">HFSAA-certified only</option>
        <option value="self">Self-declared only</option>
      </select>

      <select className="border rounded-xl p-2" onChange={(e) => setQ("cat", e.target.value)}>
        <option value="">All Categories</option>
        <option value="Restaurant">Restaurant</option>
        <option value="Cafe/Tea">Cafe/Tea</option>
        <option value="Bakery/Sweets">Bakery/Sweets</option>
      </select>

      <input
        className="border rounded-xl p-2"
        placeholder="Search name, cuisine, address..."
        onChange={(e) => setQ("q", e.target.value)}
      />
    </div>
  );
}

function Results({ all }: { all: R[] }) {
  const [_, setTick] = useState(0);
  if (typeof window !== "undefined") window.addEventListener("q", () => setTick((x) => x + 1));
  const s: any = (typeof window !== "undefined" && (window as any).state) || {};

  const rows = useMemo(() => {
    const q = (s.q || "").toLowerCase();
    const city = s.city || "";
    const zip = s.zip || "";
    const cert = s.cert || "";
    const cat = s.cat || "";

    return all.filter((r) => {
      const matchesQ =
        !q ||
        [r.name, r.cuisine, r.category, r.address, r.city, r.zip]
          .join(" ")
          .toLowerCase()
          .includes(q);

      const matchesCity = !city || r.city === city;
      const matchesZip = !zip || r.zip === zip;
      const matchesCat = !cat || (r.category || "").toLowerCase().includes(cat.toLowerCase());

      const c = (r.certification || "").toLowerCase();
      const matchesCert = !cert || (cert === "hfsaa" ? c.includes("hfsaa") : !c.includes("hfsaa"));

      return matchesQ && matchesCity && matchesZip && matchesCat && matchesCert;
    });
  }, [_, all]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rows.map((r) => (
        <RestaurantCard key={(r as any).id} r={r as any} />
      ))}
      {rows.length === 0 && <div className="text-gray-500">No results. Try clearing filters.</div>}
    </div>
  );
}

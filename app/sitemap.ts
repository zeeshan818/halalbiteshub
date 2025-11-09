import type { MetadataRoute } from "next";
import all from "./data/restaurants.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://halalbiteshub.com";
  const zips = Array.from(new Set((all as any[]).map(r => (r.zip||"").trim()).filter(Boolean)));
  const cities = Array.from(new Set((all as any[]).map(r => (r.city||"").trim()).filter(Boolean)));
  const cats = Array.from(new Set((all as any[]).map(r => (r.category||"").trim()).filter(Boolean)));
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 }
  ];

  zips.forEach(z => entries.push({ url: `${base}/z/${encodeURIComponent(z)}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 }));
  cities.forEach(c => entries.push({ url: `${base}/city/${encodeURIComponent(c)}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 }));
  cats.forEach(c => entries.push({ url: `${base}/category/${encodeURIComponent(c)}`, lastModified: now, changeFrequency: "weekly", priority: 0.6 }));

  return entries;
}

import data from "../public/data/restaurants.json";
export default async function sitemap() {
  const base = "https://www.halalbiteshub.com";
  const routes = ["", "/contact", "/submit"].map((p) => ({ url: base + p, changeFrequency: "weekly", priority: 0.8 }));
  const zips = Array.from(new Set((data as any[]).map((r:any)=>r.zip)));
  const zipRoutes = zips.map((z:string) => ({ url: `${base}/z/${z}`, changeFrequency: "weekly", priority: 0.7 }));
  return [...routes, ...zipRoutes];
}

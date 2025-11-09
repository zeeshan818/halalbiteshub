import all from "../../data/restaurants.json";

export async function generateStaticParams(){
  const cities = Array.from(new Set((all as any[]).map(r => (r.city||"").trim()).filter(Boolean)));
  return cities.map(c => ({ city: c }));
}

export function generateMetadata({ params }:{ params: { city: string }}){
  const city = decodeURIComponent(params.city);
  return {
    title: `Halal Restaurants in ${city} • HalalBitesHub`,
    description: `Discover halal-friendly restaurants in ${city}. HFSAA-certified first, plus clearly labeled self-declared.`,
  };
}

export default function Page({ params }:{ params: { city: string }}){
  const city = decodeURIComponent(params.city);
  const list = (all as any[]).filter(r => (r.city||"") === city);
  return (
    <main className="container py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Halal Restaurants in {city}</h1>
      <p className="text-gray-600 mb-6">Curated list for {city}.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((r:any)=>(
          <div key={r.id} className="rounded-xl border p-4">
            <div className="font-semibold">{r.name}</div>
            <div className="text-sm text-gray-600">{[r.address, r.city, r.state, r.zip].filter(Boolean).join(", ")}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

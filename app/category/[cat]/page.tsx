import all from "../../data/restaurants.json";

export async function generateStaticParams(){
  const cats = Array.from(new Set((all as any[]).map(r => (r.category||"").trim()).filter(Boolean)));
  return cats.map(c => ({ cat: c }));
}

export function generateMetadata({ params }:{ params: { cat: string }}){
  const cat = decodeURIComponent(params.cat);
  return {
    title: `${cat} • HalalBitesHub`,
    description: `Browse halal-friendly places by category: ${cat}.`,
  };
}

export default function Page({ params }:{ params: { cat: string }}){
  const cat = decodeURIComponent(params.cat);
  const list = (all as any[]).filter(r => (r.category||"") === cat);
  return (
    <main className="container py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">{cat}</h1>
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

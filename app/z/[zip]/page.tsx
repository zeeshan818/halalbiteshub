import all from "../../data/restaurants.json";

export async function generateStaticParams(){
  const zips = Array.from(new Set((all as any[]).map(r => (r.zip||"").trim()).filter(Boolean)));
  return zips.map(z => ({ zip: z }));
}

export function generateMetadata({ params }:{ params:{ zip:string }}){
  const zip = params.zip;
  return {
    title: `Halal Restaurants in ${zip} • HalalBitesHub`,
    description: `Find halal-friendly restaurants near ${zip}. HFSAA-certified first, plus clearly labeled self-declared.`,
  };
}

export default function Page({ params }:{ params:{ zip: string }}){
  const zip = params.zip;
  const list = (all as any[]).filter(r => (r.zip||"") === zip);
  return (
    <main className="container py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Halal Restaurants in {zip}</h1>
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

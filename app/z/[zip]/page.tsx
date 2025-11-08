import data from "../../data/restaurants.json";
type R = typeof data extends Array<infer T> ? T : never;
export async function generateStaticParams(){
  const all: any[] = (data as any);
  const zips = Array.from(new Set(all.map(r => r.zip)));
  return zips.map(z => ({ zip: z }));
}
export async function generateMetadata({ params }: { params: { zip: string } }){
  const zip = params.zip;
  return { title: `Halal restaurants in ${zip} — HalalBitesHub`, description: `Browse halal restaurants in ZIP ${zip}.` };
}
export default function ZipPage({ params }: { params: { zip: string } }){
  const all: any[] = (data as any);
  const rows = all.filter(r => r.zip === params.zip);
  return (<main className="container py-8">
    <h1 className="text-2xl md:text-3xl font-bold mb-4">Halal Restaurants in {params.zip}</h1>
    {rows.length === 0 && <p className="text-gray-500">No listings yet for this ZIP.</p>}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rows.map((r: any) => (<a key={r.id} href="/" className="card">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{r.name}</h3>
          <span className={"badge " + ((r.certification||'').toLowerCase().includes('hfsaa') ? "bg-green-50 border-green-300 text-green-700" : "bg-yellow-50 border-yellow-300 text-yellow-700")}>{r.certification}</span>
        </div>
        <p className="text-sm">{r.cuisine || r.category}</p>
        <p className="text-sm text-gray-600">{r.address}, {r.city}, {r.state} {r.zip}</p>
      </a>))}
    </div>
  </main>);
}
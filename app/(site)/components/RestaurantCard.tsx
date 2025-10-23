type R={id:string;name:string;category?:string;cuisine?:string;address:string;city:string;state:string;zip:string;phone?:string;website?:string;certification?:string;sources?:string[];};
export default function RestaurantCard({r}:{r:R}){
  const isHfsaa=(r.certification||"" ).toLowerCase().includes("hfsaa");const isSelf=(r.certification||"" ).toLowerCase().includes("self");
  return(<a className="card" href={r.website||'#'} target={r.website?"_blank":"_self"} rel="noreferrer">
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-lg font-semibold">{r.name}</h3>
      {r.certification&&(<span className={"badge "+(isHfsaa?"bg-green-50 border-green-300 text-green-700":isSelf?"bg-yellow-50 border-yellow-300 text-yellow-700":"bg-gray-50 border-gray-300")}>{r.certification}</span>)}
    </div>
    <p className="text-sm mt-1">{r.cuisine||r.category}</p>
    <p className="text-sm text-gray-600">{r.address}, {r.city}, {r.state} {r.zip}</p>
    {r.phone&&<p className="text-sm text-gray-600">{r.phone}</p>}
  </a>);
}
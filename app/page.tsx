"use client";
import React, { useMemo, useState } from "react";
import data from "./data/restaurants.json";
import RestaurantCard from "./(site)/components/RestaurantCard";

type Rec = {
  id:string; name:string; category?:string; cuisine?:string;
  address?:string; city?:string; state?:string; zip?:string;
  phone?:string; website?:string; certification?:string;
};

function unique<T>(arr:T[]):T[]{ return Array.from(new Set(arr.filter(Boolean))) as T[]; }

function Filters({ rows, onChange }:{ rows:Rec[]; onChange:(q:any)=>void; }){
  const zips  = useMemo(()=> unique(rows.map(r=>r.zip || "" )).sort(), [rows]);
  const cities= useMemo(()=> unique(rows.map(r=>r.city||"")).sort(), [rows]);
  const cats  = useMemo(()=> unique(rows.map(r=>r.category||"")).sort(), [rows]);

  const [text, setText]         = useState("");
  const [zip, setZip]           = useState("");
  const [city, setCity]         = useState("");
  const [cat, setCat]           = useState("");
  const [certOnly, setCertOnly] = useState(false);

  React.useEffect(()=>{ onChange({ text, zip, city, cat, certOnly }); }, [text, zip, city, cat, certOnly, onChange]);

  return (<div className="grid gap-3 md:grid-cols-5 mb-6">
      <input className="border rounded-lg px-3 py-2" placeholder="Search name/cuisine..." value={text} onChange={e=>setText(e.target.value)} />
      <select className="border rounded-lg px-3 py-2" value={zip} onChange={e=>setZip(e.target.value)}>
        <option value="">All ZIPs</option>
        {zips.map(z=><option key={z} value={z}>{z}</option>)}
      </select>
      <select className="border rounded-lg px-3 py-2" value={city} onChange={e=>setCity(e.target.value)}>
        <option value="">All Cities</option>
        {cities.map(c=><option key={c} value={c}>{c}</option>)}
      </select>
      <select className="border rounded-lg px-3 py-2" value={cat} onChange={e=>setCat(e.target.value)}>
        <option value="">All Categories</option>
        {cats.map(c=><option key={c} value={c}>{c}</option>)}
      </select>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={certOnly} onChange={e=>setCertOnly(e.target.checked)} />
        HFSAA only
      </label>
    </div>);
}

export default function Page(){
  const rows: Rec[] = (data as any);
  const [q, setQ] = useState<any>({});

  const filtered = useMemo(()=>{
    const txt = (q.text||"").toLowerCase();
    return rows.filter(r=>{
      if (q.zip  && r.zip !== q.zip) return false;
      if (q.city && (r.city||"") !== q.city) return false;
      if (q.cat  && (r.category||"") !== q.cat) return false;
      if (q.certOnly && !(r.certification||"").toLowerCase().includes("hfsaa")) return false;
      if (txt){
        const hay = [r.name, r.cuisine, r.category, r.address, r.city, r.zip].join(" ").toLowerCase();
        if (!hay.includes(txt)) return false;
      }
      return true;
    });
  }, [rows, q]);

  return (<main className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Discover Halal Spots Near You</h1>
        <p className="text-gray-600">HFSAA-certified and carefully labeled self-declared listings.</p>
      </div>
      <Filters rows={rows} onChange={setQ} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((r:any)=>(<RestaurantCard key={r.id} r={r}/>))}
      </div>
    </main>);
}
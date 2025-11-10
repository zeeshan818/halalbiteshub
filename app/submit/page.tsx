"use client";
import React, { useState } from "react";

export default function Page(){
  const [form, setForm] = useState<any>({});
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string|undefined>();

  function upd(k:string, v:string){ setForm((s:any)=>({ ...s, [k]: v })); }

  async function onSubmit(e:React.FormEvent){
    e.preventDefault();
    setError(undefined);

    if (!form.name || !form.city) {
      setError("Name and City are required.");
      return;
    }
    try{
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    }catch{
      setError("Could not send right now. Please email contact@halalbiteshub.com");
    }
  }

  if (sent){
    return (
      <main className="container py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">Thanks for your suggestion!</h1>
        <p className="text-gray-600">We’ll review and add it soon.</p>
      </main>
    );
  }

  return (
    <main className="container py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Suggest a Restaurant</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="border rounded-lg px-3 py-2" placeholder="Restaurant name *" onChange={e=>upd("name", e.target.value)} />
          <input className="border rounded-lg px-3 py-2" placeholder="Cuisine / Category" onChange={e=>upd("category", e.target.value)} />
          <input className="border rounded-lg px-3 py-2" placeholder="Address" onChange={e=>upd("address", e.target.value)} />
          <input className="border rounded-lg px-3 py-2" placeholder="City *" onChange={e=>upd("city", e.target.value)} />
          <input className="border rounded-lg px-3 py-2" placeholder="State (IL)" onChange={e=>upd("state", e.target.value||"IL")} />
          <input className="border rounded-lg px-3 py-2" placeholder="ZIP" onChange={e=>upd("zip", e.target.value)} />
          <input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="Website (optional)" onChange={e=>upd("website", e.target.value)} />
          <input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="Phone (optional)" onChange={e=>upd("phone", e.target.value)} />
        </div>
        <div className="text-sm text-gray-600">* required</div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white">Submit</button>
      </form>

      <details className="mt-6">
        <summary className="cursor-pointer">Preview JSON</summary>
        <pre className="bg-gray-50 p-3 rounded-lg text-sm mt-2">{JSON.stringify(form, null, 2)}</pre>
      </details>
    </main>
  );
}

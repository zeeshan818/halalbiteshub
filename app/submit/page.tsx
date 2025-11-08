export const metadata = { title: "Submit a Restaurant — HalalBitesHub" };
export default function SubmitPage(){
  return (<main className="container py-10 max-w-2xl">
    <h1 className="text-3xl font-bold mb-4">Submit a Restaurant</h1>
    <p className="text-gray-600 mb-6">Know a great halal spot we missed? Submit it here.</p>
    <form method="POST" action="https://formspree.io/f/your-id" className="grid gap-3">
      <input required name="name" placeholder="Restaurant name" className="border rounded-xl p-3"/>
      <input required name="address" placeholder="Address" className="border rounded-xl p-3"/>
      <div className="grid grid-cols-2 gap-3">
        <input required name="city" placeholder="City" className="border rounded-xl p-3"/>
        <input required name="zip" placeholder="ZIP" className="border rounded-xl p-3"/>
      </div>
      <input name="website" placeholder="Website (optional)" className="border rounded-xl p-3"/>
      <select name="certification" className="border rounded-xl p-3">
        <option value="self-declared">Self‑declared</option>
        <option value="HFSAA-certified">HFSAA‑certified</option>
      </select>
      <textarea name="notes" placeholder="Anything else?" className="border rounded-xl p-3 h-32"/>
      <button className="px-4 py-2 rounded-xl bg-accent text-white">Submit</button>
    </form>
  </main>);
}
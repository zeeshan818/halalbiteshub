export const metadata = { title: "Contact — HalalBitesHub" };
export default function ContactPage(){
  return (<main className="container py-10 max-w-2xl">
    <h1 className="text-3xl font-bold mb-4">Contact</h1>
    <p className="text-gray-600 mb-6">Have a correction, media inquiry, or partnership idea? Send us a note.</p>
    <form method="POST" action="https://formspree.io/f/your-id" className="grid gap-3">
      <input required name="name" placeholder="Your name" className="border rounded-xl p-3"/>
      <input required type="email" name="email" placeholder="Your email" className="border rounded-xl p-3"/>
      <textarea required name="message" placeholder="Your message" className="border rounded-xl p-3 h-40"/>
      <button className="px-4 py-2 rounded-xl bg-ink text-white">Send</button>
    </form>
    <p className="text-xs text-gray-500 mt-2">Replace action URL with your preferred form handler.</p>
  </main>);
}
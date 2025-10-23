import "./../styles/globals.css";
export const metadata={title:"HalalBitesHub — Chicago & Suburbs",description:"One‑stop halal restaurant directory for Chicago & suburbs with HFSAA certification filters."};
export default function RootLayout({children}:{children:React.ReactNode}){
  return(<html lang="en"><body className="min-h-screen">
  <div className="border-b bg-white/70 backdrop-blur sticky top-0 z-50">
    <div className="container flex items-center justify-between py-3">
      <div className="flex items-center gap-2"><span className="text-2xl">🍽️</span><span className="font-bold text-xl">HalalBitesHub</span></div>
      <a href="https://www.hfsaa.org" target="_blank" className="text-sm underline hover:no-underline">HFSAA</a>
    </div>
  </div>
  {children}
  <footer className="mt-16 border-t"><div className="container py-6 text-sm text-gray-600">© {new Date().getFullYear()} HalalBitesHub — Chicago & Suburbs</div></footer>
  </body></html>);
}
export async function POST(req: Request){
  const body = await req.json();
  return new Response(JSON.stringify({ ok: true, received: body }), { headers: { "Content-Type": "application/json" } });
}

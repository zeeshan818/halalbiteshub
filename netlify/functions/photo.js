// netlify/functions/photo.js
export async function handler(event) {
  const ref = event.queryStringParameters.ref;
  const maxwidth = event.queryStringParameters.maxwidth || '640';
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!ref || !key) return { statusCode: 400, body: 'Missing ref or API key' };
  const url = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${encodeURIComponent(ref)}&maxwidth=${encodeURIComponent(maxwidth)}&key=${key}`;
  const resp = await fetch(url);
  const buf = Buffer.from(await resp.arrayBuffer());
  const ct = resp.headers.get('content-type') || 'image/jpeg';
  return { statusCode: 200, headers: { 'Content-Type': ct, 'Cache-Control': 'public, max-age=86400' }, body: buf.toString('base64'), isBase64Encoded: true };
}
// netlify/functions/ogimage.js
export async function handler(event) {
  try{
    const url = event.queryStringParameters.url;
    if (!url) return { statusCode: 400, body: "Missing ?url=" };
    const page = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 HalalBitesHub' } });
    const html = await page.text();
    const m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    const imgUrl = m ? m[1] : null;
    if (!imgUrl) return { statusCode: 204, body: "" };
    const imgResp = await fetch(imgUrl);
    const buf = Buffer.from(await imgResp.arrayBuffer());
    const ct = imgResp.headers.get('content-type') || 'image/jpeg';
    return { statusCode: 200, headers: { 'Content-Type': ct, 'Cache-Control': 'public, max-age=86400' }, body: buf.toString('base64'), isBase64Encoded: true };
  }catch(e){
    return { statusCode: 500, body: "error" };
  }
}
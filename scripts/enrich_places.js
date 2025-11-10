// scripts/enrich_places.js
const fs = require('fs'); const path = require('path');
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
if (!API_KEY) { console.error('ERROR: Set GOOGLE_MAPS_API_KEY'); process.exit(1); }
function csvParse(t){const [h,...ls]=t.trim().split(/\r?\n/);const cs=h.split(',');return ls.map(l=>{const p=l.split(',');const o={};cs.forEach((c,i)=>o[c]=(p[i]||'').trim());return o;});}
async function fetchJson(u){const r=await fetch(u); if(!r.ok) throw new Error('HTTP '+r.status); return await r.json();}
(async()=>{
  const master=path.join(__dirname,'..','public','data','_master.csv');
  const rows=csvParse(fs.readFileSync(master,'utf-8'));
  const out=[];
  for (const r of rows){
    const q=encodeURIComponent(`${r.name} ${r.address} ${r.city} ${r.state} ${r.zip}`.trim());
    const find=`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${q}&inputtype=textquery&fields=place_id&key=${API_KEY}`;
    try{
      const f=await fetchJson(find);
      const pid=f.candidates?.[0]?.place_id; if(!pid){ out.push({id:r.id,zip:r.zip,place_id:null}); continue; }
      const fields=['name','formatted_address','formatted_phone_number','website','url','rating','user_ratings_total','photos'].join(',');
      const det=`https://maps.googleapis.com/maps/api/place/details/json?place_id=${pid}&fields=${fields}&key=${API_KEY}`;
      const d=await fetchJson(det); const x=d.result||{};
      out.push({ id:r.id, zip:r.zip, place_id:pid, maps_url:x.url||null, phone:x.formatted_phone_number||null, website:x.website||r.website||null, rating:x.rating||null, rating_count:x.user_ratings_total||0, photo_ref:x.photos?.[0]?.photo_reference||null, photo_attrib:x.photos?.[0]?.html_attributions?.[0]||null });
      await new Promise(res=>setTimeout(res,200));
    }catch(e){ out.push({id:r.id,zip:r.zip,place_id:null}); }
  }
  const outDir=path.join(__dirname,'..','app','data'); fs.mkdirSync(outDir,{recursive:true});
  fs.writeFileSync(path.join(outDir,'places_enriched.json'), JSON.stringify(out,null,2));
  console.log('Wrote app/data/places_enriched.json with', out.length, 'records');
})();
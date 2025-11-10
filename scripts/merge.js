// scripts/merge.js
const fs=require('fs'), path=require('path');
const readPub=(p)=>JSON.parse(fs.readFileSync(path.join(__dirname,'..','public','data',p),'utf-8'));
const h=readPub('hfsaa_certified.json'); const s=readPub('self_declared.json'); const all=[...h,...s];
let enr=[]; try{enr=JSON.parse(fs.readFileSync(path.join(__dirname,'..','app','data','places_enriched.json'),'utf-8'));}catch{enr=[];}
const map=new Map(enr.map(e=>[e.id,e]));
const merged=all.map(r=>{const e=map.get(r.id); return e?{...r,maps_url:e.maps_url||null,place_id:e.place_id||null,phone:e.phone||r.phone||null,website:e.website||r.website||null,rating:e.rating||null,rating_count:e.rating_count||0,photo_ref:e.photo_ref||null,photo_attrib:e.photo_attrib||null}:r;});
const dir=path.join(__dirname,'..','app','data'); fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'restaurants.json'), JSON.stringify(merged,null,2));
const zips=[...new Set(merged.map(x=>x.zip))].sort(); fs.writeFileSync(path.join(dir,'zips.json'), JSON.stringify(zips,null,2));
console.log(`Merged ${h.length} HFSAA + ${s.length} self-declared => ${merged.length} total. Zips: ${zips.length} (with enrichment: ${enr.length})`);
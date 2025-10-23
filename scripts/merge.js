const fs=require('fs');const path=require('path');
const h=JSON.parse(fs.readFileSync(path.join(__dirname,'../public/data/hfsaa_certified.json'),'utf-8'));
const s=JSON.parse(fs.readFileSync(path.join(__dirname,'../public/data/self_declared.json'),'utf-8'));
const m=[...h,...s];fs.writeFileSync(path.join(__dirname,'../public/data/restaurants.json'),JSON.stringify(m,null,2));
console.log(`Merged ${h.length} HFSAA + ${s.length} self-declared => ${m.length} total.`);
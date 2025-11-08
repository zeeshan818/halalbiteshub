const fs = require('fs'); const path = require('path');
const r = (p)=>JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'data', p),'utf-8'));
const h = r('hfsaa_certified.json'); const s = r('self_declared.json');
const m = [...h, ...s];
fs.writeFileSync(path.join(__dirname,'..','public','data','restaurants.json'), JSON.stringify(m, null, 2));
const zips = [...new Set(m.map(x=>x.zip))].sort();
fs.writeFileSync(path.join(__dirname,'..','public','data','zips.json'), JSON.stringify(zips, null, 2));
console.log(`Merged ${h.length} HFSAA + ${s.length} self-declared => ${m.length} total. Zips: ${zips.length}`);

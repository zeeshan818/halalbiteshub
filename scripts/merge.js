// scripts/merge.js
const fs = require("fs");
const path = require("path");

const read = (p) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "..", "public", "data", p), "utf-8"));

const h = read("hfsaa_certified.json");
const s = read("self_declared.json");
const all = [...h, ...s];

// ensure app/data exists
const dataDir = path.join(__dirname, "..", "app", "data");
fs.mkdirSync(dataDir, { recursive: true });

// write merged data for app imports
fs.writeFileSync(path.join(dataDir, "restaurants.json"), JSON.stringify(all, null, 2));

// write zips index (optional)
const zips = [...new Set(all.map((x) => x.zip))].sort();
fs.writeFileSync(path.join(dataDir, "zips.json"), JSON.stringify(zips, null, 2));

console.log(`Merged ${h.length} HFSAA + ${s.length} self-declared => ${all.length} total. Zips: ${zips.length}`);

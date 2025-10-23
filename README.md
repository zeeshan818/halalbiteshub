# HalalBitesHub — Ready-to-Run
**Next.js 14 + Tailwind** directory for HFSAA‑certified & self‑declared halal restaurants.

## Run locally
```bash
npm i
node scripts/merge.js
npm run dev
```

## Deploy (Netlify)
- Import repo from GitHub → Build: `npm run build` → Publish: `.next`
- Add `www.halalbiteshub.com` → Enable HTTPS

## Data
- `public/data/hfsaa_certified.json` — authoritative (HFSAA)
- `public/data/self_declared.json` — community/self‑declared
- `public/data/restaurants.json` — merged (generated)

## Add ZIPs
Append to the JSON files and re-run `node scripts/merge.js`.

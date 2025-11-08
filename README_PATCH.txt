# A+B Upgrade Patch
Apply this patch over your repo, then commit & push.

## What’s included
- Branding: favicon, OG image, header/footer polish
- GA4 hook in layout (replace G-XXXX)
- Organization JSON-LD
- /contact and /submit pages
- Dynamic ZIP pages at /z/[zip]
- Sitemap generator
- CSV → JSON tooling and updated merge (writes zips.json)

## How to apply
Unzip into your repo folder (allow overwrite), then run:
```
git add .
git commit -m "A+B upgrade: branding, SEO, zip pages, sitemap, forms, data tooling"
git push
```
Netlify will rebuild automatically.

## Data workflow
Edit `public/data/_master.csv`, then:
```
python scripts/csv_to_json.py public/data/_master.csv public/data/hfsaa_certified.json public/data/self_declared.json
node scripts/merge.js
git add public/data/*.json public/data/_master.csv
git commit -m "Data: new listings"
git push
```

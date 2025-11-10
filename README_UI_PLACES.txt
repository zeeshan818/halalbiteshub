# Fancy UI + Google Places Enrichment Patch

## Steps
1) Add Netlify env var: `GOOGLE_MAPS_API_KEY`.
2) Run locally:
```
node scripts/enrich_places.js
node scripts/merge.js
git add app/data/places_enriched.json app/data/restaurants.json app/data/zips.json scripts/enrich_places.js scripts/merge.js netlify/functions/photo.js app/(site)/components/RestaurantCard.tsx app/page.tsx
git commit -m "UI: fancy cards + Google ratings/maps/photos (serverless proxy)"
git push
```
3) Netlify will rebuild; cards show photos, ratings, and buttons. 

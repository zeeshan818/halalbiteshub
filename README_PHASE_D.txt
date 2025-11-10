# Phase D Patch — UX polish, Claim CTA, Suggest flow

## What this adds
- Nicer hero + spacing on homepage
- Restored Filters + Ads intact
- Card buttons: Website / Directions / Call / Reviews + **Claim / Update** mailto CTA
- Improved Suggest page with validation and JSON preview
- API route stub at `/api/suggest` (can later wire to email or Sheets)

## Install
1) Copy these into your repo:
   - `app/page.tsx`
   - `app/(site)/components/RestaurantCard.tsx`
   - `app/submit/page.tsx`
   - `app/api/suggest/route.ts`
2) Commit and deploy.

## Next
- I can wire `/api/suggest` to send an email or write straight to Google Sheets.
- Data expansion: drop a bigger `_master.csv` and run `node scripts/merge.js`.

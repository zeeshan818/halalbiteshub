# Phase C Patch — AdSense + SEO landers + Policies

## What this adds
- **AdSense wiring** (provider + responsive ad slot component)
- **ads.txt** (place your publisher ID)
- **Legal pages**: /legal/privacy and /legal/terms
- **SEO landers**: /z/[zip], /city/[city], /category/[cat]
- **Sitemap** includes all of the above

## Setup (10 minutes)
1) **AdSense**
   - Create/confirm your AdSense account.
   - Add **halalbiteshub.com** as a site.
   - Get your **Publisher ID** (looks like `pub-1234567890123456`).
   - Put it in: `public/ads.txt` (replace the zeros) and in your page where you render `<AdSlot ...>`.
   - Ad slots won’t show until AdSense approves the site.

2) **Place ad slots**
   - Import and render `AdSlot` wherever you want ads, for example in `app/page.tsx`:
     ```tsx
     import AdSlot from "./(site)/ads/AdSlot";
     // <AdSlot publisherId="pub-1234567890123456" slotId="YOUR_SLOT_ID" />
     ```

3) **Commit & deploy**
   ```bash
   git add app/(site)/ads/*.tsx app/(site)/legal/*/*.tsx app/z/[zip]/page.tsx app/city/[city]/page.tsx app/category/[cat]/page.tsx app/sitemap.ts public/ads.txt
   git commit -m "Phase C: AdSense + SEO landers + policies + sitemap"
   git push
   ```

4) **Request AdSense review**
   - After deploy, in AdSense click **Request Review** for halalbiteshub.com

## Notes
- We avoid aggressive ad density; add 1–3 units (top, mid-page, footer) for approval.
- Use the filters/search to keep content helpful — this boosts your approval odds.

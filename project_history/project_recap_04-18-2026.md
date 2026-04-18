```         
That should give you everything you need to pick up the thread cleanly. The most important thing to do first in the new session is run `python scrape_ahc.py --details-only` — the parser is now fixed and tested, so that should go smoothly. Good luck!
```

# PDX Affordable Housing — Project Handoff

Session summary · April 18, 2026 · abalter.github.io/pdx-affordable-housing

245

properties in master list

40

AHC income-restricted listings

3

data sources merged

\~\$2

total API spend (agent)

## What was built

### Live app

Single-file HTML app at index.html — map + list split view (Leaflet/CartoDB), search, region chips, program filters, age/unit/rent filters, Street View links, Google search links. Deployed on GitHub Pages.

### Data pipeline scripts (all in repo root)

-   

-   property_agent.py — Claude Haiku agent: web search → URL selection → page fetch → structured extraction. Processed all 245 properties. \~\$2 total cost.

-   

-   scrape_ahc.py — AffordableHousing.com scraper via discovered JSON API (POST /v4/AjaxHandler?message=SearchListings). Fetches 40 income-restricted Portland listings + detail pages. Needs fresh browser cookies to re-run.

-   

-   apply_manual_updates.py — reads "Manual URL" column from agent_review.xlsx No_Website sheet, fetches + extracts, updates JSON.

-   

-   scrape_aho.py — AffordableHousingOnline.com scraper (2023 vintage data, \~320 props).

-   

### Data files

-   

-   data/properties.js — 245 properties as const PROPS = \[...\], used by the app

-   

-   agent_results.json — agent output: website URLs + extracted data per property

-   

-   agent_review.xlsx — 3-sheet workbook: Summary, No_Website, Errors

-   

-   ahc_listings.json — 40 AHC listings with exact GPS coords + rent ranges

-   

-   ahc_details.json — AHC detail page data (fees, utilities, units, pet policy)

-   

-   ahc_review.xlsx — AHC data in spreadsheet form

-   

## Data sources & hierarchy

1

**Property's own website** — ground truth. Found for \~160/245 via agent. Rents, waitlist text, amenities, email.

2

**NWPP PDFs (March 2026)** — 245 Multnomah County properties. Authoritative on program type (HUD / PBV / Tax Credit), eligibility, unit counts. Source of the master list.

3

**AffordableHousing.com (AHC, 2026)** — 40 income-restricted Portland listings. Best source for exact GPS coords, fees (app fee, security deposit), utilities breakdown (tenant vs owner paid), move-in estimates, unit-level rent + sqft.

4

**AffordableHousingOnline.com (AHO, 2023)** — \~320 properties, older data. Fill remaining gaps only.

## What worked well

-   

-   Agent found high-confidence website URLs for \~160/245 properties using Claude Haiku web search

-   

-   REACH, Guardian, Cascade portfolio pages extracted waitlist status + amenities cleanly

-   

-   Silvercrest got staff email directly; many properties got phone numbers

-   

-   AHC API discovery — found the JSON endpoint via DevTools Network tab; returns exact GPS coords, rent ranges, availability text, and SEO URLs for all 40 properties in 2 API calls

-   

-   AHC detail parser (rewritten with CSS selectors) correctly extracts units, fees, utilities, pet policy, age restriction, property website URL, renters insurance flag

-   

-   Cost: \~\$2 for 245 properties (Haiku + web search tool, vs \$22 original Sonnet estimate)

-   

## Known issues / limitations

### Waitlist data — do not display as open/closed badge

-   

-   Several "open" entries have dates from 2021 (stale pages) — Haiku misread them as currently open

-   

-   Generic "contact us to apply" language was classified as open

-   

-   Central City Concern properties link to a separate status page the agent couldn't follow

-   

-   **Decision:** show raw waitlistNote text with "verify directly" disclaimer instead of a badge

-   

### AHC income restrictions table — unreliable

-   

-   34/40 properties returned identical income data — it's the affordability calculator widget, not property-specific limits

-   

-   Only 6 properties got real income restriction data from the page

-   

### AHC detail parser — amenities missing

-   

-   No data-section="amenities" block found on detail pages — community amenities may be in a different section not yet identified

-   

### AHC cookies expire

-   

-   Session cookies needed to re-run scrape_ahc.py. Listings JSON already saved so only detail re-runs need fresh cookies.

-   

-   To refresh: open AHC Portland income-restricted page in browser → DevTools → Network → find POST to /v4/AjaxHandler?message=SearchListings → Copy as cURL → paste cookie string into script

-   

### \~85 properties still have no website found

-   

-   In agent_review.xlsx → No_Website sheet: add "Manual URL" column with URLs you find manually, then run apply_manual_updates.py

-   

## Immediate next steps

1

Run AHC detail scraper: python scrape_ahc.py --details-only (parser now fixed with CSS selectors — last working test on Cascadian Terrace passed)

2

Add manual URLs to agent_review.xlsx No_Website sheet → run apply_manual_updates.py

3

Build master merge script: NWPP base + agent_results + AHC data + manual updates → new data/properties.js

4

Update app to display new fields: fees, utilities, pet policy, source URL, "verify directly" note on any waitlist text

5

Compile master contact list (emails + phones from all sources, deduped) for waitlist status email campaign

6

Email campaign: Google Form with pre-filled property name link → responses auto-land in Google Sheet → script updates properties.js

## Wishlist / future ideas

-   

-   Preference/matching wizard (6 questions → ranked shortlist) — the big UX win for end users

-   

-   Rent-scraping second pass for \~30 Tax Credit "Call" properties that returned no rent data

-   

-   AHC amenities section — identify correct HTML section and fix parser

-   

-   Geocoding accuracy — AHC has exact GPS for its 40 properties; rest use Portland street grid math. Consider Nominatim second pass for remaining properties (runs in browser, caches to localStorage)

-   

-   Outreach to Northwest Pilot Project as primary partner: (503) 227-5605, housing\@nwpilotproject.org. Also 211info.org, Home Forward, JOIN, Central City Concern, Oregon Housing and Community Services

-   

-   Auto-refresh pipeline — AHC API doesn't require login; could run monthly to update availability status

-   

-   East County / Gresham properties — some AHC listings are in Gresham ZIP codes, confirm they belong in scope

-   

## Key technical notes for next session

-   

-   All scripts run from repo root: /var/www/html/pdx-affordable-housing/

-   

-   AHC parser uses data-section attributes: details, fees, utilities, amenities. Units are in div.CommunityModelRow. Utilities class has typo: utilites--list (not utilities).

-   

-   Agent model: claude-haiku-4-5-20251001 for all steps (search, URL pick, extraction)

-   

-   AHC availability text comes from listing API (AvailabilityText field) — more reliable than scraped page text

-   

-   GPS coords: AHC has exact coords for 40 properties. Others use Portland street grid approximation. Both stored in properties.js as lat/lon.

-   

-   Waitlist decision: use waitlistNote verbatim text + "verify directly" disclaimer. No open/closed badge — too unreliable.

-
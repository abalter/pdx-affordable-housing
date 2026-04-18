

# PDX Affordable Housing — Project Summary

## What it is
A web app listing 245 affordable housing properties in Multnomah County, Oregon. Source data came from three PDFs published by **Northwest Pilot Project (NWPP)** covering three subsidy programs. The app lives at:
- **Repo:** https://github.com/abalter/pdx-affordable-housing
- **Live site:** https://abalter.github.io/pdx-affordable-housing/

---

## Repo structure
```
pdx-affordable-housing/
├── index.html          # Full app — UI, Leaflet map, all logic
├── data/
│   └── properties.js   # const PROPS = [...];  (245 property objects)
├── .nojekyll
├── LICENSE
└── README.md
```

---

## The data

### Three source programs
| Program | Description | Rent model |
|---|---|---|
| **HUD** | HUD-subsidized units, must be 62+ or disabled | 30% of tenant income — no fixed rent |
| **PBV** | Project-Based Vouchers, open to people under 62 without disabilities (most 55+) | ~30% of income — no fixed rent |
| **Tax Credit** | LIHTC — below-market fixed rents | Fixed dollar amounts (30/60/80% MFI tiers) |

### Property object shape (`data/properties.js`)
```js
{
  id: 0,                        // index into PROPS array
  name: "1200 Building",
  program: "HUD",               // "HUD" | "PBV" | "Tax Credit"
  address: "1220 SW 12th Ave",
  city: "Portland", state: "OR", zip: "97205",
  phone: "503-461-2247",
  mgmt: "Guardian",
  region: "Downtown",           // neighborhood bucket (see below)
  ageElig: "62+ or Disabled",   // human-readable
  minAge: 62,                   // numeric, 0 = no minimum
  disabilityReq: false,
  sro: false, studio: false, br1: true, br2: false, br3: false,
  ada: "10",                    // number of ADA units, or "" if none
  pbv: "",                      // number of PBV units (PBV program only)
  rentStudio: "", rent1br: "", rent2br: "", rent3br: "",  // dollar strings or "Call" or ""
  minRent: null,                // computed min across all rent fields, for slider filter
  sober: false,
  veterans: false,
  wheelchair: false,
  mixed: false,                 // mixed subsidized/market building
  notes: "",
  lat: 45.516402,               // pre-baked approximate coords (Portland grid math)
  lon: -122.68457,
}
```

### Regions used
Downtown, Northwest, Northeast, North, Inner Southeast, Southeast, Outer Southeast, Southwest, East County/Gresham

---

## How index.html works

### Dependencies
- **Leaflet 1.9.4** — bundled inline (no CDN), so it works from `file://` and any host
- **CartoDB light tiles** — `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png` — no API key required, works from any origin
- **Google Fonts** (Lora + Source Sans 3) — only external dependency, gracefully degrades
- **Nominatim** (OpenStreetMap geocoder) — called from browser to verify/correct pins

### Geocoding strategy
Coordinates in `properties.js` are **pre-baked approximations** computed via Portland's street grid math (accurate to ~1 block). On first page load, the app queues all properties through Nominatim at 1.2 sec/request (rate limit compliance), updating pins as results arrive and caching everything in `localStorage` (key: `pdx_housing_geo_v1`, TTL: 60 days). Subsequent visits are instant. Nominatim requires a real HTTP referer — works on GitHub Pages, fails from `file://`.

### UI structure
```
<header>          search input, property count, geocoding status
<pills-bar>       program toggles (HUD / PBV / Tax Credit) + view toggle
<main>
  <sidebar>
    <filters>     region chips, age dropdown, unit checkboxes,
                  rent slider, other flags (ADA, sober, veterans)
    <list>        rendered property cards
  </sidebar>
  <div#map>       Leaflet map with circle markers
```

### Filter logic (`filtered()` function)
All filters are AND'd. Each filter:
- **Program pills** — toggles `state.activePrograms` Set
- **Region chips** — multi-select, empty Set = show all
- **Age** — `""` any, `"0"` no minimum, `"55"` minAge≥55, `"62"` minAge≥62
- **Unit type** — any checked type must be present on property
- **Max rent slider** — $400–$1900, ceiling value = disabled; only applies when `p.minRent` exists; properties with no rent data always pass
- **ADA / Sober / Veterans** — boolean flags

### Rent slider detail
Only 119/245 properties have rent data (all Tax Credit, 1 PBV). The slider note says "Tax Credit only · income-based excluded." When active, unit chips on cards turn **green** if that unit type's starting rent is within budget.

### Map interaction
- Circle markers colored by program (blue=HUD, green=PBV, amber=Tax Credit)
- Clicking a card → `flyTo()` → map animates to pin, popup opens
- Clicking a pin → card scrolls into view and gets `selected` highlight
- View toggle: Split (default) / List-only / Map-only

### Per-property links (no API key needed)
- 📍 **Maps** — `google.com/maps/search/?api=1&query=<address>`
- 🚶 **Street View** — `google.com/maps?q=<address>&layer=c`
- 🔍 **Search** — Google search for property name + city + "affordable housing"

---

## Known issues / next steps
- **Geocoding accuracy** — pre-baked coords are ~1 block approximate; Nominatim browser pass corrects them on first visit
- **Rent data gaps** — ~30 Tax Credit properties say "Call for Rent"; a scraping agent pass could fill ~60–70% of these
- **`Multnomah_Affordable_Housing.xlsx`** — the full spreadsheet with all data also exists as a deliverable (all 245 rows, same fields, color-coded by program, with autofilter)
# PDX Affordable Housing

An interactive map and searchable directory of affordable housing properties in Multnomah County, Oregon.

## What It Does

Browse 245 affordable housing properties on a Leaflet map with filters for rent, bedrooms, program type, region, age requirements, and more. Click a property to see details; double-click to zoom in.

## Data Sources

Property data was compiled from three sources:

- **NWPP Housing Lists** — PDF directories published by Northwest Pilot Project, covering HUD, Project-Based Voucher (PBV), and Tax Credit properties
- **AffordableHousing.com** — Scraped listings for the Portland metro area
- **AffordableHousingOnline.com** — Scraped listings with additional detail

Data was extracted and merged using a combination of Claude AI and Python scraping scripts (see `data_collection/`).

## A Note on Rent Prices

Only **Tax Credit** properties have specific rent amounts listed. **HUD** and **PBV** properties are income-based — tenants pay a percentage of their income — so no dollar amount is shown. If a property says "Call," the rent varies or wasn't available at the time of data collection.

## How It's Built

This is a static site — no server, no build step, no framework. Just HTML, CSS, and vanilla JavaScript.

- **Leaflet 1.9.4** for the map (via CDN)
- **CartoDB** basemap tiles (no API key needed)
- Property data lives in `data/properties.js`

### File Structure

```
index.html          HTML shell
css/style.css       All styles
js/app.js           App logic, filters, map, rendering
data/properties.js  245 property records (PROPS array)
data_collection/    Scraping scripts, raw data, PDFs
project_history/    Project summary and notes
```

## History

This project started when I was helping a disabled elder friend search for affordable housing. [Northwest Pilot Project](https://nwpilotproject.org/) publishes PDF directories of housing properties — useful, but hard to search and filter. I used Claude AI to parse those PDFs into structured data, geocoded everything, and turned it into this interactive web app. Python scrapers were later added to pull in listings from AffordableHousing.com and AffordableHousingOnline.com for a more complete picture.

*This is an independent project with no affiliation to NWPP or any housing organization.*

## Goals

- Keep property data current
- Add waitlist status and availability where possible
- Improve coverage beyond Multnomah County
- Make the tool useful for anyone searching for affordable housing

## Feedback & Contact

Found a bug, have a suggestion, or notice outdated info? [Open an issue](https://github.com/abalter/pdx-affordable-housing/issues) on GitHub. You can also reach me through my [GitHub profile](https://github.com/abalter).

## License

MIT License — Copyright (c) 2026 Ariel Balter

Copy it, fork it, use it however you want. See [LICENSE](LICENSE) for details.

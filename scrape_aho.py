"""
scrape_aho.py
=============
Scrapes affordablehousingonline.com for Portland, OR affordable housing listings,
then merges the results into the existing data/properties.js file.

Usage:
    pip install requests beautifulsoup4
    python scrape_aho.py

Output:
    aho_raw.json          - raw scraped data (all AHO records)
    data/properties.js    - updated with new fields, new properties appended
    merge_report.txt      - summary of matches, gaps, and additions

Rate limit: 1.2 sec between requests (well within polite limits).
robots.txt: Allow: / for all user-agents. /blog/wp-admin, /lms, /user disallowed
            (none of which we touch).
"""

import json
import re
import time
import unicodedata
from pathlib import Path

import requests
from bs4 import BeautifulSoup

# ── Config ────────────────────────────────────────────────────────────────────

BASE_URL   = "https://affordablehousingonline.com"
LIST_URL   = BASE_URL + "/housing-search/Oregon/Portland"
DELAY      = 1.2          # seconds between requests
HEADERS    = {
    "User-Agent": (
        "pdx-affordable-housing/1.0 "
        "(nonprofit housing resource; github.com/abalter/pdx-affordable-housing)"
    )
}

# Paths — run from repo root
RAW_OUT       = Path("aho_raw.json")
PROPS_JS      = Path("data/properties.js")
REPORT_OUT    = Path("merge_report.txt")


# ── Helpers ───────────────────────────────────────────────────────────────────

def get(url, retries=3):
    """GET with retries and polite delay."""
    for attempt in range(retries):
        try:
            r = requests.get(url, headers=HEADERS, timeout=15)
            r.raise_for_status()
            return r
        except Exception as e:
            print(f"  ⚠ Attempt {attempt+1} failed for {url}: {e}")
            time.sleep(3)
    return None


def normalize_address(addr):
    """
    Lowercase, strip punctuation, normalize common abbreviations.
    Used as the match key between AHO and existing properties.
    e.g. '650 SE 162nd Ave, Portland, OR 97233' → '650 se 162nd ave portland or 97233'
    """
    if not addr:
        return ""
    addr = addr.lower()
    # Unicode → ASCII
    addr = unicodedata.normalize("NFKD", addr).encode("ascii", "ignore").decode()
    # Remove punctuation except spaces
    addr = re.sub(r"[^\w\s]", " ", addr)
    # Normalize common suffix variants
    replacements = [
        (r"\bstreet\b", "st"), (r"\bavenue\b", "ave"), (r"\bboulevard\b", "blvd"),
        (r"\bdrive\b",  "dr"), (r"\bplace\b",  "pl"),  (r"\bct\b", "ct"),
        (r"\broad\b",   "rd"), (r"\blane\b",   "ln"),  (r"\bway\b", "way"),
        (r"\bnortheast\b", "ne"), (r"\bnorthwest\b", "nw"),
        (r"\bsoutheast\b", "se"), (r"\bsouthwest\b", "sw"),
        (r"\bnorth\b", "n"),  (r"\bsouth\b", "s"),
        (r"\beast\b",  "e"),  (r"\bwest\b",  "w"),
    ]
    for pattern, replacement in replacements:
        addr = re.sub(pattern, replacement, addr)
    # Collapse whitespace
    return re.sub(r"\s+", " ", addr).strip()


# ── Stage 1: Crawl list pages ─────────────────────────────────────────────────

def scrape_list_pages():
    """
    Collect all property stubs from paginated list pages.
    Returns list of dicts: {name, address, detail_url, aho_id}
    """
    stubs = []
    page  = 1

    print("── Stage 1: Crawling list pages ──────────────────────────────────")

    while True:
        url = LIST_URL if page == 1 else f"{LIST_URL}?page={page}"
        print(f"  Page {page}: {url}")
        r = get(url)
        if not r:
            print("  Failed, stopping pagination.")
            break

        soup = BeautifulSoup(r.text, "html.parser")

        # Each property card is an <a> wrapping an <h3>
        # URL pattern: /housing-search/Oregon/Portland/{slug}/{id}
        cards = soup.select("a[href*='/housing-search/Oregon/Portland/']")
        # Filter to only property detail links (have a numeric ID segment)
        new = []
        for a in cards:
            href = a.get("href", "")
            m = re.search(r"/housing-search/Oregon/Portland/([^/]+)/(\d+)", href)
            if not m:
                continue
            slug   = m.group(1)
            aho_id = m.group(2)
            detail_url = BASE_URL + f"/housing-search/Oregon/Portland/{slug}/{aho_id}"

            # Get name from h3 inside the card, or the slug
            h3 = a.find("h3")
            name = h3.get_text(strip=True) if h3 else slug.replace("-", " ").title()

            # Address: look for text matching street pattern near the card
            # (sits in a sibling element; easier to get from detail page)
            addr_el = a.find_next(string=re.compile(r"\d+\s+\w+\s+(st|ave|blvd|dr|ln|pl|way|rd|ct|blvd|hwy)", re.I))
            address = addr_el.strip() if addr_el else ""

            stub = {
                "name":       name,
                "address_raw": address,
                "detail_url": detail_url,
                "aho_id":     aho_id,
                "slug":       slug,
            }
            if aho_id not in {s["aho_id"] for s in stubs}:
                new.append(stub)

        if not new:
            print(f"  No new properties on page {page}, done.")
            break

        stubs.extend(new)
        print(f"  Found {len(new)} properties (total so far: {len(stubs)})")
        page += 1
        time.sleep(DELAY)

    print(f"\n  ✓ {len(stubs)} property stubs collected\n")
    return stubs


# ── Stage 2: Fetch detail pages ───────────────────────────────────────────────

def parse_detail(soup, stub):
    """
    Parse a detail page into a structured record.
    Returns dict with all available fields.
    """
    rec = {
        "aho_id":     stub["aho_id"],
        "aho_url":    stub["detail_url"],
        "name":       stub["name"],
        "address":    "",
        "city":       "",
        "state":      "OR",
        "zip":        "",
        "phone":      "",
        "email":      "",
        "waitlist":   "unknown",
        "rent_range": "",
        "beds":       "",
        "photo_url":  "",
        "amenities":  [],
        "units":      [],       # list of {beds, baths, sqft, rent}
        "accepts_vouchers": False,
        "accessible": False,
        "subsidized": False,
    }

    # ── Address ──
    # Typically in an <h1> subheading or address block
    addr_candidates = soup.find_all(string=re.compile(
        r"\d+\s+\w.*(?:Portland|Gresham|Fairview|Troutdale|OR)", re.I
    ))
    for cand in addr_candidates:
        text = cand.strip()
        # Filter out navigation/boilerplate
        if len(text) < 60 and re.search(r"\d+\s+\w", text):
            rec["address"] = text
            # Parse city/state/zip
            m = re.search(r"(.*?),\s*([\w\s]+),\s*OR\s*(\d{5})", text)
            if m:
                rec["address"] = m.group(1).strip()
                rec["city"]    = m.group(2).strip()
                rec["zip"]     = m.group(3)
            break

    # ── Phone ──
    phone_link = soup.find("a", href=re.compile(r"^tel:"))
    if phone_link:
        rec["phone"] = phone_link.get_text(strip=True)

    # ── Email ──
    email_link = soup.find("a", href=re.compile(r"^mailto:"))
    if email_link:
        rec["email"] = email_link["href"].replace("mailto:", "").strip()

    # ── Waitlist status ──
    page_text = soup.get_text(" ", strip=True).lower()
    if "waitlist now open" in page_text or "waiting list now open" in page_text:
        rec["waitlist"] = "open"
    elif "waitlist is closed" in page_text or "waiting list is closed" in page_text:
        rec["waitlist"] = "closed"
    elif "short wait" in page_text or "likely short" in page_text:
        rec["waitlist"] = "short"
    elif "long wait" in page_text:
        rec["waitlist"] = "long"

    # ── Rent range (from summary table) ──
    rent_cell = soup.find(string=re.compile(r"\$[\d,]+.*per Month", re.I))
    if rent_cell:
        rec["rent_range"] = rent_cell.strip()

    # ── Beds summary ──
    bed_cell = soup.find(string=re.compile(r"\d+\s*-?\s*\d*\s*Beds?|Studio", re.I))
    if bed_cell:
        rec["beds"] = bed_cell.strip()

    # ── Unit table ──
    # Table with columns: Unit (Bd/Ba), Ft2, Rent
    for table in soup.find_all("table"):
        headers = [th.get_text(strip=True).lower() for th in table.find_all("th")]
        if "rent" in headers and ("ft2" in headers or "unit" in " ".join(headers)):
            for row in table.find_all("tr")[1:]:
                cells = [td.get_text(strip=True) for td in row.find_all("td")]
                if len(cells) >= 3:
                    rec["units"].append({
                        "description": cells[0],
                        "sqft":        cells[1] if len(cells) > 1 else "",
                        "rent":        cells[2] if len(cells) > 2 else "",
                    })

    # ── Photo ──
    img = soup.find("img", src=re.compile(r"s3\.amazonaws\.com.*\.(jpg|jpeg|png)", re.I))
    if img:
        rec["photo_url"] = img["src"]

    # ── Amenities ──
    # Usually in a <ul> following an "Amenities" heading
    amenities_heading = soup.find(
        lambda t: t.name in ("h3","h4","h5","strong","b") and
                  "amenities" in t.get_text(strip=True).lower()
    )
    if amenities_heading:
        ul = amenities_heading.find_next("ul")
        if ul:
            rec["amenities"] = [li.get_text(strip=True) for li in ul.find_all("li")]

    # ── Flags ──
    rec["accepts_vouchers"] = "accepts vouchers" in page_text or "section 8" in page_text
    rec["accessible"]       = "accessible" in page_text or "ada" in page_text
    rec["subsidized"]       = "subsidized" in page_text

    return rec


def scrape_details(stubs):
    """Fetch and parse each detail page. Returns list of full records."""
    records = []
    total = len(stubs)

    print("── Stage 2: Fetching detail pages ────────────────────────────────")

    for i, stub in enumerate(stubs, 1):
        print(f"  [{i:3d}/{total}] {stub['name'][:50]}")
        r = get(stub["detail_url"])
        if not r:
            print("    ✗ failed, skipping")
            records.append({**stub, "fetch_error": True})
            time.sleep(DELAY)
            continue

        soup = BeautifulSoup(r.text, "html.parser")
        rec  = parse_detail(soup, stub)
        records.append(rec)
        time.sleep(DELAY)

    print(f"\n  ✓ {len(records)} detail records collected\n")
    return records


# ── Stage 3: Merge into properties.js ────────────────────────────────────────

def load_existing_props():
    """Read data/properties.js → list of dicts."""
    text = PROPS_JS.read_text(encoding="utf-8")
    # Strip 'const PROPS = ' prefix and trailing semicolon
    json_str = re.sub(r"^\s*const\s+PROPS\s*=\s*", "", text).rstrip().rstrip(";")
    return json.loads(json_str)


def save_props(props):
    """Write list of dicts → data/properties.js."""
    PROPS_JS.parent.mkdir(exist_ok=True)
    js = "const PROPS = " + json.dumps(props, indent=2, ensure_ascii=False) + ";\n"
    PROPS_JS.write_text(js, encoding="utf-8")


def merge(existing, aho_records):
    """
    Match AHO records to existing properties by normalized address.
    Returns (updated_props, report_lines).
    """
    report = []

    # Build lookup: norm_address → existing prop index
    existing_index = {}
    for i, p in enumerate(existing):
        addr = f"{p.get('address','')} {p.get('city','')} {p.get('state','')} {p.get('zip','')}".strip()
        key  = normalize_address(addr)
        if key:
            existing_index[key] = i

    matched    = []
    unmatched  = []   # AHO records not in our data
    not_in_aho = []   # Our properties not found on AHO

    aho_matched_ids = set()

    for rec in aho_records:
        if rec.get("fetch_error"):
            continue
        addr_full = f"{rec.get('address','')} {rec.get('city','')} OR {rec.get('zip','')}".strip()
        key = normalize_address(addr_full)

        if key in existing_index:
            idx = existing_index[key]
            p   = existing[idx]
            aho_matched_ids.add(idx)

            # Fields to update only if we don't already have them
            # (prefer NWPP source data; AHO fills gaps)
            updates = {}

            if rec.get("email") and not p.get("email"):
                updates["email"] = rec["email"]

            if rec.get("photo_url") and not p.get("photoUrl"):
                updates["photoUrl"] = rec["photo_url"]

            if rec.get("aho_url"):
                updates["ahoUrl"] = rec["aho_url"]

            if rec.get("waitlist") != "unknown":
                updates["waitlist"] = rec["waitlist"]
                updates["waitlistNote"] = "(source: affordablehousingonline.com — verify directly)"

            # Fill in rent gaps: only for Tax Credit properties (others are income-based)
            if p.get("program") == "Tax Credit" and rec.get("units"):
                for unit in rec["units"]:
                    desc = unit.get("description", "").lower()
                    rent = unit.get("rent", "")
                    if not rent:
                        continue
                    if "studio" in desc and not p.get("rentStudio"):
                        updates["rentStudio"] = rent
                    elif "one bedroom" in desc or "1/1" in desc or "1 bed" in desc:
                        if not p.get("rent1br"):
                            updates["rent1br"] = rent
                    elif "two bedroom" in desc or "2/" in desc or "2 bed" in desc:
                        if not p.get("rent2br"):
                            updates["rent2br"] = rent
                    elif "three bedroom" in desc or "3/" in desc or "3 bed" in desc:
                        if not p.get("rent3br"):
                            updates["rent3br"] = rent

            if rec.get("amenities"):
                updates["amenities"] = rec["amenities"]

            if rec.get("accepts_vouchers"):
                updates["acceptsVouchers"] = True

            if updates:
                existing[idx].update(updates)
                matched.append((p["name"], list(updates.keys())))
            else:
                matched.append((p["name"], []))

        else:
            unmatched.append(rec)

    # Find our properties with no AHO match
    for i, p in enumerate(existing):
        if i not in aho_matched_ids:
            not_in_aho.append(p["name"])

    # Append unmatched AHO records as new properties
    new_props = []
    for rec in unmatched:
        if not rec.get("address"):
            continue
        new_id = len(existing) + len(new_props)
        new_props.append({
            "id":          new_id,
            "name":        rec.get("name", ""),
            "program":     "Unknown",   # AHO doesn't reliably expose this; flag for review
            "address":     rec.get("address", ""),
            "city":        rec.get("city", "Portland"),
            "state":       "OR",
            "zip":         rec.get("zip", ""),
            "phone":       rec.get("phone", ""),
            "email":       rec.get("email", ""),
            "mgmt":        "",
            "region":      "",          # will need geocoding + region assignment
            "ageElig":     "None",
            "minAge":      0,
            "disabilityReq": False,
            "sro": False, "studio": False, "br1": False, "br2": False, "br3": False,
            "ada":         "",
            "pbv":         "",
            "rentStudio":  "", "rent1br": "", "rent2br": "", "rent3br": "",
            "minRent":     None,
            "sober":       False,
            "veterans":    False,
            "wheelchair":  False,
            "mixed":       False,
            "notes":       "Added from affordablehousingonline.com — needs review",
            "lat":         None,
            "lon":         None,
            "waitlist":    rec.get("waitlist", "unknown"),
            "waitlistNote": "(source: affordablehousingonline.com — verify directly)",
            "photoUrl":    rec.get("photo_url", ""),
            "ahoUrl":      rec.get("aho_url", ""),
            "amenities":   rec.get("amenities", []),
            "acceptsVouchers": rec.get("accepts_vouchers", False),
            "needsReview": True,
        })

    existing.extend(new_props)

    # ── Build report ──
    updated_count = sum(1 for _, fields in matched if fields)
    report.append("═" * 60)
    report.append("MERGE REPORT — affordablehousingonline.com → properties.js")
    report.append("═" * 60)
    report.append(f"\nAHO records scraped:          {len(aho_records)}")
    report.append(f"Matched to existing props:    {len(matched)}")
    report.append(f"  - with new field data:      {updated_count}")
    report.append(f"  - already complete:         {len(matched) - updated_count}")
    report.append(f"New properties added:         {len(new_props)}")
    report.append(f"Our props not found on AHO:   {len(not_in_aho)}")

    report.append("\n── Fields added per matched property ────────────────────")
    for name, fields in matched:
        if fields:
            report.append(f"  {name[:45]:<45} +{', '.join(fields)}")

    report.append("\n── New properties added (need review) ───────────────────")
    for p in new_props:
        report.append(f"  {p['name'][:45]:<45} {p['address']}, {p['city']}")

    report.append("\n── Our properties not found on AHO ──────────────────────")
    for name in not_in_aho:
        report.append(f"  {name}")

    return existing, report


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print("\n╔══════════════════════════════════════════════════════════╗")
    print("║  AHO Scraper — affordablehousingonline.com/Portland      ║")
    print("╚══════════════════════════════════════════════════════════╝\n")

    # Stage 1 — list pages
    stubs = scrape_list_pages()

    # Stage 2 — detail pages
    records = scrape_details(stubs)

    # Save raw output (useful for debugging / re-running merge without re-scraping)
    RAW_OUT.write_text(json.dumps(records, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"✓ Raw data saved to {RAW_OUT}\n")

    # Stage 3 — merge
    print("── Stage 3: Merging into properties.js ──────────────────────")

    if not PROPS_JS.exists():
        print(f"  ✗ {PROPS_JS} not found — run from repo root directory")
        return

    existing = load_existing_props()
    print(f"  Loaded {len(existing)} existing properties")

    updated, report_lines = merge(existing, records)

    save_props(updated)
    print(f"  ✓ {PROPS_JS} updated ({len(updated)} total properties)")

    REPORT_OUT.write_text("\n".join(report_lines), encoding="utf-8")
    print(f"  ✓ Report saved to {REPORT_OUT}")

    # Print report to console too
    print()
    print("\n".join(report_lines))


if __name__ == "__main__":
    main()

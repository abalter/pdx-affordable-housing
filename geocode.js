#!/usr/bin/env node
// Batch geocode all properties in properties.js via Nominatim.
// Nominatim usage policy: max 1 request per second, identify via User-Agent.
// Usage: node geocode.js

const fs = require('fs');
const path = require('path');

const PROPS_PATH = path.join(__dirname, 'data', 'properties.js');
const DELAY_MS = 1100; // slightly over 1 sec to stay within Nominatim rate limit

// Read and parse properties.js
const raw = fs.readFileSync(PROPS_PATH, 'utf8');
const match = raw.match(/const PROPS\s*=\s*(\[[\s\S]*\]);?\s*$/);
if (!match) { console.error('Could not parse properties.js'); process.exit(1); }
const PROPS = JSON.parse(match[1]);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;
  const resp = await fetch(url, {
    headers: { 'User-Agent': 'pdx-affordable-housing/1.0 (github.com/abalter/pdx-affordable-housing)' }
  });
  const data = await resp.json();
  if (data && data[0]) {
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  }
  return null;
}

async function main() {
  let updated = 0, failed = 0;
  
  for (let i = 0; i < PROPS.length; i++) {
    const p = PROPS[i];
    const addr = `${p.address}, ${p.city}, ${p.state} ${p.zip}`;
    
    process.stdout.write(`[${i + 1}/${PROPS.length}] ${p.name} — ${addr} ... `);
    
    const result = await geocodeAddress(addr);
    if (result) {
      const oldLat = p.lat, oldLon = p.lon;
      p.lat = result.lat;
      p.lon = result.lon;
      const dist = Math.sqrt((oldLat - result.lat) ** 2 + (oldLon - result.lon) ** 2);
      if (dist > 0.001) {
        console.log(`MOVED (${dist.toFixed(4)}°) → [${result.lat}, ${result.lon}]`);
      } else {
        console.log(`ok (${result.lat}, ${result.lon})`);
      }
      updated++;
    } else {
      console.log('FAILED — keeping original coords');
      failed++;
    }
    
    if (i < PROPS.length - 1) await sleep(DELAY_MS);
  }
  
  // Write back to properties.js
  const output = 'const PROPS = ' + JSON.stringify(PROPS) + ';\n';
  fs.writeFileSync(PROPS_PATH, output, 'utf8');
  
  console.log(`\nDone! Updated: ${updated}, Failed: ${failed}`);
  console.log(`Written to ${PROPS_PATH}`);
}

main().catch(e => { console.error(e); process.exit(1); });

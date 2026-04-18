// ── Leaflet icon fix for inline bundle ───────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  shadowUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC',
  iconRetinaUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
});

// ── State ─────────────────────────────────────────────────
const MAX_RENT_CEIL = 1900;
const state = {
  activePrograms: new Set(['HUD','PBV','Tax Credit']),
  activeRegions:  new Set(),
  search:'', age:'',
  units: new Set(),
  maxRent: MAX_RENT_CEIL,
  ada:false, sober:false, vets:false,
  selected:null, view:'split',
  sort:'name',
  income: 0, incomeFreq: 'monthly', familySize: 1,
};

// ── Income → estimated rent ───────────────────────────────
function monthlyIncome() {
  if (!state.income) return 0;
  return state.incomeFreq === 'yearly' ? state.income / 12 : state.income;
}
function estimatedRent() {
  const mi = monthlyIncome();
  return mi > 0 ? Math.round(mi * 0.3) : 0;
}
// Parse dollar amounts like "$1,505" or "$506-$889" → array of numbers
function parseDollars(s) {
  if (!s) return [];
  return (s.match(/\$[\d,]+/g) || []).map(m => parseInt(m.replace(/[$,]/g, ''), 10)).filter(n => n >= 100 && n < 10000);
}
function effectiveRent(p) {
  // For HUD/PBV: use estimated rent if income is entered, otherwise Infinity (unknown)
  if (p.program === 'HUD' || p.program === 'PBV') {
    return estimatedRent() || Infinity;
  }
  // For Tax Credit: use actual rent data
  for (const v of [p.rentStudio, p.rent1br, p.rent2br, p.rent3br]) {
    const nums = parseDollars(v);
    if (nums.length) return Math.min(...nums);
  }
  return p.minRent || Infinity;
}

// ── Map (CartoDB — works from any origin, no API key) ─────
const map = L.map('map').setView([45.5231,-122.6765],12);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{
  attribution:'© <a href="https://openstreetmap.org">OpenStreetMap</a> © <a href="https://carto.com">CARTO</a>',
  subdomains:'abcd', maxZoom:19
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);
const markers = {};
const COLORS = {HUD:'#1d6fa4', PBV:'#1a7a4a', 'Tax Credit':'#a05c10'};

function makeMarker(p) {
  const m = L.circleMarker([p.lat,p.lon],{
    radius:7, fillColor:COLORS[p.program]||'#555',
    color:'#fff', weight:2, opacity:1, fillOpacity:.88
  });
  m.bindPopup(popupHtml(p),{maxWidth:300});
  m.on('click',()=>selectProp(p.id));
  m.on('dblclick',()=>zoomToProp(p.id));
  return m;
}

function popupHtml(p) {
  const addr=`${p.address}, ${p.city}, ${p.state} ${p.zip}`;
  const mapsUrl=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;
  const svUrl=`https://www.google.com/maps?q=${encodeURIComponent(addr)}&layer=c`;
  const searchUrl=`https://www.google.com/search?q=${encodeURIComponent(p.name+' '+p.city+' affordable housing')}`;
  const isIB = (p.program === 'HUD' || p.program === 'PBV');
  const estR = estimatedRent();
  const rentLine = isIB && estR > 0
    ? `<div class="popup-row"><b>Est. Rent:</b> ~$${estR.toLocaleString()}/mo <span style="font-size:.7rem;color:#888">(30% of income)</span></div>`
    : rentStr(p) ? `<div class="popup-row"><b>Rent:</b> ${rentStr(p)}</div>` : '';
  return `<div class="popup-name">${p.name}</div>
    <div class="popup-addr">${p.address}, ${p.city}</div>
    <div class="popup-row"><b>Program:</b> ${p.program}</div>
    ${p.phone?`<div class="popup-row"><b>Phone:</b> ${p.phone}</div>`:''}
    ${p.ageElig&&p.ageElig!=='None'?`<div class="popup-row"><b>Eligibility:</b> ${p.ageElig}</div>`:''}
    ${unitStr(p)?`<div class="popup-row"><b>Units:</b> ${unitStr(p)}</div>`:''}
    ${rentLine}
    ${p.ada?`<div class="popup-row"><b>ADA:</b> ${p.ada} units</div>`:''}
    ${p.mgmt?`<div class="popup-row"><b>Mgmt:</b> ${p.mgmt}</div>`:''}
    <div class="popup-actions">
      <a class="popup-btn" href="${mapsUrl}" target="_blank">📍 Maps</a>
      <a class="popup-btn" href="${svUrl}"   target="_blank">🚶 Street View</a>
      <a class="popup-btn" href="${searchUrl}" target="_blank">🔍 Search</a>
    </div>`;
}

function unitStr(p) {
  return [p.sro&&'SRO',p.studio&&'Studio',p.br1&&'1 BR',p.br2&&'2 BR',p.br3&&'3 BR'].filter(Boolean).join(', ');
}
function rentStr(p) {
  return [p.rentStudio&&`Studio: ${p.rentStudio}`,p.rent1br&&`1BR: ${p.rent1br}`,p.rent2br&&`2BR: ${p.rent2br}`].filter(Boolean).join(' · ');
}

// ── Region chips ─────────────────────────────────────────
const regions=[...new Set(PROPS.map(p=>p.region).filter(Boolean))].sort();
const grid=document.getElementById('region-grid');
for (const r of regions) {
  const chip=document.createElement('div');
  chip.className='rchip'; chip.textContent=r; chip.dataset.region=r;
  chip.addEventListener('click',()=>{
    if(state.activeRegions.has(r)){state.activeRegions.delete(r);chip.classList.remove('active');}
    else{state.activeRegions.add(r);chip.classList.add('active');}
    render(); updateFilterBtnLabels();
  });
  grid.appendChild(chip);
}

// ── Rent slider ───────────────────────────────────────────
const slider=document.getElementById('rent-slider');
const rentDisp=document.getElementById('rent-display');
slider.addEventListener('input',()=>{
  state.maxRent=parseInt(slider.value);
  rentDisp.textContent=state.maxRent>=MAX_RENT_CEIL?'No limit':'$'+state.maxRent.toLocaleString();
  render(); updateFilterBtnLabels();
});

// ── Income inputs ─────────────────────────────────────────
const incomeInput = document.getElementById('f-income');
const estRentEl = document.getElementById('est-rent');
const priceNoteEl = document.getElementById('price-note');

function parseIncomeVal(s) {
  return parseInt(s.replace(/[^0-9]/g, ''), 10) || 0;
}
function formatIncomeVal(n) {
  return n > 0 ? n.toLocaleString() : '';
}
function updateEstDisplay() {
  const est = estimatedRent();
  if (est > 0) {
    estRentEl.textContent = `Est. rent: ~$${est.toLocaleString()}/mo (30% of gross income)`;
    priceNoteEl.innerHTML = `ℹ️ <strong>HUD</strong> & <strong>PBV</strong> estimated rent: <strong>~$${est.toLocaleString()}/mo</strong> (30% of your income). <strong>Tax Credit</strong> rents are fixed amounts.`;
  } else {
    estRentEl.textContent = '';
    priceNoteEl.innerHTML = 'ℹ️ Rent amounts shown are for <strong>Tax Credit</strong> properties only. Enter your income above to estimate <strong>HUD</strong> & <strong>PBV</strong> rents (≈30% of gross income).';
  }
}

incomeInput.addEventListener('input', () => {
  state.income = parseIncomeVal(incomeInput.value);
  const pos = incomeInput.selectionStart;
  const formatted = formatIncomeVal(state.income);
  incomeInput.value = formatted;
  // Try to preserve cursor position
  const diff = formatted.length - (incomeInput.value.length || 0);
  incomeInput.setSelectionRange(pos + diff, pos + diff);
  updateEstDisplay(); render(); updateFilterBtnLabels();
});
document.querySelectorAll('input[name="income-freq"]').forEach(r => {
  r.addEventListener('change', () => {
    state.incomeFreq = r.value;
    updateEstDisplay(); render(); updateFilterBtnLabels();
  });
});
document.getElementById('f-famsize').addEventListener('change', e => {
  state.familySize = parseInt(e.target.value);
  render(); updateFilterBtnLabels();
});

// ── Filtering ─────────────────────────────────────────────
function filtered() {
  return PROPS.filter(p=>{
    if (!state.activePrograms.has(p.program)) return false;
    if (state.activeRegions.size>0&&!state.activeRegions.has(p.region)) return false;
    if (state.search) {
      const q=state.search.toLowerCase();
      if (!p.name.toLowerCase().includes(q)&&!p.address.toLowerCase().includes(q)&&
          !p.region.toLowerCase().includes(q)&&!(p.mgmt||'').toLowerCase().includes(q)) return false;
    }
    if (state.age!=='') {
      const a=parseInt(state.age);
      if (a===0&&p.minAge>0) return false;
      if (a>0&&p.minAge<a) return false;
    }
    if (state.units.size>0) {
      let ok=false; for (const u of state.units) if(p[u]){ok=true;break;} if(!ok) return false;
    }
    if (state.maxRent<MAX_RENT_CEIL) {
      const er = effectiveRent(p);
      if (er !== Infinity && er > state.maxRent) return false;
    }
    if (state.ada&&!p.ada) return false;
    if (state.sober&&!p.sober) return false;
    if (state.vets&&!p.veterans) return false;
    return true;
  });
}

// ── Sorting ───────────────────────────────────────────────
function lowestRent(p) {
  return effectiveRent(p);
}

function sortProps(arr) {
  const s = state.sort;
  if (s === 'name') return arr.sort((a, b) => a.name.localeCompare(b.name));
  if (s === 'rent-asc') return arr.sort((a, b) => lowestRent(a) - lowestRent(b));
  if (s === 'rent-desc') return arr.sort((a, b) => { const ra=lowestRent(a), rb=lowestRent(b); if(ra===Infinity&&rb===Infinity)return 0; if(ra===Infinity)return 1; if(rb===Infinity)return -1; return rb-ra; });
  if (s === 'region') return arr.sort((a, b) => (a.region || '').localeCompare(b.region || '') || a.name.localeCompare(b.name));
  if (s === 'program') return arr.sort((a, b) => a.program.localeCompare(b.program) || a.name.localeCompare(b.name));
  return arr;
}

// ── Render ────────────────────────────────────────────────
function renderList() {
  const list=document.getElementById('list');
  const fp=sortProps(filtered());
  document.getElementById('count').textContent=fp.length;
  if (!fp.length) {
    list.innerHTML='<div class="empty-state"><div class="icon">🏠</div><p>No properties match your filters.</p></div>';
    return;
  }
  const frag=document.createDocumentFragment();
  for (const p of fp) {
    const el=document.createElement('div');
    const pc=p.program==='Tax Credit'?'tc-card':p.program==='PBV'?'pbv-card':'hud-card';
    const pb=p.program==='Tax Credit'?'TC':p.program;
    el.className=`card ${pc}${state.selected===p.id?' selected':''}`;
    el.dataset.id=p.id;
    const addr=`${p.address}, ${p.city}, ${p.state} ${p.zip}`;
    const svUrl=`https://www.google.com/maps?q=${encodeURIComponent(addr)}&layer=c`;
    const mapsUrl=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;
    const searchUrl=`https://www.google.com/search?q=${encodeURIComponent(p.name+' '+p.city+' affordable housing')}`;
    let tags='';
    if (p.ageElig&&p.ageElig!=='None') tags+=`<span class="tag age">${p.ageElig}</span>`;
    if (p.ada)      tags+=`<span class="tag ada">ADA: ${p.ada}</span>`;
    if (p.sober)    tags+=`<span class="tag sober">Sober</span>`;
    if (p.veterans) tags+=`<span class="tag">Veterans pref.</span>`;
    if (p.mixed)    tags+=`<span class="tag">Mixed subsidy</span>`;
    const rentLimit=state.maxRent<MAX_RENT_CEIL?state.maxRent:null;
    const estR = estimatedRent();
    const isIncomeBased = (p.program === 'HUD' || p.program === 'PBV');
    let chips='';
    const seen=new Set();
    for (const [key,rentVal,label] of [['sro',p.rentStudio,'SRO'],['studio',p.rentStudio,'Studio'],['br1',p.rent1br,'1BR'],['br2',p.rent2br,'2BR'],['br3',p.rent3br,'3BR']]) {
      if (!p[key]||seen.has(label)) continue; seen.add(label);
      let note='', match=false;
      if (isIncomeBased && estR > 0) {
        note = ` · ~$${estR.toLocaleString()}`;
        if (rentLimit && estR <= rentLimit) match = true;
      } else if (rentVal&&rentVal.toLowerCase()!=='call') {
        const nums=parseDollars(rentVal);
        if (nums.length) { const lo=Math.min(...nums); note=` · $${lo.toLocaleString()}+`; if(rentLimit&&lo<=rentLimit)match=true; }
      }
      chips+=`<span class="${match?'uchip rent-match':'uchip'}">${label}${note}</span>`;
    }
    // If HUD/PBV has no unit chips but we have an estimate, show it standalone
    if (isIncomeBased && estR > 0 && !chips) {
      chips = `<span class="uchip rent-match">Est. ~$${estR.toLocaleString()}/mo</span>`;
    }
    el.innerHTML=`
      <div class="card-top">
        <div class="card-name">${p.name}</div>
        <span class="prog-badge ${pb}">${p.program}</span>
      </div>
      <div class="card-addr">${p.address}, ${p.city} · ${p.region}</div>
      ${tags?`<div class="card-meta">${tags}</div>`:''}
      ${chips?`<div class="card-units">${chips}</div>`:''}
      ${p.phone?`<div style="font-size:.75rem;margin-top:3px;color:#666">📞 ${p.phone}${p.mgmt?' · '+p.mgmt:''}</div>`:''}
      <div class="card-actions">
        <button class="btn-link" onclick="flyTo(${p.id},event)">📍 Map</button>
        <a class="btn-link" href="${svUrl}"     target="_blank">🚶 Street View</a>
        <a class="btn-link" href="${mapsUrl}"   target="_blank">🗺 Directions</a>
        <a class="btn-link" href="${searchUrl}" target="_blank">🔍 Search</a>
      </div>`;
    el.addEventListener('click',e=>{if(e.target.closest('a,button'))return;selectProp(p.id);});
    frag.appendChild(el);
  }
  list.innerHTML=''; list.appendChild(frag);
}

function renderMarkers() {
  markerLayer.clearLayers();
  Object.keys(markers).forEach(k=>delete markers[k]);
  const fp=new Set(filtered().map(p=>p.id));
  for (const p of PROPS) {
    if (!p.lat||!p.lon||!fp.has(p.id)) continue;
    const m=makeMarker(p); if(m){m.addTo(markerLayer);markers[p.id]=m;}
  }
}

function render(){renderList();renderMarkers();}

function selectProp(id) {
  state.selected=id; renderList();
  const p=PROPS[id];
  if (p.lat&&p.lon&&state.view!=='list') {
    const m=markers[id]; if(m)m.openPopup();
  }
  const card=document.querySelector(`.card[data-id="${id}"]`);
  if(card)card.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function zoomToProp(id) {
  state.selected=id; renderList();
  const p=PROPS[id];
  if (p.lat&&p.lon&&state.view!=='list') {
    map.flyTo([p.lat,p.lon],18,{duration:0.8});
    const m=markers[id]; if(m)setTimeout(()=>m.openPopup(),900);
  }
  const card=document.querySelector(`.card[data-id="${id}"]`);
  if(card)card.scrollIntoView({behavior:'smooth',block:'nearest'});
}
window.flyTo=function(id,e){e.stopPropagation();zoomToProp(id);};

function setView(v) {
  state.view=v;
  const sb=document.getElementById('sidebar'),mp=document.getElementById('map');
  document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById(`btn-${v}`).classList.add('active');
  if(v==='split'){sb.style.cssText='display:flex;width:360px';mp.style.display='block';}
  else if(v==='list'){sb.style.cssText='display:flex;width:100%';mp.style.display='none';}
  else{sb.style.display='none';mp.style.display='block';}
  setTimeout(()=>map.invalidateSize(),60);
}

// ── Dropdown filter bar logic ─────────────────────────────
const overlay = document.getElementById('fb-overlay');

function openFilter(name) {
  closeAllFilters();
  const fb = document.querySelector(`.fb[data-filter="${name}"]`);
  if (fb) { fb.classList.add('open'); overlay.classList.add('show'); }
}
function closeAllFilters() {
  document.querySelectorAll('.fb').forEach(f => f.classList.remove('open'));
  overlay.classList.remove('show');
}
overlay.addEventListener('click', closeAllFilters);

// Toggle dropdowns on button click
document.querySelectorAll('.fb-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const fb = btn.closest('.fb');
    const name = fb.dataset.filter;
    if (fb.classList.contains('open')) closeAllFilters();
    else openFilter(name);
  });
});

// Prevent panel clicks from closing
document.querySelectorAll('.fb-panel').forEach(p => p.addEventListener('click', e => e.stopPropagation()));

// Apply buttons close panel
document.querySelectorAll('.fb-apply').forEach(btn => btn.addEventListener('click', () => closeAllFilters()));

// Clear/Reset buttons
document.querySelectorAll('.fb-clear').forEach(btn => {
  btn.addEventListener('click', () => {
    const which = btn.dataset.clear;
    if (which === 'price') { slider.value = MAX_RENT_CEIL; state.maxRent = MAX_RENT_CEIL; rentDisp.textContent = 'No limit'; state.income = 0; state.incomeFreq = 'monthly'; state.familySize = 1; incomeInput.value = ''; document.querySelector('input[name="income-freq"][value="monthly"]').checked = true; document.getElementById('f-famsize').value = '1'; updateEstDisplay(); }
    if (which === 'beds') { state.units.clear(); document.querySelectorAll('#bed-pills .pill-opt').forEach(p => { p.classList.toggle('active', p.dataset.bed === ''); }); }
    if (which === 'program') { state.activePrograms = new Set(['HUD','PBV','Tax Credit']); document.querySelectorAll('#prog-pills .pill-opt').forEach(p => p.classList.add('active')); }
    if (which === 'region') { state.activeRegions.clear(); document.querySelectorAll('.rchip').forEach(c => c.classList.remove('active')); }
    if (which === 'more') { document.getElementById('f-age').value = ''; state.age = ''; document.getElementById('f-ada').checked = false; state.ada = false; document.getElementById('f-sober').checked = false; state.sober = false; document.getElementById('f-vets').checked = false; state.vets = false; }
    render(); updateFilterBtnLabels();
  });
});

// Bed pills (multi-select, "Any" deselects all)
document.querySelectorAll('#bed-pills .pill-opt').forEach(pill => {
  pill.addEventListener('click', () => {
    const val = pill.dataset.bed;
    if (val === '') {
      // "Any" clicked — clear selection
      state.units.clear();
      document.querySelectorAll('#bed-pills .pill-opt').forEach(p => p.classList.toggle('active', p.dataset.bed === ''));
    } else {
      // Toggle specific bed type
      document.querySelector('#bed-pills .pill-opt[data-bed=""]').classList.remove('active');
      if (state.units.has(val)) { state.units.delete(val); pill.classList.remove('active'); }
      else { state.units.add(val); pill.classList.add('active'); }
      // If nothing selected, re-activate "Any"
      if (state.units.size === 0) document.querySelector('#bed-pills .pill-opt[data-bed=""]').classList.add('active');
    }
    render(); updateFilterBtnLabels();
  });
});

// Program pills (toggle each)
document.querySelectorAll('#prog-pills .pill-opt').forEach(pill => {
  pill.addEventListener('click', () => {
    const pg = pill.dataset.prog;
    if (state.activePrograms.has(pg)) state.activePrograms.delete(pg);
    else state.activePrograms.add(pg);
    pill.classList.toggle('active');
    render(); updateFilterBtnLabels();
  });
});

// Other filter inputs
document.getElementById('search').addEventListener('input', e => { state.search = e.target.value.trim(); render(); });
document.getElementById('sort-by').addEventListener('change', e => { state.sort = e.target.value; render(); });
document.getElementById('f-age').addEventListener('change', e => { state.age = e.target.value; render(); updateFilterBtnLabels(); });
document.getElementById('f-ada').addEventListener('change', e => { state.ada = e.target.checked; render(); updateFilterBtnLabels(); });
document.getElementById('f-sober').addEventListener('change', e => { state.sober = e.target.checked; render(); updateFilterBtnLabels(); });
document.getElementById('f-vets').addEventListener('change', e => { state.vets = e.target.checked; render(); updateFilterBtnLabels(); });

// View toggle
document.getElementById('btn-split').addEventListener('click', () => setView('split'));
document.getElementById('btn-list').addEventListener('click', () => setView('list'));
document.getElementById('btn-map').addEventListener('click', () => setView('map'));

// ── Update button labels to reflect active filters ────────
function updateFilterBtnLabels() {
  // Price button
  const priceBtn = document.getElementById('btn-price');
  const hasRentFilter = state.maxRent < MAX_RENT_CEIL;
  const hasIncome = state.income > 0;
  if (hasRentFilter || hasIncome) {
    let label = '💲';
    if (hasIncome) label += ` ~$${estimatedRent().toLocaleString()}`;
    if (hasRentFilter) label += ` ≤$${state.maxRent.toLocaleString()}`;
    priceBtn.innerHTML = `${label} <span class="arrow">▼</span>`;
    priceBtn.classList.add('has-value');
  } else {
    priceBtn.innerHTML = '💲 Price <span class="arrow">▼</span>';
    priceBtn.classList.remove('has-value');
  }

  // Beds button
  const bedsBtn = document.getElementById('btn-beds');
  if (state.units.size > 0) {
    const labels = { sro: 'SRO', studio: 'Studio', br1: '1BR', br2: '2BR', br3: '3BR' };
    bedsBtn.innerHTML = `🛏 ${[...state.units].map(u => labels[u]).join(', ')} <span class="arrow">▼</span>`;
    bedsBtn.classList.add('has-value');
  } else {
    bedsBtn.innerHTML = '🛏 Beds <span class="arrow">▼</span>';
    bedsBtn.classList.remove('has-value');
  }

  // Program button
  const progBtn = document.getElementById('btn-program');
  if (state.activePrograms.size < 3) {
    progBtn.innerHTML = `📋 ${state.activePrograms.size} Program${state.activePrograms.size !== 1 ? 's' : ''} <span class="arrow">▼</span>`;
    progBtn.classList.add('has-value');
  } else {
    progBtn.innerHTML = '📋 Program <span class="arrow">▼</span>';
    progBtn.classList.remove('has-value');
  }

  // Region button
  const regBtn = document.getElementById('btn-region');
  if (state.activeRegions.size > 0) {
    const label = state.activeRegions.size <= 2 ? [...state.activeRegions].join(', ') : `${state.activeRegions.size} regions`;
    regBtn.innerHTML = `📍 ${label} <span class="arrow">▼</span>`;
    regBtn.classList.add('has-value');
  } else {
    regBtn.innerHTML = '📍 Region <span class="arrow">▼</span>';
    regBtn.classList.remove('has-value');
  }

  // More button
  const moreBtn = document.getElementById('btn-more');
  const moreCount = (state.age !== '' ? 1 : 0) + (state.ada ? 1 : 0) + (state.sober ? 1 : 0) + (state.vets ? 1 : 0);
  if (moreCount > 0) {
    moreBtn.innerHTML = `⚙ More (${moreCount}) <span class="arrow">▼</span>`;
    moreBtn.classList.add('has-value');
  } else {
    moreBtn.innerHTML = '⚙ More <span class="arrow">▼</span>';
    moreBtn.classList.remove('has-value');
  }

  // Active filter tags
  const tagsEl = document.getElementById('active-filters');
  let tags = '';
  if (state.income > 0) tags += afTag('Income: ~$' + estimatedRent().toLocaleString() + '/mo', 'income');
  if (state.maxRent < MAX_RENT_CEIL) tags += afTag('≤$' + state.maxRent.toLocaleString(), 'price');
  for (const u of state.units) { const l = { sro:'SRO', studio:'Studio', br1:'1BR', br2:'2BR', br3:'3BR' }; tags += afTag(l[u], 'bed-' + u); }
  if (state.activePrograms.size < 3) for (const pg of state.activePrograms) tags += afTag(pg, 'prog-' + pg);
  for (const r of state.activeRegions) tags += afTag(r, 'reg-' + r);
  if (state.age !== '') tags += afTag('Age ' + (state.age === '0' ? 'no min' : state.age + '+'), 'age');
  if (state.ada) tags += afTag('ADA', 'ada');
  if (state.sober) tags += afTag('Sober', 'sober');
  if (state.vets) tags += afTag('Veterans', 'vets');
  tagsEl.innerHTML = tags;

  // Wire up remove buttons on tags
  tagsEl.querySelectorAll('button[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.remove;
      if (key === 'price') { slider.value = MAX_RENT_CEIL; state.maxRent = MAX_RENT_CEIL; rentDisp.textContent = 'No limit'; state.income = 0; state.incomeFreq = 'monthly'; state.familySize = 1; incomeInput.value = ''; document.querySelector('input[name="income-freq"][value="monthly"]').checked = true; document.getElementById('f-famsize').value = '1'; updateEstDisplay(); }
      else if (key === 'income') { state.income = 0; incomeInput.value = ''; updateEstDisplay(); }
      else if (key.startsWith('bed-')) { const u = key.slice(4); state.units.delete(u); document.querySelector(`#bed-pills .pill-opt[data-bed="${u}"]`).classList.remove('active'); if (state.units.size === 0) document.querySelector('#bed-pills .pill-opt[data-bed=""]').classList.add('active'); }
      else if (key.startsWith('prog-')) { const pg = key.slice(5); state.activePrograms.delete(pg); document.querySelector(`#prog-pills .pill-opt[data-prog="${pg}"]`).classList.remove('active'); }
      else if (key.startsWith('reg-')) { const r = key.slice(4); state.activeRegions.delete(r); document.querySelector(`.rchip[data-region="${r}"]`).classList.remove('active'); }
      else if (key === 'age') { document.getElementById('f-age').value = ''; state.age = ''; }
      else if (key === 'ada') { document.getElementById('f-ada').checked = false; state.ada = false; }
      else if (key === 'sober') { document.getElementById('f-sober').checked = false; state.sober = false; }
      else if (key === 'vets') { document.getElementById('f-vets').checked = false; state.vets = false; }
      render(); updateFilterBtnLabels();
    });
  });
}
function afTag(label, key) {
  return `<span class="af-tag">${label}<button data-remove="${key}">&times;</button></span>`;
}

// ── Init ──────────────────────────────────────────────────
render();
updateFilterBtnLabels();

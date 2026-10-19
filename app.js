import * as THREE from 'three';
import { feature } from 'https://esm.sh/topojson-client@3.1.0';

// ---------- i18n ----------
const LANG = (location.pathname.match(/^\/(fr|en|he)\b/) || [, 'fr'])[1];
const CUR = { fr: 'eur', en: 'usd', he: 'ils' }[LANG];
const SYM = { eur: '€', usd: '$', ils: '₪' }[CUR];
const WA = '972584921492';
const T = {
  fr: { loading: 'Les plus beaux joailliers du monde', eyebrow: 'by DreamNova', h1: 'Le <em>Booking</em><br>des bijoux.', lead: "Les meilleurs joailliers de chaque continent, réunis. Diamant naturel, diamant de laboratoire, or, argent — chaque budget a sa place sur la montagne.", cta1: 'Choisir un continent', cta2: 'Voir les pièces', scroll: 'Faites défiler',
    g_eyebrow: '01 · La Terre', g_title: 'Choisissez votre continent', g_lead: "Tournez la Terre, posez-vous sur un continent : nous n'y gardons que les joailliers vérifiés, visités ou recommandés.", open: 'ouvert', soon: 'ouverture prochaine', jewelers: 'joaillier(s) vérifié(s)', pieces: 'pièces',
    m_eyebrow: '02 · La montagne des budgets', m_lead: "Continuez à défiler pour gravir la montagne : plus vous montez, plus les pièces sont rares. Le sommet est réservé aux pièces d'exception.", upto: "jusqu'à", above: 'au-delà de',
    nav_pieces: 'Pièces', c_eyebrow: '03 · Les pièces', c_title: 'Sélection vérifiée', c_lead: 'Chaque pièce vient d’un joaillier partenaire. Vous payez Dream Jewels, nous passons la commande, le joaillier fabrique et expédie, nous suivons jusqu’à votre porte.', c_note: 'Prix indicatifs convertis depuis le shekel, confirmés par le joaillier avant fabrication. Paiement sécurisé Stripe.', all: 'Tout', diamond_lab: 'Diamant de laboratoire', diamond_nat: 'Diamant naturel', gold_diamond: 'Or & diamant', silver: 'Argent', reserve: 'Réserver', indicative: 'prix indicatif', from: 'à partir de', verified: 'Partenaire vérifié', empty: 'Ce continent ouvre bientôt. Les candidatures de joailliers sont en cours.',
    h_eyebrow: '04 · Comment ça marche', h_title: 'Comme Booking, mais pour les bijoux', h_cta: 'Parler à un conseiller', h_cta2: 'Devenir joaillier partenaire', f_note: 'Agrégateur de joailliers indépendants · chaque pièce est fabriquée et certifiée par son atelier.',
    steps: [['1. Curation', 'Un joaillier n’entre que s’il est visité, recommandé ou acheté par nous. Zéro place payante.'], ['2. Commande', 'Vous réservez la pièce ici. Nous commandons chez le joaillier, en votre nom, au prix affiché.'], ['3. Certificat', 'Diamants avec certificat (GIA / IGI). Métaux poinçonnés. Photos de la pièce réelle avant envoi.'], ['4. Livraison suivie', 'Expédition assurée, suivi jusqu’à votre porte, et un seul interlocuteur : nous.']],
    wa_client: 'Bonjour Dream Jewels, je cherche une pièce : ', wa_jeweler: 'Bonjour, je suis joaillier et je souhaite rejoindre Dream Jewels.', pay_err: 'Paiement indisponible pour le moment. Écrivez-nous sur WhatsApp.' },
  en: { loading: 'The finest jewelers in the world', eyebrow: 'by DreamNova', h1: 'The <em>Booking</em><br>of jewelry.', lead: 'The best jewelers of every continent, gathered. Natural diamonds, lab-grown diamonds, gold, silver — every budget has its place on the mountain.', cta1: 'Choose a continent', cta2: 'See the pieces', scroll: 'Scroll',
    g_eyebrow: '01 · The Earth', g_title: 'Choose your continent', g_lead: 'Spin the Earth and land on a continent: we only keep jewelers we have verified, visited or been recommended.', open: 'open', soon: 'opening soon', jewelers: 'verified jeweler(s)', pieces: 'pieces',
    m_eyebrow: '02 · The budget mountain', m_lead: 'Keep scrolling to climb: the higher you go, the rarer the pieces. The summit is reserved for exceptional pieces.', upto: 'up to', above: 'above',
    nav_pieces: 'Pieces', c_eyebrow: '03 · The pieces', c_title: 'Verified selection', c_lead: 'Every piece comes from a partner jeweler. You pay Dream Jewels, we place the order, the jeweler makes and ships it, we follow it to your door.', c_note: 'Indicative prices converted from shekels, confirmed by the jeweler before production. Secure Stripe payment.', all: 'All', diamond_lab: 'Lab-grown diamond', diamond_nat: 'Natural diamond', gold_diamond: 'Gold & diamond', silver: 'Silver', reserve: 'Reserve', indicative: 'indicative price', from: 'from', verified: 'Verified partner', empty: 'This continent opens soon. Jeweler applications are in progress.',
    h_eyebrow: '04 · How it works', h_title: 'Like Booking, but for jewelry', h_cta: 'Talk to an advisor', h_cta2: 'Become a partner jeweler', f_note: 'Aggregator of independent jewelers · every piece is made and certified by its own atelier.',
    steps: [['1. Curation', 'A jeweler only gets in if we visited, were recommended or bought there ourselves. No paid listings.'], ['2. Order', 'You reserve the piece here. We order it from the jeweler, in your name, at the displayed price.'], ['3. Certificate', 'Diamonds with certificate (GIA / IGI). Hallmarked metals. Photos of the actual piece before shipping.'], ['4. Tracked delivery', 'Insured shipping, tracking to your door, and one single contact: us.']],
    wa_client: 'Hello Dream Jewels, I am looking for a piece: ', wa_jeweler: 'Hello, I am a jeweler and would like to join Dream Jewels.', pay_err: 'Payment unavailable right now. Message us on WhatsApp.' },
  he: { loading: 'הצורפים הטובים בעולם', eyebrow: 'by DreamNova', h1: 'ה־<em>Booking</em><br>של התכשיטים.', lead: 'הצורפים הטובים ביותר מכל יבשת, במקום אחד. יהלום טבעי, יהלום מעבדה, זהב, כסף — לכל תקציב יש מקום על ההר.', cta1: 'בחרו יבשת', cta2: 'לצפייה בתכשיטים', scroll: 'גללו',
    g_eyebrow: '01 · כדור הארץ', g_title: 'בחרו את היבשת שלכם', g_lead: 'סובבו את כדור הארץ ונחתו על יבשת: אנו שומרים רק צורפים מאומתים, שביקרנו אצלם או שהומלצו לנו.', open: 'פתוח', soon: 'נפתח בקרוב', jewelers: 'צורפים מאומתים', pieces: 'תכשיטים',
    m_eyebrow: '02 · הר התקציבים', m_lead: 'המשיכו לגלול כדי לטפס: ככל שעולים, התכשיטים נדירים יותר. הפסגה שמורה ליצירות יוצאות דופן.', upto: 'עד', above: 'מעל',
    nav_pieces: 'תכשיטים', c_eyebrow: '03 · התכשיטים', c_title: 'מבחר מאומת', c_lead: 'כל תכשיט מגיע מצורף שותף. אתם משלמים ל־Dream Jewels, אנחנו מזמינים, הצורף מייצר ושולח, ואנחנו מלווים עד הדלת.', c_note: 'מחירים בשקלים, מאושרים על ידי הצורף לפני הייצור. תשלום מאובטח Stripe.', all: 'הכול', diamond_lab: 'יהלום מעבדה', diamond_nat: 'יהלום טבעי', gold_diamond: 'זהב ויהלום', silver: 'כסף', reserve: 'להזמנה', indicative: 'מחיר משוער', from: 'החל מ־', verified: 'שותף מאומת', empty: 'היבשת הזו נפתחת בקרוב. בקשות הצטרפות של צורפים בטיפול.',
    h_eyebrow: '04 · איך זה עובד', h_title: 'כמו Booking, אבל לתכשיטים', h_cta: 'לדבר עם יועץ', h_cta2: 'להצטרף כצורף שותף', f_note: 'אגרגטור של צורפים עצמאיים · כל תכשיט מיוצר ומאושר על ידי הסטודיו שלו.',
    steps: [['1. אוצרות', 'צורף נכנס רק אם ביקרנו אצלו, הומלץ לנו או קנינו אצלו בעצמנו. אפס מקומות בתשלום.'], ['2. הזמנה', 'אתם מזמינים כאן. אנחנו מזמינים אצל הצורף, על שמכם, במחיר המוצג.'], ['3. תעודה', 'יהלומים עם תעודה (GIA / IGI). מתכות מוטבעות. תמונות של התכשיט האמיתי לפני המשלוח.'], ['4. משלוח במעקב', 'משלוח מבוטח, מעקב עד הדלת, ואיש קשר אחד בלבד: אנחנו.']],
    wa_client: 'שלום Dream Jewels, אני מחפש/ת תכשיט: ', wa_jeweler: 'שלום, אני צורף ומעוניין להצטרף ל־Dream Jewels.', pay_err: 'התשלום אינו זמין כרגע. כתבו לנו בוואטסאפ.' }
}[LANG];
document.documentElement.lang = LANG;
document.documentElement.dir = LANG === 'he' ? 'rtl' : 'ltr';
document.querySelectorAll('[data-i]').forEach(e => { if (T[e.dataset.i]) e.textContent = T[e.dataset.i]; });
document.querySelectorAll('[data-i-html]').forEach(e => { e.innerHTML = T[e.dataset.iHtml]; });
document.querySelectorAll('#langs a').forEach(a => a.classList.toggle('on', a.dataset.l === LANG));
document.getElementById('steps').innerHTML = T.steps.map(([b, s]) => `<div class="step"><b>${b}</b><span>${s}</span></div>`).join('');
document.getElementById('wa_client').href = `https://wa.me/${WA}?text=${encodeURIComponent(T.wa_client)}`;
document.getElementById('wa_jeweler').href = `https://wa.me/${WA}?text=${encodeURIComponent(T.wa_jeweler)}`;
const toast = (m) => { const t = document.getElementById('toast'); t.textContent = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 4000); };
const fmt = (ils, rates) => new Intl.NumberFormat(LANG === 'he' ? 'he-IL' : LANG === 'fr' ? 'fr-FR' : 'en-US', { style: 'currency', currency: CUR.toUpperCase(), maximumFractionDigits: 0 }).format(Math.round(ils * rates[CUR] / 10) * 10);

// ---------- data + DOM ----------
const BASE = location.pathname.replace(/\/(fr|en|he)\/?.*$/, '');
const data = await (await fetch(BASE + '/data.json')).json();
const state = { continent: 'middle_east', filter: 'all', tier: 0 };
const tierOf = (p) => data.tiers.findIndex(t => t.id === p.tier);

function renderContinents() {
  const box = document.getElementById('continents');
  box.innerHTML = data.continents.map(c => `<button class="chip ${c.id === state.continent ? 'on' : ''} ${c.open ? '' : 'soon'}" data-c="${c.id}">${c.name[LANG]}</button>`).join('');
  box.querySelectorAll('button').forEach(b => b.onclick = () => { state.continent = b.dataset.c; globeTarget(); renderContinents(); renderGrid(); });
  const c = data.continents.find(x => x.id === state.continent);
  const js = data.jewelers.filter(j => j.continent === c.id);
  const ps = data.pieces.filter(p => js.some(j => j.id === p.jeweler));
  const tr = document.getElementById('trailer'); if (c.open) { tr.style.display = 'block'; if (!tr.src) tr.src = BASE + '/media/bg/trailer-israel.mp4'; tr.play().catch(() => {}); } else { tr.style.display = 'none'; tr.pause(); }
  document.getElementById('continent_info').textContent = c.open ? `${js.length} ${T.jewelers} · ${ps.length} ${T.pieces} · ${T.open}` : `${T.soon} — ${T.empty}`;
}
function renderTiers() {
  document.getElementById('tiers').innerHTML = data.tiers.map((t, i) => `<div class="${i === state.tier ? 'on' : ''}"><span>${t.name[LANG]}</span><span>${t.max ? `${T.upto} ${fmt(t.max, data.rates)}` : `${T.above} ${fmt(data.tiers[i - 1].max, data.rates)}`}</span></div>`).join('');
  document.getElementById('tier_title').textContent = data.tiers[state.tier].name[LANG];
}
function renderGrid() {
  const kinds = ['all', ...new Set(data.pieces.map(p => p.kind))];
  document.getElementById('filters').innerHTML = kinds.map(k => `<button class="chip ${k === state.filter ? 'on' : ''}" data-k="${k}">${T[k] || k}</button>`).join('');
  document.querySelectorAll('#filters button').forEach(b => b.onclick = () => { state.filter = b.dataset.k; renderGrid(); });
  const js = data.jewelers.filter(j => j.continent === state.continent).map(j => j.id);
  const ps = data.pieces.filter(p => js.includes(p.jeweler) && (state.filter === 'all' || p.kind === state.filter)).sort((a, b) => a.ils - b.ils);
  const grid = document.getElementById('grid');
  if (!ps.length) { grid.innerHTML = `<p class="lead">${T.empty}</p>`; return; }
  grid.innerHTML = ps.map(p => {
    const j = data.jewelers.find(x => x.id === p.jeweler);
    const media = p.video ? `<video muted loop playsinline preload="none" poster="${BASE + p.img}" data-src="${BASE + p.video}"></video>` : `<img loading="lazy" src="${BASE + p.img}" alt="">`;
    return `<article class="card"><div class="media">${media}<span class="tag">${data.tiers[tierOf(p)].name[LANG]}</span></div><div class="body"><h3>${p.name[LANG]}</h3><div class="jw">${j.name} · ${j.city} ${j.verified ? '· ✓ ' + T.verified : ''}</div><div class="price">${T.from} ${fmt(p.ils, data.rates)}<small>${T.indicative}</small></div><button class="btn solid" data-buy="${p.id}">${T.reserve}</button></div></article>`;
  }).join('');
  grid.querySelectorAll('video').forEach(v => { const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}); } else v.pause(); }, { rootMargin: '200px', threshold: .05 }); io.observe(v); });
  grid.querySelectorAll('[data-buy]').forEach(b => b.onclick = async () => {
    b.disabled = true;
    try {
      const API = location.hostname.endsWith('github.io') ? 'https://dream-jewels-dreamnova.vercel.app/api/checkout' : '/api/checkout';
      const r = await fetch(API, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: b.dataset.buy, lang: LANG }) });
      const j = await r.json(); if (!j.url) throw new Error(j.error || 'no url'); location.href = j.url;
    } catch (e) { toast(T.pay_err); b.disabled = false; }
  });
}
renderContinents(); renderTiers(); renderGrid();

// ---------- THREE ----------
const canvas = document.getElementById('gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x07060a, 0.035);
const cam = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
scene.add(new THREE.AmbientLight(0xffffff, .35));
const sun = new THREE.DirectionalLight(0xfff1d6, 1.6); sun.position.set(5, 8, 4); scene.add(sun);
const rim = new THREE.PointLight(0xd8b86a, 30, 60); rim.position.set(-6, 4, -4); scene.add(rim);

// stars
{ const g = new THREE.BufferGeometry(); const n = 2500, a = new Float32Array(n * 3); for (let i = 0; i < n * 3; i++) a[i] = (Math.random() - .5) * 160; g.setAttribute('position', new THREE.BufferAttribute(a, 3)); scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xcdbf9f, size: .12, transparent: true, opacity: .7 }))); }

// ---- GLOBE ----
const globe = new THREE.Group(); scene.add(globe);
const R = 2.2;
globe.add(new THREE.Mesh(new THREE.SphereGeometry(R - .01, 64, 64), new THREE.MeshPhysicalMaterial({ color: 0x0b0a12, roughness: .85, metalness: .1, clearcoat: .3 })));
globe.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.04, 64, 64), new THREE.MeshBasicMaterial({ color: 0xd8b86a, transparent: true, opacity: .06, side: THREE.BackSide })));
const ll = (lat, lon, r = R) => { const p = (90 - lat) * Math.PI / 180, t = (lon + 180) * Math.PI / 180; return new THREE.Vector3(-r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t)); };
fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json').then(r => r.json()).then(topo => {
  const geo = feature(topo, topo.objects.countries); const pts = [];
  geo.features.forEach(f => { const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates; polys.forEach(poly => poly.forEach(ring => { for (let i = 0; i < ring.length - 1; i++) { const a = ll(ring[i][1], ring[i][0]), b = ll(ring[i + 1][1], ring[i + 1][0]); pts.push(a.x, a.y, a.z, b.x, b.y, b.z); } })); });
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  globe.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0xe9d9ad, transparent: true, opacity: .55 })));
}).catch(() => {});
const markers = {};
data.continents.forEach(c => {
  const m = new THREE.Mesh(new THREE.SphereGeometry(.05, 16, 16), new THREE.MeshBasicMaterial({ color: c.open ? 0xf2dca2 : 0x8a7a5a })); m.position.copy(ll(c.lat, c.lon, R + .02));
  const ring = new THREE.Mesh(new THREE.RingGeometry(.09, .12, 32), new THREE.MeshBasicMaterial({ color: 0xd8b86a, side: THREE.DoubleSide, transparent: true, opacity: .8 })); ring.position.copy(m.position); ring.lookAt(0, 0, 0); m.add(ring); ring.position.set(0, 0, 0); ring.lookAt(m.position.clone().multiplyScalar(2));
  globe.add(m); markers[c.id] = m;
});
let globeRotTarget = 0, globeRotY = 0, autoSpin = true;
function globeTarget() { const c = data.continents.find(x => x.id === state.continent); const v = ll(c.lat, c.lon); let want = -Math.atan2(v.x, v.z); while (want - globeRotTarget > Math.PI) want -= 2 * Math.PI; while (want - globeRotTarget < -Math.PI) want += 2 * Math.PI; globeRotTarget = want; autoSpin = false; }
globeTarget();
// drag to spin
let drag = null; canvas.addEventListener('pointerdown', e => drag = e.clientX); addEventListener('pointerup', () => drag = null);
addEventListener('pointermove', e => { if (drag !== null) { globeRotTarget += (e.clientX - drag) * .006; drag = e.clientX; } });

// ---- MOUNTAIN ----
const mtn = new THREE.Group(); mtn.visible = false; scene.add(mtn);
const S = 44, SEG = 180, H = 12;
const terrainGeo = new THREE.PlaneGeometry(S, S, SEG, SEG); terrainGeo.rotateX(-Math.PI / 2);
const noise = (x, z) => Math.sin(x * .9) * Math.cos(z * .7) * .5 + Math.sin(x * 2.3 + z * 1.7) * .25 + Math.sin(x * 5.1 - z * 4.3) * .1 + Math.sin(x * 11 + z * 9) * .04;
const hAt = (x, z) => { const d = Math.hypot(x, z) / (S / 2); const ridge = 1 + .12 * Math.sin(Math.atan2(z, x) * 5); return Math.max(0, H * Math.pow(Math.max(0, 1 - d * 1.08 * ridge), 1.7) + noise(x * .5, z * .5) * (1.4 - d)); };
{ const pos = terrainGeo.attributes.position, colors = []; const snow = new THREE.Color(0xfaf6ee), rock = new THREE.Color(0x6b6572), moss = new THREE.Color(0x2f4a3a), sand = new THREE.Color(0x8a7a62);
  for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), z = pos.getZ(i), y = hAt(x, z); pos.setY(i, y); const t = y / H; let c; if (t > .72) c = rock.clone().lerp(snow, (t - .72) / .28); else if (t > .35) c = moss.clone().lerp(rock, (t - .35) / .37); else c = sand.clone().lerp(moss, t / .35); colors.push(c.r, c.g, c.b); }
  terrainGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); terrainGeo.computeVertexNormals(); }
mtn.add(new THREE.Mesh(terrainGeo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .9, metalness: .05, flatShading: true })));
mtn.add(new THREE.HemisphereLight(0xcfd8ff, 0x3a2e1e, .9));
const rimGold = new THREE.DirectionalLight(0xf2dca2, 3.2); rimGold.position.set(-10, 14, -12); mtn.add(rimGold);
const moon = new THREE.PointLight(0xbfd4ff, 40, 80); moon.position.set(12, 18, 10); mtn.add(moon);
// trees
{ const n = 1400, g = new THREE.ConeGeometry(.14, .6, 6), m = new THREE.MeshStandardMaterial({ color: 0x14261c, roughness: 1 }), im = new THREE.InstancedMesh(g, m, n), o = new THREE.Object3D(); let k = 0; while (k < n) { const a = Math.random() * Math.PI * 2, r = 7 + Math.random() * 13, x = Math.cos(a) * r, z = Math.sin(a) * r, y = hAt(x, z); if (y < .25 || y > 4.6) continue; o.position.set(x, y + .25, z); o.scale.setScalar(.5 + Math.random() * .9); o.updateMatrix(); im.setMatrixAt(k++, o.matrix); } mtn.add(im); }
// clouds
const clouds = new THREE.Group(); mtn.add(clouds);
const glowTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); const gr = x.createRadialGradient(64, 64, 2, 64, 64, 64); gr.addColorStop(0, 'rgba(255,245,225,1)'); gr.addColorStop(.45, 'rgba(255,240,215,.35)'); gr.addColorStop(1, 'rgba(255,240,215,0)'); x.fillStyle = gr; x.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); })();
for (let i = 0; i < 90; i++) { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, transparent: true, opacity: .5, depthWrite: false })); const a = Math.random() * Math.PI * 2, r = 4 + Math.random() * 11; sp.position.set(Math.cos(a) * r, H * .5 + (Math.random() - .5) * 2, Math.sin(a) * r); sp.scale.set(3.5 + Math.random() * 4, 1.4 + Math.random() * 1.2, 1); clouds.add(sp); }
// REAL JEWELS on the mountain: one framed billboard per piece along the camera spiral
const sorted = [...data.pieces].sort((a, b) => a.ils - b.ils);
const texLoader = new THREE.TextureLoader();
const boards = [];
const camRad = (pm) => 20 - pm * 12, camAng = (pm) => pm * 6.0, camAlt = (pm) => pm * (H + 2.5);
sorted.forEach((p, i) => {
  const t = (i + .5) / sorted.length; const ang = camAng(t) + (document.documentElement.dir === 'rtl' ? -.32 : .32), rad = camRad(t) - 4.5; const x = Math.cos(ang) * rad, z = Math.sin(ang) * rad; const y = Math.max(hAt(x, z) + 1.2, camAlt(t) + .9);
  const g = new THREE.Group(); g.position.set(x, y, z);
  const tex = texLoader.load(BASE + p.img); tex.colorSpace = THREE.SRGBColorSpace;
  const pic = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); g.add(pic);
  const frame = new THREE.Mesh(new THREE.PlaneGeometry(1.62, 1.62), new THREE.MeshBasicMaterial({ color: 0xd8b86a })); frame.position.z = -.012; g.add(frame);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xf2dca2, transparent: true, opacity: .55, depthWrite: false })); halo.scale.set(3.4, 3.4, 1); halo.position.z = -.05; g.add(halo);
  g.userData = { p, t }; mtn.add(g); boards.push(g);
});
// the focused piece gets a live video texture (desktop only)
const focusVideo = document.createElement('video'); Object.assign(focusVideo, { muted: true, loop: true, playsInline: true, crossOrigin: 'anonymous', preload: 'auto' });
const focusTex = new THREE.VideoTexture(focusVideo); focusTex.colorSpace = THREE.SRGBColorSpace;
let focusIdx = -1;
function setFocus(i) {
  if (i === focusIdx) return; const prev = boards[focusIdx]; if (prev) { prev.children[0].material.map = prev.userData.tex || prev.children[0].material.map; prev.children[0].material.needsUpdate = true; prev.scale.setScalar(1); }
  focusIdx = i; const g = boards[i], p = g.userData.p; g.scale.setScalar(1.35);
  if (!mobile && p.video) { g.userData.tex = g.children[0].material.map; focusVideo.src = BASE + p.video; focusVideo.play().catch(() => {}); g.children[0].material.map = focusTex; g.children[0].material.needsUpdate = true; }
  const j = data.jewelers.find(x => x.id === p.jeweler);
  document.getElementById('focus').innerHTML = `<img src="${BASE + p.img}" alt=""><div><h3>${p.name[LANG]}</h3><div class="jw">${j.name.split(' — ')[0]} · ✓ ${T.verified}</div><div class="price">${T.from} ${fmt(p.ils, data.rates)}</div><button class="btn solid" data-buy="${p.id}">${T.reserve}</button></div>`;
  document.querySelector('#focus [data-buy]').onclick = () => document.querySelector(`#grid [data-buy="${p.id}"]`)?.click() || location.assign('#catalogue');
}
const summit = new THREE.Mesh(new THREE.OctahedronGeometry(.6, 0), new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: .2, roughness: 0, transmission: .85, thickness: 1, emissive: 0xf2dca2, emissiveIntensity: .6 })); summit.position.set(0, H + 1.1, 0); mtn.add(summit);
// ---------- scroll + render ----------
const secGlobe = document.getElementById('globe'), secMtn = document.getElementById('mountain');
const prog = (el) => { const r = el.getBoundingClientRect(); return THREE.MathUtils.clamp(-r.top / (r.height - innerHeight), 0, 1); };
const vis = (el) => { const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; };
function resize() { renderer.setSize(innerWidth, innerHeight, false); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); }
addEventListener('resize', resize); resize();
const clock = new THREE.Clock(); const mobile = innerWidth < 720;
function frame() {
  const t = clock.getElapsedTime(), dt = Math.min(clock.getDelta(), .05);
  const heroR = document.getElementById('hero').getBoundingClientRect();
  const mR = secMtn.getBoundingClientRect(); const mOn = mR.top <= innerHeight * .35 && mR.bottom > 0; const gOn = (vis(secGlobe) || heroR.bottom > 0) && !mOn;
  const heroP = THREE.MathUtils.clamp(-heroR.top / innerHeight, 0, 1); const hb = document.getElementById('herobg'), hs = document.getElementById('heroshade'); hb.style.opacity = hs.style.opacity = String(1 - Math.min(1, heroP * 1.6)); if (heroP > .95 && !hb.paused) hb.pause(); else if (heroP <= .95 && hb.paused) hb.play().catch(() => {});
  globe.visible = gOn && heroP > .25; mtn.visible = mOn;
  if (globe.visible) {
    const pg = prog(secGlobe), intro = THREE.MathUtils.clamp(heroR.bottom / innerHeight, 0, 1);
    if (autoSpin) globeRotTarget += .0025;
    globeRotY += (globeRotTarget - globeRotY) * .06; globe.rotation.y = globeRotY; globe.rotation.x = .25 - pg * .15;
    const off = mobile ? 0 : (document.documentElement.dir === 'rtl' ? -1.6 : 1.6);
    cam.position.set(off * (1 - intro), mobile ? 1.5 : .4, 7.5 - (1 - intro) * 1.2 + intro * 2.5); globe.position.y = mobile ? 1.5 * intro : 0; cam.lookAt(0, mobile ? .4 : 0, 0);
    Object.values(markers).forEach(m => { const s = 1 + Math.sin(t * 3) * .15; m.children[0].scale.setScalar(s); });
  }
  if (mtn.visible) {
    const pm = prog(secMtn), alt = camAlt(pm), ang = camAng(pm), rad = camRad(pm);
    cam.position.set(Math.cos(ang) * rad, alt + 2.2, Math.sin(ang) * rad); cam.lookAt(Math.cos(ang + .25) * (rad - 4.5) * .5, alt + .9, Math.sin(ang + .25) * (rad - 4.5) * .5);
    clouds.children.forEach((s, i) => { s.position.x += Math.sin(t * .2 + i) * .002; });
    let best = 0, bd = 1e9; boards.forEach((g, i) => { const dd = Math.abs(g.userData.t - pm); g.visible = dd < .09; const op = THREE.MathUtils.clamp(1 - (dd - .03) / .06, 0, 1); g.children[0].material.opacity = g.children[1].material.opacity = op; g.children[0].material.transparent = g.children[1].material.transparent = true; g.children[2].material.opacity = .55 * op; g.quaternion.copy(cam.quaternion); g.position.y += Math.sin(t * 1.5 + i) * .0015; const d = Math.abs(g.userData.t - pm); if (d < bd) { bd = d; best = i; } });
    setFocus(best); summit.rotation.y += dt * .5;
    const ti = data.tiers.reduce((acc, tr, i) => pm >= tr.alt - .08 ? i : acc, 0); if (ti !== state.tier) { state.tier = ti; renderTiers(); }
  }
  renderer.render(scene, cam); requestAnimationFrame(frame);
}
frame();
setTimeout(() => document.getElementById('loader').classList.add('off'), 900);

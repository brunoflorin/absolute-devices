// Schémas SVG générés (icônes lucide, licence ISC) — aucun visuel externe.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const L = require("lucide-react");

const FONT = "Segoe UI, Arial, Helvetica, sans-serif";
const GRIS = "#94a3b8";

export function iconSvg(name, color, size = 24, stroke = 2) {
  return renderToStaticMarkup(React.createElement(L[name], { size, color, strokeWidth: stroke }));
}

// Icône positionnée (centre cx,cy)
function icon(name, color, cx, cy, size) {
  const s = iconSvg(name, color, size).replace("<svg ", `<svg x="${cx - size / 2}" y="${cy - size / 2}" `);
  return s;
}

function esc(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function wrap(text, max) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max && cur) { lines.push(cur); cur = w; }
    else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}

// ------------------------------------------------------------------ Schéma général
const NODES = {
  internet:    { x: 100,  y: 320, icon: "Globe",       label: "Internet" },
  filtre:      { x: 330,  y: 62,  icon: "Filter",      label: "Filtre antispam" },
  m365:        { x: 650,  y: 62,  icon: "LayoutGrid",  label: "Microsoft 365" },
  box:         { x: 300,  y: 320, icon: "Router",      label: "Box opérateur" },
  parefeu:     { x: 480,  y: 320, icon: "BrickWall",   label: "Pare-feu" },
  switch:      { x: 660,  y: 320, icon: "Network",     label: "Switch" },
  pc1:         { x: 860,  y: 215, icon: "Monitor",     label: "Poste 1" },
  pc2:         { x: 860,  y: 325, icon: "Monitor",     label: "Poste 2" },
  nas:         { x: 860,  y: 435, icon: "HardDrive",   label: "NAS (sauvegarde)" },
  telephone:   { x: 1100, y: 215, icon: "Smartphone",  label: "Téléphone" },
  cloudsave:   { x: 1100, y: 435, icon: "CloudUpload", label: "Sauvegarde Cloud" },
  teletravail: { x: 480,  y: 575, icon: "Laptop",      label: "Télétravail" },
};

const LINKS = {
  "internet-box": { dash: false },
  "box-parefeu": { dash: false },
  "parefeu-switch": { dash: false },
  "switch-pc1": { dash: false },
  "switch-pc2": { dash: false },
  "switch-nas": { dash: false },
  "internet-filtre": { dash: false },
  "filtre-m365": { dash: false },
  "m365-pc1": { dash: true },
  "m365-pc2": { dash: true },
  "m365-teletravail": { dash: true },
  "m365-telephone": { dash: true },
  "nas-cloudsave": { dash: true, label: "copie chiffrée" },
  "teletravail-parefeu": { dash: true, label: "tunnel VPN", tunnel: true },
};

export function carteSvg(carte, couleur) {
  const on = new Set(carte.on);
  const focus = new Set(carte.focus || []);
  const liensOn = new Set(carte.liens || []);
  const badge = new Set(carte.badge || []);
  const W = 1200, H = 650, R = 40;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${FONT}">`;
  s += `<defs><filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter></defs>`;
  // Zones
  s += `<rect x="210" y="150" width="760" height="360" rx="22" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="8 6"/>`;
  s += `<text x="230" y="182" font-size="20" font-weight="700" fill="#64748b">VOS LOCAUX</text>`;
  s += `<text x="490" y="20" font-size="17" font-weight="700" fill="#64748b" text-anchor="middle">DANS LE CLOUD</text>`;

  // Liens
  for (const [id, l] of Object.entries(LINKS)) {
    const [a, b] = id.split("-");
    const A = NODES[a], B = NODES[b];
    const active = liensOn.has(id);
    if (!active && !(on.has(a) && on.has(b))) {
      s += `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#e2e8f0" stroke-width="3" ${l.dash ? 'stroke-dasharray="8 7"' : ""}/>`;
      continue;
    }
    const c = active ? couleur : "#cbd5e1";
    if (l.tunnel && active) s += `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${couleur}" stroke-opacity="0.18" stroke-width="22" stroke-linecap="round"/>`;
    s += `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${c}" stroke-width="${active ? 5 : 3}" ${l.dash ? 'stroke-dasharray="10 8"' : ""}/>`;
    if (l.label && active) {
      const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
      s += `<rect x="${mx - 70}" y="${my - 16}" width="140" height="30" rx="15" fill="#fff" stroke="${couleur}" stroke-width="2"/>`;
      s += `<text x="${mx}" y="${my + 6}" font-size="16" font-weight="700" fill="${couleur}" text-anchor="middle">${l.label}</text>`;
    }
  }

  // Noeuds
  for (const [id, n] of Object.entries(NODES)) {
    const isOn = on.has(id), isFocus = focus.has(id);
    const op = isOn ? 1 : 0.25;
    s += `<g opacity="${op}">`;
    if (isFocus) {
      s += `<circle cx="${n.x}" cy="${n.y}" r="${R + 14}" fill="${couleur}" opacity="0.45" filter="url(#glow)"/>`;
      s += `<circle cx="${n.x}" cy="${n.y}" r="${R + 6}" fill="${couleur}"/>`;
      s += icon(n.icon, "#ffffff", n.x, n.y, 44);
    } else {
      s += `<circle cx="${n.x}" cy="${n.y}" r="${R}" fill="#fff" stroke="${isOn ? "#475569" : GRIS}" stroke-width="3"/>`;
      s += icon(n.icon, isOn ? "#334155" : GRIS, n.x, n.y, 38);
    }
    if (badge.has(id)) {
      s += `<circle cx="${n.x + 34}" cy="${n.y - 34}" r="19" fill="#fff" stroke="${couleur}" stroke-width="3"/>`;
      s += icon("ShieldCheck", couleur, n.x + 34, n.y - 34, 24);
    }
    const ly = n.y + R + (isFocus ? 34 : 26);
    s += `<text x="${n.x}" y="${ly}" font-size="${isFocus ? 21 : 18}" font-weight="${isFocus ? 800 : 600}" fill="${isFocus ? couleur : "#334155"}" text-anchor="middle">${esc(n.label)}</text>`;
    s += `</g>`;
  }
  return s + "</svg>";
}

// ------------------------------------------------------------------ Flux en étapes
export function fluxSvg(etapes, couleur) {
  const W = 1200, H = 330, n = etapes.length, R = 62;
  const step = W / n;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${FONT}">`;
  s += `<defs><marker id="fl" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="${couleur}"/></marker></defs>`;
  etapes.forEach(([ic, label], i) => {
    const cx = step * i + step / 2, cy = 100;
    if (i < n - 1) {
      s += `<line x1="${cx + R + 12}" y1="${cy}" x2="${cx + step - R - 24}" y2="${cy}" stroke="${couleur}" stroke-width="5" marker-end="url(#fl)"/>`;
    }
    s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${couleur}" fill-opacity="0.12" stroke="${couleur}" stroke-width="4"/>`;
    s += icon(ic, couleur, cx, cy, 58);
    s += `<circle cx="${cx - R + 8}" cy="${cy - R + 8}" r="20" fill="${couleur}"/>`;
    s += `<text x="${cx - R + 8}" y="${cy - R + 15}" font-size="21" font-weight="800" fill="#fff" text-anchor="middle">${i + 1}</text>`;
    wrap(label, 20).forEach((line, k) => {
      s += `<text x="${cx}" y="${cy + R + 42 + k * 30}" font-size="24" font-weight="600" fill="#1e293b" text-anchor="middle">${esc(line)}</text>`;
    });
  });
  return s + "</svg>";
}

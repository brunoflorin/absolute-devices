// Bibliothèque de schémas techniques (style documentation réseau moderne).
// Icônes : lucide (ISC). Les libellés sont des « puces » à fond plein, toujours dessinées au-dessus des traits.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const L = require("lucide-react");

export const FONT = "Segoe UI, Inter, Arial, sans-serif";
export const FS = 1.3;
export const MONO = "Consolas, 'JetBrains Mono', 'DejaVu Sans Mono', monospace";
let uid = 0;
const nid = (p) => `${p}${uid++}`;
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;");

export function icon(name, x, y, size, color, sw = 1.8) {
  if (!L[name]) throw new Error("Icône inconnue : " + name);
  const s = renderToStaticMarkup(React.createElement(L[name], { size, color, strokeWidth: sw }));
  return s.replace("<svg ", `<svg x="${x - size / 2}" y="${y - size / 2}" `);
}

// Tuile icône (carré arrondi teinté)
export function tile(name, x, y, s, color, { fill = null, solid = false } = {}) {
  const f = solid ? color : fill || color;
  return `<rect x="${x - s / 2}" y="${y - s / 2 + 4}" width="${s}" height="${s}" rx="${s * 0.26}" fill="#0f172a" opacity="0.08"/>` +
    `<rect x="${x - s / 2}" y="${y - s / 2}" width="${s}" height="${s}" rx="${s * 0.26}" fill="${f}" ${solid ? "" : `fill-opacity="0.12" stroke="${color}" stroke-opacity="0.35" stroke-width="1.5"`}/>` +
    icon(name, x, y, s * 0.52, solid ? "#ffffff" : color, 2);
}

// Puce de texte (au-dessus des traits)
export function chip(x, y, text, { bg = "#ffffff", color = "#0f172a", border = "#cbd5e1", size = 15, mono = false, bold = false, anchor = "middle", pad = 10 } = {}) {
  size *= FS;
  const w = String(text).length * size * (mono ? 0.62 : 0.56) + pad * 2, h = size + pad * 1.2;
  const x0 = anchor === "middle" ? x - w / 2 : anchor === "start" ? x : x - w;
  return `<rect x="${x0}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${bg}" stroke="${border}" stroke-width="1.5"/>` +
    `<text x="${x0 + w / 2}" y="${y + size * 0.36}" font-size="${size}" font-family="${mono ? MONO : FONT}" font-weight="${bold ? 700 : 500}" fill="${color}" text-anchor="middle">${esc(text)}</text>`;
}

export function label(x, y, text, { size = 16, color = "#334155", weight = 600, anchor = "middle", mono = false } = {}) {
  size *= FS;
  return `<text x="${x}" y="${y}" font-size="${size}" font-family="${mono ? MONO : FONT}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${esc(text)}</text>`;
}

export function line(x1, y1, x2, y2, color, { w = 3, dash = "", arrow = false, op = 1 } = {}) {
  const m = nid("a");
  return (arrow ? `<defs><marker id="${m}" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${color}"/></marker></defs>` : "") +
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" ${dash ? `stroke-dasharray="${dash}"` : ""} opacity="${op}" ${arrow ? `marker-end="url(#${m})"` : ""}/>`;
}

export function path(d, color, { w = 3, dash = "", arrow = false, op = 1, fill = "none" } = {}) {
  const m = nid("a");
  return (arrow ? `<defs><marker id="${m}" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="${color}"/></marker></defs>` : "") +
    `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${dash ? `stroke-dasharray="${dash}"` : ""} opacity="${op}" ${arrow ? `marker-end="url(#${m})"` : ""}/>`;
}

export function panel(x, y, w, h, { fill = "#ffffff", stroke = "#e2e8f0", r = 18, shadow = true, sw = 1.5 } = {}) {
  return (shadow ? `<rect x="${x}" y="${y + 6}" width="${w}" height="${h}" rx="${r}" fill="#0f172a" opacity="0.06"/>` : "") +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

export function grid(W, H, color = "#94a3b8", op = 0.12, step = 32) {
  const g = nid("g");
  return `<defs><pattern id="${g}" width="${step}" height="${step}" patternUnits="userSpaceOnUse"><path d="M ${step} 0 L 0 0 0 ${step}" fill="none" stroke="${color}" stroke-width="1"/></pattern></defs><rect width="${W}" height="${H}" fill="url(#${g})" opacity="${op}"/>`;
}

export function glow(x, y, r, color, op = 0.45) {
  const g = nid("gl");
  return `<defs><radialGradient id="${g}"><stop offset="0" stop-color="${color}" stop-opacity="${op}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${g})"/>`;
}

// ---------- Équipements ----------
export function appliance(x, y, w, { accent = "#C5161D", dim = false } = {}) {
  const h = w * 0.24, g = nid("ap");
  const b1 = dim ? "#64748b" : "#1e293b", b2 = dim ? "#475569" : "#0b1220";
  let s = `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient></defs>`;
  s += `<rect x="${x + 6}" y="${y + h * 0.25}" width="${w}" height="${h}" rx="10" fill="#0f172a" opacity="0.15"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="url(#${g})"/>`;
  s += `<rect x="${x}" y="${y}" width="${w * 0.045}" height="${h}" rx="5" fill="${dim ? "#94a3b8" : accent}"/>`;
  s += `<rect x="${x + 8}" y="${y + 4}" width="${w - 16}" height="${h * 0.12}" rx="4" fill="#ffffff" opacity="0.08"/>`;
  for (let i = 0; i < 8; i++) {
    const px = x + w * 0.1 + i * w * 0.075;
    s += `<rect x="${px}" y="${y + h * 0.42}" width="${w * 0.058}" height="${h * 0.34}" rx="3" fill="#020617" stroke="#334155"/>`;
    s += `<rect x="${px + w * 0.012}" y="${y + h * 0.34}" width="${w * 0.01}" height="${h * 0.05}" fill="${dim ? "#64748b" : i % 3 ? "#22c55e" : "#f59e0b"}"/>`;
  }
  const lx = x + w * 0.78;
  s += `<circle cx="${lx}" cy="${y + h * 0.5}" r="${h * 0.07}" fill="${dim ? "#f59e0b" : "#22c55e"}"/>`;
  s += `<circle cx="${lx + h * 0.28}" cy="${y + h * 0.5}" r="${h * 0.07}" fill="${dim ? "#475569" : "#22c55e"}"/>`;
  if (!dim) s += glow(lx, y + h * 0.5, h * 0.35, "#22c55e", 0.5);
  return s;
}

export function router(x, y, s, color = "#475569") {
  let o = `<rect x="${x - s / 2}" y="${y - s * 0.12}" width="${s}" height="${s * 0.34}" rx="${s * 0.08}" fill="#f8fafc" stroke="${color}" stroke-width="2.5"/>`;
  o += line(x - s * 0.25, y - s * 0.12, x - s * 0.32, y - s * 0.42, color, { w: 2.5 });
  o += line(x + s * 0.25, y - s * 0.12, x + s * 0.32, y - s * 0.42, color, { w: 2.5 });
  for (let i = 0; i < 3; i++) o += `<circle cx="${x - s * 0.25 + i * s * 0.12}" cy="${y + s * 0.05}" r="${s * 0.035}" fill="#22c55e"/>`;
  return o;
}

export function cloud(x, y, s, color = "#64748b", fill = "#f1f5f9") {
  const k = s / 100;
  return `<path transform="translate(${x - 50 * k} ${y - 32 * k}) scale(${k})" d="M25 60 a18 18 0 0 1 2 -36 a24 24 0 0 1 45 -6 a17 17 0 0 1 18 22 a14 14 0 0 1 -5 20 z" fill="${fill}" stroke="${color}" stroke-width="${2.5 / k}"/>`;
}

export function laptop(x, y, s, color = "#334155", screen = "#e0f2fe") {
  return `<rect x="${x - s * 0.4}" y="${y - s * 0.32}" width="${s * 0.8}" height="${s * 0.5}" rx="${s * 0.04}" fill="#ffffff" stroke="${color}" stroke-width="2.5"/>` +
    `<rect x="${x - s * 0.34}" y="${y - s * 0.27}" width="${s * 0.68}" height="${s * 0.4}" rx="${s * 0.02}" fill="${screen}"/>` +
    `<path d="M ${x - s * 0.5} ${y + s * 0.2} L ${x + s * 0.5} ${y + s * 0.2} L ${x + s * 0.44} ${y + s * 0.27} L ${x - s * 0.44} ${y + s * 0.27} Z" fill="#e2e8f0" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>`;
}

export function monitor(x, y, s, color = "#334155", screen = "#e0f2fe") {
  return `<rect x="${x - s * 0.42}" y="${y - s * 0.35}" width="${s * 0.84}" height="${s * 0.55}" rx="${s * 0.05}" fill="#ffffff" stroke="${color}" stroke-width="2.5"/>` +
    `<rect x="${x - s * 0.36}" y="${y - s * 0.29}" width="${s * 0.72}" height="${s * 0.43}" rx="${s * 0.02}" fill="${screen}"/>` +
    line(x, y + s * 0.2, x, y + s * 0.32, color, { w: 3 }) + line(x - s * 0.16, y + s * 0.33, x + s * 0.16, y + s * 0.33, color, { w: 3 });
}

export function switchBox(x, y, w, color = "#334155") {
  const h = w * 0.22;
  let s = `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="8" fill="#f8fafc" stroke="${color}" stroke-width="2.5"/>`;
  for (let i = 0; i < 8; i++) s += `<rect x="${x - w / 2 + w * 0.08 + i * w * 0.105}" y="${y - h * 0.18}" width="${w * 0.07}" height="${h * 0.38}" rx="2" fill="#cbd5e1"/>`;
  return s;
}

// Paquet réseau avec ses champs
export function packet(x, y, w, fields, { accent = "#0f172a", danger = false, title = "Paquet" } = {}) {
  const rh = 30, h = 44 + fields.length * rh;
  const c = danger ? "#dc2626" : accent;
  let s = panel(x, y, w, h, { stroke: danger ? "#fecaca" : "#e2e8f0", r: 14 });
  s += `<rect x="${x}" y="${y}" width="${w}" height="36" rx="14" fill="${c}"/><rect x="${x}" y="${y + 22}" width="${w}" height="14" fill="${c}"/>`;
  s += label(x + 16, y + 24, title, { size: 15, color: "#ffffff", anchor: "start", weight: 700 });
  fields.forEach(([k, v, hi], i) => {
    const yy = y + 44 + i * rh + 18;
    s += label(x + 16, yy, k, { size: 14, color: "#64748b", anchor: "start", weight: 500 });
    s += label(x + w - 16, yy, v, { size: 14, color: hi ? "#dc2626" : "#0f172a", anchor: "end", weight: 700, mono: true });
  });
  return s;
}

export function svg(W, H, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${FONT}">${body}</svg>`;
}

// ---------- Compléments
export function person(x, y, s, color = "#64748b", bg = "#e2e8f0") {
  return `<circle cx="${x}" cy="${y}" r="${s / 2}" fill="${bg}"/>` +
    `<circle cx="${x}" cy="${y - s * 0.12}" r="${s * 0.17}" fill="${color}"/>` +
    `<path d="M ${x - s * 0.3} ${y + s * 0.34} q ${s * 0.3} ${-s * 0.38} ${s * 0.6} 0" fill="${color}"/>`;
}
export function doc(x, y, s, name, { color = "#334155", accent = "#2563eb", danger = false } = {}) {
  const w = s * 0.78, h = s, c = danger ? "#dc2626" : accent;
  let o = `<path d="M ${x - w / 2} ${y - h / 2} h ${w * 0.68} l ${w * 0.32} ${w * 0.32} v ${h - w * 0.32} h ${-w} z" fill="#ffffff" stroke="${danger ? c : color}" stroke-width="2.5" stroke-linejoin="round"/>`;
  o += `<path d="M ${x + w * 0.18} ${y - h / 2} v ${w * 0.32} h ${w * 0.32}" fill="none" stroke="${danger ? c : color}" stroke-width="2.5" stroke-linejoin="round"/>`;
  for (let i = 0; i < 3; i++) o += `<rect x="${x - w * 0.32}" y="${y - h * 0.08 + i * h * 0.15}" width="${w * (i === 2 ? 0.4 : 0.64)}" height="${h * 0.05}" rx="2" fill="${c}" opacity="0.5"/>`;
  if (name) o += label(x, y + h / 2 + 20, name, { size: 12, color: danger ? c : color, weight: 600, mono: true });
  return o;
}
export function nas(x, y, s, color = "#334155", led = "#22c55e") {
  let o = `<rect x="${x - s * 0.35}" y="${y - s * 0.45}" width="${s * 0.7}" height="${s * 0.9}" rx="${s * 0.08}" fill="#f8fafc" stroke="${color}" stroke-width="2.5"/>`;
  for (let i = 0; i < 4; i++) o += `<rect x="${x - s * 0.25}" y="${y - s * 0.35 + i * s * 0.18}" width="${s * 0.5}" height="${s * 0.12}" rx="3" fill="#e2e8f0" stroke="${color}" stroke-width="1.5"/><circle cx="${x + s * 0.17}" cy="${y - s * 0.29 + i * s * 0.18}" r="${s * 0.025}" fill="${led}"/>`;
  return o;
}
export function phone(x, y, s, color = "#334155", screen = "#e0f2fe") {
  return `<rect x="${x - s * 0.26}" y="${y - s * 0.5}" width="${s * 0.52}" height="${s}" rx="${s * 0.08}" fill="#ffffff" stroke="${color}" stroke-width="2.5"/>` +
    `<rect x="${x - s * 0.21}" y="${y - s * 0.42}" width="${s * 0.42}" height="${s * 0.78}" rx="${s * 0.03}" fill="${screen}"/>`;
}
export function ring(x, y, r, color, { dash = "", w = 3, op = 1 } = {}) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${color}" stroke-width="${w}" ${dash ? `stroke-dasharray="${dash}"` : ""} opacity="${op}"/>`;
}

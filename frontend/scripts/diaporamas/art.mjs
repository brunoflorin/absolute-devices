// Moteur d'illustrations modernes : compositions d'emoji Fluent (Microsoft, licence MIT)
// sur fonds dégradés doux, formes organiques et tracés. Aucune lettre dans les images.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { getIconData, iconToSVG } = require("@iconify/utils");
const SET = require("@iconify-json/fluent-emoji/icons.json");

let uid = 0;
const id = (p) => `${p}${uid++}`;

// Emoji positionné : centre (x,y), taille s, rotation r, opacité o
export function E(name, x, y, s, { r = 0, o = 1, shadow = true, flip = false } = {}) {
  const data = getIconData(SET, name);
  if (!data) throw new Error("Emoji inconnu : " + name);
  const svg = iconToSVG(data);
  const vb = svg.attributes.viewBox;
  let out = "";
  if (shadow) out += `<ellipse cx="${x}" cy="${y + s * 0.47}" rx="${s * 0.33}" ry="${s * 0.06}" fill="#0f172a" opacity="${0.12 * o}"/>`;
  const tf = `translate(${x} ${y}) rotate(${r})${flip ? " scale(-1 1)" : ""} translate(${-s / 2} ${-s / 2})`;
  out += `<g transform="${tf}" opacity="${o}"><svg width="${s}" height="${s}" viewBox="${vb}">${svg.body}</svg></g>`;
  return out;
}

// Pastille ronde avec emoji (badge)
export function badge(name, x, y, r, fill, { ring = "#ffffff", o = 1 } = {}) {
  return `<g opacity="${o}"><circle cx="${x}" cy="${y + r * 0.12}" r="${r}" fill="#0f172a" opacity="0.10"/>` +
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${ring}" stroke-width="${r * 0.12}"/>` +
    E(name, x, y, r * 1.05, { shadow: false }) + `</g>`;
}

// Forme organique douce
export function blob(cx, cy, rx, ry, c1, c2, op = 1, seed = 0) {
  const g = id("bg");
  const pts = [];
  const n = 8;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + 0.09 * Math.sin(i * 2.3 + seed) + 0.06 * Math.cos(i * 1.7 + seed * 2);
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`;
  }
  return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><path d="${d} Z" fill="url(#${g})" opacity="${op}"/>`;
}

// Tracé courbe (flux), avec flèche optionnelle
export function flow(d, color, { w = 6, dash = "", arrow = true, op = 1 } = {}) {
  const m = id("m");
  return `<defs><marker id="${m}" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill="${color}"/></marker></defs>` +
    `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" ${dash ? `stroke-dasharray="${dash}"` : ""} opacity="${op}" ${arrow ? `marker-end="url(#${m})"` : ""}/>`;
}

// Tube / tunnel épais à dégradé
export function tube(d, c1, c2, w = 46) {
  const g = id("tg");
  return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>` +
    `<path d="${d}" fill="none" stroke="#0f172a" stroke-opacity="0.08" stroke-width="${w + 14}" stroke-linecap="round" transform="translate(0 6)"/>` +
    `<path d="${d}" fill="none" stroke="url(#${g})" stroke-width="${w}" stroke-linecap="round"/>` +
    `<path d="${d}" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="${w * 0.22}" stroke-linecap="round" transform="translate(0 ${-w * 0.2})"/>`;
}

// Halo lumineux
export function glow(x, y, r, color, op = 0.5) {
  const g = id("gl");
  return `<defs><radialGradient id="${g}"><stop offset="0" stop-color="${color}" stop-opacity="${op}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${g})"/>`;
}

// Carte arrondie (fond blanc, ombre douce)
export function card(x, y, w, h, { fill = "#ffffff", r = 28, stroke = "none" } = {}) {
  return `<rect x="${x}" y="${y + 10}" width="${w}" height="${h}" rx="${r}" fill="#0f172a" opacity="0.07"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;
}

// Boîtier pare-feu stylisé (sans texte)
export function appliance(x, y, w, { body1 = "#334155", body2 = "#0f172a", led = "#22c55e", led2 = "#22c55e" } = {}) {
  const h = w * 0.3, g = id("ap");
  let s = `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${body1}"/><stop offset="1" stop-color="${body2}"/></linearGradient></defs>`;
  s += `<rect x="${x}" y="${y + h * 0.15}" width="${w}" height="${h}" rx="${h * 0.18}" fill="#0f172a" opacity="0.15"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h * 0.18}" fill="url(#${g})"/>`;
  s += `<rect x="${x + 6}" y="${y + 4}" width="${w - 12}" height="${h * 0.18}" rx="${h * 0.09}" fill="#ffffff" opacity="0.12"/>`;
  for (let i = 0; i < 6; i++) s += `<rect x="${x + w * 0.08 + i * w * 0.085}" y="${y + h * 0.5}" width="${w * 0.06}" height="${h * 0.26}" rx="3" fill="#020617"/>`;
  s += `<circle cx="${x + w * 0.8}" cy="${y + h * 0.42}" r="${h * 0.08}" fill="${led}"/><circle cx="${x + w * 0.88}" cy="${y + h * 0.42}" r="${h * 0.08}" fill="${led2}"/>`;
  s += glow(x + w * 0.8, y + h * 0.42, h * 0.3, led, 0.6);
  return s;
}

export function svg(W, H, body, bg = null) {
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  if (bg) s += bg;
  return s + body + "</svg>";
}

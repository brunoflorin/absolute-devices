// Diaporamas v5 : schémas techniques en calques animés, pictos sobres, un design par sujet.
// Usage : node scripts/build-diaporamas-v4.mjs [clé...]
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import PptxGenJS from "pptxgenjs";
import { tile, svg } from "./diaporamas/tech.mjs";
import { blob } from "./diaporamas/art.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const JSZip = require("jszip");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public/diaporamas");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "diapo5-"));
const logo = path.join(root, "src/assets/logo.jpg");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
let n = 0;
async function png(s) {
  const f = path.join(tmp, `i${n++}.png`);
  await page.setContent(`<html><body style="margin:0;background:transparent">${s}</body></html>`);
  await page.locator("svg").first().screenshot({ path: f, omitBackground: true });
  return f;
}
const cache = new Map();
async function ico(name, color, solid = false) {
  const k = `${name}|${color}|${solid}`;
  if (!cache.has(k)) cache.set(k, await png(svg(120, 124, tile(name, 60, 58, 104, color, { solid }))));
  return cache.get(k);
}

// Photo recadrée au format voulu (photos libres de droits Pexels, dans scripts/diaporamas/photos)
const photoCache = new Map();
function photo(name, ar, dark = 0) {
  const k = `${name}|${ar}|${dark}`;
  if (photoCache.has(k)) return photoCache.get(k);
  const src = path.join(root, "scripts/diaporamas/photos", name), dst = path.join(tmp, `ph${photoCache.size}.jpg`);
  execFileSync("python3", ["-c", `
from PIL import Image, ImageEnhance
im = Image.open(${JSON.stringify(src)}).convert("RGB"); w, h = im.size; ar = ${ar}
if w / h > ar: nw = int(h * ar); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
else: nh = int(w / ar); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
if ${dark} > 0: im = ImageEnhance.Brightness(im).enhance(1 - ${dark})
im.save(${JSON.stringify(dst)}, quality=88)`]);
  photoCache.set(k, dst);
  return dst;
}

const W = 13.333, H = 7.5, F = "Segoe UI", FB = "Segoe UI Semibold";
const C = (h) => h.replace("#", "").toUpperCase();

// ---------- Animations (post-traitement du .pptx)
function timingXml(steps) {
  let id = 3, pars = "";
  for (const ids of steps) {
    let inner = "";
    ids.forEach((sp, i) => {
      inner += `<p:par><p:cTn id="${id++}" presetID="10" presetClass="entr" presetSubtype="0" fill="hold" nodeType="${i === 0 ? "clickEffect" : "withEffect"}"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>` +
        `<p:set><p:cBhvr><p:cTn id="${id++}" dur="1" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn><p:tgtEl><p:spTgt spid="${sp}"/></p:tgtEl><p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr><p:to><p:strVal val="visible"/></p:to></p:set>` +
        `<p:animEffect transition="in" filter="fade"><p:cBhvr><p:cTn id="${id++}" dur="500"/><p:tgtEl><p:spTgt spid="${sp}"/></p:tgtEl></p:cBhvr></p:animEffect></p:childTnLst></p:cTn></p:par>`;
    });
    pars += `<p:par><p:cTn id="${id++}" fill="hold"><p:stCondLst><p:cond delay="indefinite"/></p:stCondLst><p:childTnLst><p:par><p:cTn id="${id++}" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>${inner}</p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par>`;
  }
  return `<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst><p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>${pars}</p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst><p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq></p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>`;
}
async function animate(file) {
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  for (const name of Object.keys(zip.files).filter((f) => /^ppt\/slides\/slide\d+\.xml$/.test(f))) {
    let xml = await zip.file(name).async("string");
    const steps = new Map();
    for (const m of xml.matchAll(/<p:cNvPr id="(\d+)" name="anim-(\d+)-[^"]*"/g)) {
      const s = +m[2];
      if (!steps.has(s)) steps.set(s, []);
      steps.get(s).push(m[1]);
    }
    const trans = `<p:transition spd="med"><p:fade/></p:transition>`;
    const timing = steps.size ? timingXml([...steps.keys()].sort((a, b) => a - b).map((k) => steps.get(k))) : "";
    xml = xml.replace(/<p:transition[\s\S]*?<\/p:transition>/, "").replace(/<p:timing>[\s\S]*?<\/p:timing>/, "");
    xml = xml.includes("<p:extLst>") && xml.lastIndexOf("<p:extLst>") > xml.indexOf("</p:cSld>")
      ? xml.replace(/(<p:extLst>(?![\s\S]*<p:extLst>))/, trans + timing + "$1")
      : xml.replace("</p:sld>", trans + timing + "</p:sld>");
    zip.file(name, xml);
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}

// ---------- Construction
const want = process.argv.slice(2);
const files = fs.readdirSync(path.join(root, "scripts/diaporamas/decks")).filter((f) => f.endsWith(".mjs"));
const manifestPath = path.join(root, "src/data/diaporamas.json");
const manifeste = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : [];

for (const file of files) {
  const deck = (await import(pathToFileURL(path.join(root, "scripts/diaporamas/decks", file)))).default;
  if (want.length && !want.includes(deck.key)) continue;
  const th = deck.theme, P = C(th.primary), D = C(th.dark), T = C(th.tint);
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Absolute Micro";
  pptx.company = "Absolute Micro";
  pptx.title = deck.titre;

  const fond = await png(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="#ffffff"/>${blob(1590, 30, 260, 170, th.tint, th.soft, 0.5, 3)}</svg>`);

  const total = deck.slides.length - 1;
  let num = 0, step = 0, seq = 0;
  const A = (k) => ({ objectName: `anim-${k}-${seq++}` });
  const base = (titre) => {
    const sl = pptx.addSlide();
    sl.background = { path: fond };
    step = 0;
    sl.addText(deck.titre.toUpperCase(), { x: 0.7, y: 0.42, w: 8, h: 0.3, fontSize: 11, bold: true, color: P, charSpacing: 3, fontFace: F });
    if (titre) sl.addText(titre, { x: 0.7, y: 0.72, w: W - 1.4, h: 0.85, fontSize: 30, color: D, fontFace: FB, valign: "top", fit: "shrink" });
    num++;
    sl.addText(`${num} / ${total}`, { x: W - 1.5, y: 7.0, w: 0.9, h: 0.3, fontSize: 10, color: "94A3B8", align: "right", fontFace: F });
    sl.addText("Absolute Micro", { x: 0.7, y: 7.0, w: 3, h: 0.3, fontSize: 10, color: "94A3B8", fontFace: F });
    return sl;
  };
  // Place une scène (calques empilés : le 1er visible, les suivants apparaissent au clic)
  const scene = async (sl, sc, x, y, maxW, maxH, { anim = true } = {}) => {
    // recadrage automatique sur le contenu réel de tous les calques
    await page.setContent(`<html><body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" width="${sc.W}" height="${sc.H}" viewBox="0 0 ${sc.W} ${sc.H}"><g id="all">${sc.layers.map((l) => l.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")).join("")}</g></svg></body></html>`);
    const bb = await page.evaluate(() => { const b = document.getElementById("all").getBBox(); return [b.x, b.y, b.width, b.height]; });
    const pad = 16, vb = [bb[0] - pad, bb[1] - pad, bb[2] + 2 * pad, bb[3] + 2 * pad];
    sc = { ...sc, W: vb[2], H: vb[3], layers: sc.layers.map((l) => l.replace(/^<svg([^>]*?)width="[^"]*" height="[^"]*" viewBox="[^"]*"/, `<svg$1width="${vb[2]}" height="${vb[3]}" viewBox="${vb.join(" ")}"`)) };
    const r = sc.H / sc.W;
    let w = maxW, h = w * r;
    if (h > maxH) { h = maxH; w = h / r; }
    const xx = x + (maxW - w) / 2;
    for (const [k, layer] of sc.layers.entries()) {
      const opt = { path: await png(layer), x: xx, y, w, h };
      if (anim && k > 0) Object.assign(opt, A(++step));
      sl.addImage(opt);
    }
    return { w, h, x: xx };
  };
  const pill = (sl, x, y, w, txt, fill, color, extra = {}) => {
    sl.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.36, rectRadius: 0.18, fill: { color: fill }, line: { color: fill }, ...extra });
    sl.addText(txt, { x, y, w, h: 0.36, fontSize: 11.5, bold: true, color, align: "center", valign: "middle", fontFace: F, ...(extra.objectName ? { objectName: extra.objectName + "t" } : {}) });
  };
  const band = async (sl, s, y = 6.12) => {
    const parts = [s.tech && "tech", s.vanne && "vanne"].filter(Boolean);
    if (!parts.length) return;
    const k0 = ++step;
    const gap = 0.25, w = (W - 1.4 - gap * (parts.length - 1)) / parts.length;
    for (const [k, kind] of parts.entries()) {
      const x = 0.7 + k * (w + gap);
      if (kind === "tech") {
        const [terme, def] = s.tech;
        sl.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.72, rectRadius: 0.12, fill: { color: "F1F5F9" }, line: { color: "E2E8F0", width: 1 }, ...A(k0) });
        sl.addImage({ path: await ico("GraduationCap", "#0B1530"), x: x + 0.14, y: y + 0.13, w: 0.46, h: 0.47, ...A(k0) });
        sl.addText([{ text: terme + " : ", options: { bold: true, color: P } }, { text: def, options: { color: "334155" } }],
          { x: x + 0.72, y, w: w - 0.85, h: 0.72, fontSize: 12.5, valign: "middle", fontFace: F, fit: "shrink", ...A(k0) });
      } else {
        sl.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.72, rectRadius: 0.12, fill: { color: T }, line: { color: T }, ...A(k0) });
        sl.addImage({ path: await ico("MessageCircle", th.primary), x: x + 0.14, y: y + 0.13, w: 0.46, h: 0.47, ...A(k0) });
        sl.addText(s.vanne, { x: x + 0.72, y, w: w - 0.85, h: 0.72, fontSize: 13, italic: true, color: D, valign: "middle", fontFace: F, fit: "shrink", ...A(k0) });
      }
    }
  };
  const card = (sl, x, y, w, h, fill = "FFFFFF", line = "E2E8F0", extra = {}) =>
    sl.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.2, fill: { color: fill }, line: { color: line, width: 1 }, shadow: { type: "outer", blur: 8, offset: 2, angle: 90, color: "0F172A", opacity: 0.08 }, ...extra });

  for (const s of deck.slides) {
    if (s.t === "cover") {
      const sl = pptx.addSlide();
      sl.background = { color: D };
      if (s.photo) {
        sl.addImage({ path: photo(s.photo, W / H, 0.25), x: 0, y: 0, w: W, h: H });
        sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 7.2, h: H, fill: { color: D, transparency: 12 }, line: { color: D, transparency: 100 } });
      }
      sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.2, h: H, fill: { color: P } });
      sl.addImage({ path: logo, x: 0.8, y: 0.7, w: 0.85, h: 0.85 });
      sl.addText(deck.titre, { x: 0.8, y: 2.2, w: 5.6, h: 2.0, fontSize: 48, color: "FFFFFF", fontFace: FB, valign: "bottom", fit: "shrink" });
      sl.addShape(pptx.ShapeType.rect, { x: 0.8, y: 4.4, w: 1.2, h: 0.08, fill: { color: P } });
      sl.addText(deck.sousTitre, { x: 0.8, y: 4.65, w: 5.4, h: 1.2, fontSize: 21, color: "CBD5E1", fontFace: F, valign: "top" });
      sl.addText("Comprendre l'essentiel, sans jargon inutile", { x: 0.8, y: 6.6, w: 6, h: 0.4, fontSize: 13, color: "94A3B8", fontFace: F });
      if (!s.photo) await scene(sl, s.scene(), 6.3, 0.6, 6.7, 6.3, { anim: false });
      continue;
    }
    if (s.t === "story") {
      const sl = base(s.titre);
      sl.addText(s.texte, { x: 0.7, y: 1.6, w: 5.4, h: 1.05, fontSize: 16, color: "334155", fontFace: F, valign: "top" });
      for (const [k, [ic, t]] of s.points.entries()) {
        const y = 2.8 + k * 1.02, st = ++step;
        card(sl, 0.7, y, 5.4, 0.88, "FFFFFF", "E2E8F0", A(st));
        sl.addImage({ path: await ico(ic, th.primary), x: 0.88, y: y + 0.18, w: 0.52, h: 0.54, ...A(st) });
        sl.addText(t, { x: 1.6, y, w: 4.35, h: 0.88, fontSize: 14, color: "1E293B", valign: "middle", fontFace: F, ...A(st) });
      }
      await scene(sl, s.scene(), 6.3, 1.65, 6.6, 4.3);
      await band(sl, s);
      continue;
    }
    if (s.t === "explainer") {
      const sl = base(s.titre);
      sl.addText(s.texte, { x: 0.7, y: 1.6, w: W - 1.4, h: 0.75, fontSize: 17, color: "334155", fontFace: F, valign: "top" });
      const has = s.tech || s.vanne || s.analogie;
      await scene(sl, s.scene(), 0.7, 2.4, W - 1.4, (has ? 6.0 : 6.8) - 2.4);
      await band(sl, s);
      continue;
    }
    if (s.t === "cards") {
      const sl = base(s.titre);
      const cw = 3.75, gap = 0.37;
      for (const [k, [ic, t, d, ph]] of s.items.entries()) {
        const x = 0.7 + k * (cw + gap), y = 1.75, st = ++step;
        card(sl, x, y, cw, 4.2, "FFFFFF", "E2E8F0", A(st));
        if (ph) {
          sl.addImage({ path: photo(ph, (cw - 0.3) / 1.65), x: x + 0.15, y: y + 0.15, w: cw - 0.3, h: 1.65, ...A(st) });
          sl.addImage({ path: await ico(ic, th.primary, true), x: x + 0.35, y: y + 1.45, w: 0.68, h: 0.7, ...A(st) });
          sl.addText(t, { x: x + 0.35, y: y + 2.2, w: cw - 0.7, h: 0.5, fontSize: 19, color: D, fontFace: FB, ...A(st) });
          sl.addText(d, { x: x + 0.35, y: y + 2.7, w: cw - 0.7, h: 1.35, fontSize: 13.5, color: "475569", valign: "top", fontFace: F, ...A(st) });
        } else {
          sl.addImage({ path: await ico(ic, th.primary), x: x + 0.35, y: y + 0.35, w: 0.95, h: 0.98, ...A(st) });
          sl.addText(t, { x: x + 0.35, y: y + 1.5, w: cw - 0.7, h: 0.55, fontSize: 20, color: D, fontFace: FB, ...A(st) });
          sl.addText(d, { x: x + 0.35, y: y + 2.1, w: cw - 0.7, h: 1.7, fontSize: 14, color: "475569", valign: "top", fontFace: F, ...A(st) });
        }
      }
      await band(sl, s);
      continue;
    }
    if (s.t === "levels") {
      const sl = base(s.titre);
      const cw = 5.8;
      for (const [k, nv] of s.niveaux.entries()) {
        const x = 0.7 + k * (cw + 0.53), y = 1.75, prem = k === 1, st = ++step;
        card(sl, x, y, cw, 4.75, prem ? D : "FFFFFF", prem ? D : "E2E8F0", A(st));
        sl.addImage({ path: await ico(nv.icone, prem ? "#FFFFFF" : th.primary, false), x: x + 0.35, y: y + 0.32, w: 0.85, h: 0.88, ...A(st) });
        sl.addText(nv.nom, { x: x + 1.4, y: y + 0.3, w: cw - 1.6, h: 0.5, fontSize: 22, color: prem ? "FFFFFF" : D, fontFace: FB, ...A(st) });
        sl.addText(nv.sous, { x: x + 1.4, y: y + 0.8, w: cw - 1.6, h: 0.4, fontSize: 13, color: prem ? "CBD5E1" : "64748B", fontFace: F, ...A(st) });
        let yy = y + 1.45;
        if (nv.plus) {
          sl.addText(nv.plus, { x: x + 0.4, y: yy, w: cw - 0.8, h: 0.4, fontSize: 13, bold: true, color: C(th.soft), fontFace: F, ...A(st) });
          yy += 0.45;
        }
        for (const it of nv.items) {
          sl.addImage({ path: await ico(prem ? "Plus" : "Check", prem ? "#FFFFFF" : "#16a34a", !prem), x: x + 0.4, y: yy + 0.07, w: 0.28, h: 0.29, ...A(st) });
          sl.addText(it, { x: x + 0.85, y: yy, w: cw - 1.1, h: 0.42, fontSize: 13.5, color: prem ? "FFFFFF" : "1E293B", valign: "middle", fontFace: F, ...A(st) });
          yy += 0.47;
        }
      }
      sl.addText(s.note, { x: 0.7, y: 6.6, w: W - 1.4, h: 0.35, fontSize: 13, italic: true, color: "64748B", fontFace: F });
      continue;
    }
    if (s.t === "kit") {
      const sl = base(s.titre);
      const cw = 2.85, gap = 0.2;
      for (const [k, [cat, ic, t, d, ph]] of s.items.entries()) {
        const x = 0.7 + k * (cw + gap), y = 1.85, last = k === s.items.length - 1, st = ++step;
        card(sl, x, y, cw, 4.6, last ? P : "FFFFFF", last ? P : "E2E8F0", A(st));
        if (ph) sl.addImage({ path: photo(ph, (cw - 0.3) / 1.55), x: x + 0.15, y: y + 0.15, w: cw - 0.3, h: 1.55, ...A(st) });
        pill(sl, x + 0.3, y + (ph ? 1.5 : 0.3), cw - 0.6, cat, last ? "FFFFFF" : T, P, A(st));
        if (!ph) sl.addImage({ path: await ico(ic, last ? "#FFFFFF" : th.primary), x: x + cw / 2 - 0.6, y: y + 1.0, w: 1.2, h: 1.24, ...A(st) });
        sl.addText(t, { x: x + 0.2, y: y + 2.5, w: cw - 0.4, h: 0.85, fontSize: 17, color: last ? "FFFFFF" : D, align: "center", valign: "top", fontFace: FB, ...A(st) });
        sl.addText(d, { x: x + 0.25, y: y + 3.35, w: cw - 0.5, h: 1.1, fontSize: 13, color: last ? "FFE4E6" : "475569", align: "center", valign: "top", fontFace: F, ...A(st) });
      }
      continue;
    }
    if (s.t === "duel") {
      const sl = base(s.titre);
      const cols = [[s.sans, "FEF2F2", "B91C1C", "ShieldOff", "#B91C1C", "Sans", "X"], [s.avec, "F0FDF4", "15803D", "ShieldCheck", "#15803D", "Avec", "Check"]];
      for (const [k, [items, bg, c, big, hex, lab, mark]] of cols.entries()) {
        const x = 0.7 + k * 6.17, w = 5.95, y = 1.75, st = ++step;
        sl.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 4.95, rectRadius: 0.2, fill: { color: bg }, line: { color: bg }, ...A(st) });
        sl.addImage({ path: await ico(big, hex, true), x: x + 0.45, y: y + 0.4, w: 1.0, h: 1.03, ...A(st) });
        sl.addText(lab, { x: x + 1.7, y: y + 0.55, w: 3, h: 0.7, fontSize: 28, color: c, fontFace: FB, ...A(st) });
        for (const [j, t] of items.entries()) {
          const yy = y + 1.9 + j * 0.95;
          sl.addImage({ path: await ico(mark, hex), x: x + 0.45, y: yy + 0.07, w: 0.44, h: 0.45, ...A(st) });
          sl.addText(t, { x: x + 1.1, y: yy, w: w - 1.4, h: 0.6, fontSize: 16, color: "1E293B", valign: "middle", fontFace: F, ...A(st) });
        }
      }
      continue;
    }
    if (s.t === "closing") {
      const sl = pptx.addSlide();
      sl.background = { color: D };
      if (s.photo) sl.addImage({ path: photo(s.photo, W / H, 0.72), x: 0, y: 0, w: W, h: H });
      num++; step = 0;
      sl.addText(s.titre, { x: 0.8, y: 0.8, w: W - 1.6, h: 0.9, fontSize: 34, color: "FFFFFF", fontFace: FB });
      const cw = 3.7, gap = 0.36;
      for (const [k, [ic, t]] of s.items.entries()) {
        const x = 0.8 + k * (cw + gap), st = ++step;
        sl.addShape(pptx.ShapeType.roundRect, { x, y: 2.0, w: cw, h: 2.9, rectRadius: 0.2, fill: { color: "FFFFFF", transparency: 92 }, line: { color: "FFFFFF", transparency: 75, width: 1 }, ...A(st) });
        sl.addImage({ path: await ico(ic, th.primary, true), x: x + cw / 2 - 0.55, y: 2.35, w: 1.1, h: 1.14, ...A(st) });
        sl.addText(t, { x: x + 0.25, y: 3.75, w: cw - 0.5, h: 0.9, fontSize: 18, color: "FFFFFF", align: "center", valign: "top", fontFace: FB, ...A(st) });
      }
      sl.addImage({ path: logo, x: 0.8, y: 5.6, w: 0.95, h: 0.95 });
      sl.addText([{ text: "01 34 87 74 43", options: { fontSize: 22, bold: true, color: "FFFFFF", breakLine: true } }, { text: "contact@absolutemicro.fr", options: { fontSize: 16, color: "CBD5E1" } }],
        { x: 2.0, y: 5.55, w: 6, h: 1.0, fontFace: F, valign: "middle" });
      continue;
    }
    throw new Error("Modèle inconnu : " + s.t);
  }

  const pptxFile = path.join(out, `${deck.key}.pptx`);
  await pptx.writeFile({ fileName: pptxFile });
  await animate(pptxFile);
  execFileSync("soffice", ["--headless", "--convert-to", "pdf", "--outdir", tmp, pptxFile], { stdio: "ignore" });
  const dir = path.join(out, deck.key);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  execFileSync("pdftoppm", ["-png", "-scale-to-x", "1600", "-scale-to-y", "-1", path.join(tmp, `${deck.key}.pdf`), path.join(dir, "p")]);
  const pages = fs.readdirSync(dir).filter((f) => f.endsWith(".png")).sort((a, b) => parseInt(a.slice(2)) - parseInt(b.slice(2)));
  const entry = { key: deck.key, titre: deck.titre, sousTitre: deck.sousTitre, couleur: th.primary, topics: deck.topics, pages };
  const i = manifeste.findIndex((m) => m.key === deck.key);
  if (i >= 0) manifeste[i] = entry; else manifeste.push(entry);
  console.log("OK", deck.key, pages.length, "pages");
}

await browser.close();
fs.writeFileSync(manifestPath, JSON.stringify(manifeste, null, 2) + "\n");
fs.rmSync(tmp, { recursive: true, force: true });

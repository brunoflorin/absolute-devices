// Diaporamas v4 : un design par sujet, illustrations modernes (emoji Fluent, MIT), aucun texte dans les images.
// Usage : node scripts/build-diaporamas-v4.mjs [clé...]
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import PptxGenJS from "pptxgenjs";
import { E, blob, svg } from "./diaporamas/art.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public/diaporamas");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "diapo4-"));
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
const emo = new Map();
async function emoji(name) {
  if (!emo.has(name)) emo.set(name, await png(svg(256, 256, E(name, 128, 128, 230, { shadow: false }))));
  return emo.get(name);
}

const W = 13.333, H = 7.5, F = "Segoe UI", FB = "Segoe UI Semibold";
const C = (h) => h.replace("#", "").toUpperCase();

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

  // Fond doux propre au sujet (formes organiques dans les coins)
  const fond = await png(svg(1600, 900,
    `<rect width="1600" height="900" fill="#ffffff"/>` +
    blob(1560, 60, 300, 220, th.tint, th.soft, 0.55, 3) + blob(40, 880, 260, 170, th.tint, "#ffffff", 0.8, 7)));

  const total = deck.slides.length - 1;
  let num = 0;
  const base = (titre) => {
    const sl = pptx.addSlide();
    sl.background = { path: fond };
    sl.addText(deck.titre.toUpperCase(), { x: 0.7, y: 0.42, w: 8, h: 0.3, fontSize: 11, bold: true, color: P, charSpacing: 3, fontFace: F });
    if (titre) sl.addText(titre, { x: 0.7, y: 0.72, w: W - 1.4, h: 0.85, fontSize: 30, color: D, fontFace: FB, valign: "top", fit: "shrink" });
    num++;
    sl.addText(`${num} / ${total}`, { x: W - 1.5, y: 7.0, w: 0.9, h: 0.3, fontSize: 10, color: "94A3B8", align: "right", fontFace: F });
    sl.addText("Absolute Micro", { x: 0.7, y: 7.0, w: 3, h: 0.3, fontSize: 10, color: "94A3B8", fontFace: F });
    return sl;
  };
  const pill = (sl, x, y, w, txt, fill = P, color = "FFFFFF") => {
    sl.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.38, rectRadius: 0.19, fill: { color: fill }, line: { color: fill } });
    sl.addText(txt, { x, y, w, h: 0.38, fontSize: 12, bold: true, color, align: "center", valign: "middle", fontFace: F });
  };

  for (const s of deck.slides) {
    if (s.t === "cover") {
      const sl = pptx.addSlide();
      sl.background = { color: D };
      sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.22, h: H, fill: { color: P } });
      sl.addImage({ path: logo, x: 0.8, y: 0.7, w: 0.85, h: 0.85, rounding: false });
      sl.addText(deck.titre, { x: 0.8, y: 2.2, w: 5.6, h: 2.0, fontSize: 48, color: "FFFFFF", fontFace: FB, valign: "bottom", fit: "shrink" });
      sl.addShape(pptx.ShapeType.rect, { x: 0.8, y: 4.4, w: 1.2, h: 0.08, fill: { color: P } });
      sl.addText(deck.sousTitre, { x: 0.8, y: 4.65, w: 5.4, h: 1.2, fontSize: 21, color: "CBD5E1", fontFace: F, valign: "top" });
      sl.addText("L'essentiel à savoir, expliqué simplement", { x: 0.8, y: 6.6, w: 6, h: 0.4, fontSize: 13, color: "94A3B8", fontFace: F });
      const iw = 6.6, ih = iw * s.ratio;
      sl.addImage({ path: await png(s.img()), x: 6.4, y: (H - ih) / 2, w: iw, h: ih });
      continue;
    }
    if (s.t === "story") {
      const sl = base(s.titre);
      const img = await png(s.img());
      if (s.side === "bottom") {
        sl.addText(s.texte, { x: 0.7, y: 1.6, w: W - 1.4, h: 0.6, fontSize: 18, color: "334155", fontFace: F });
        const iw = 9.6, ih = iw * s.ratio;
        sl.addImage({ path: img, x: 0.4, y: 2.3, w: iw, h: ih });
        for (const [k, [e, t]] of s.points.entries()) {
          const y = 2.6 + k * 1.3;
          sl.addImage({ path: await emoji(e), x: 10.15, y, w: 0.6, h: 0.6 });
          sl.addText(t, { x: 10.85, y: y - 0.15, w: 2.1, h: 1.0, fontSize: 14, color: "1E293B", valign: "middle", fontFace: F });
        }
      } else {
        sl.addText(s.texte, { x: 0.7, y: 1.65, w: 5.6, h: 1.1, fontSize: 18, color: "334155", fontFace: F, valign: "top" });
        for (const [k, [e, t]] of s.points.entries()) {
          const y = 3.0 + k * 1.15;
          sl.addShape(pptx.ShapeType.roundRect, { x: 0.7, y, w: 5.6, h: 0.95, rectRadius: 0.2, fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 }, shadow: { type: "outer", blur: 6, offset: 2, angle: 90, color: "0F172A", opacity: 0.08 } });
          sl.addImage({ path: await emoji(e), x: 0.9, y: y + 0.17, w: 0.62, h: 0.62 });
          sl.addText(t, { x: 1.7, y, w: 4.45, h: 0.95, fontSize: 15, color: "1E293B", valign: "middle", fontFace: F });
        }
        const iw = 6.4, ih = iw * s.ratio;
        sl.addImage({ path: img, x: 6.6, y: 1.75 + (5.0 - ih) / 2, w: iw, h: ih });
      }
      continue;
    }
    if (s.t === "explainer") {
      const sl = base(s.titre);
      sl.addText(s.texte, { x: 0.7, y: 1.6, w: W - 1.4, h: 0.75, fontSize: 18, color: "334155", fontFace: F, valign: "top" });
      const maxH = (s.analogie ? 6.0 : 6.85) - 2.35 - 0.85;
      const iw = Math.min(11.9, maxH / s.ratio), ih = iw * s.ratio, ix = (W - iw) / 2, iy = 2.35;
      sl.addImage({ path: await png(s.img()), x: ix, y: iy, w: iw, h: ih });
      const ey = iy + ih + 0.05;
      const ew = s.etapes.length === 2 ? 5.4 : 3.6;
      const exs = s.etapes.length === 2 ? [0.7 + 0.2, 0.7 + 6.3] : null;
      for (const [k, [fx, t]] of s.etapes.entries()) {
        const cx = exs ? exs[k] + ew / 2 : ix + iw * fx;
        sl.addShape(pptx.ShapeType.ellipse, { x: cx - ew / 2 - 0.05, y: ey + 0.06, w: 0.38, h: 0.38, fill: { color: P } });
        sl.addText(String(k + 1), { x: cx - ew / 2 - 0.05, y: ey + 0.06, w: 0.38, h: 0.38, fontSize: 13, bold: true, color: "FFFFFF", align: "center", valign: "middle", fontFace: F });
        sl.addText(t, { x: cx - ew / 2 + 0.42, y: ey, w: ew - 0.4, h: 0.75, fontSize: 14, color: "1E293B", valign: "top", fontFace: F });
      }
      if (s.analogie) {
        sl.addShape(pptx.ShapeType.roundRect, { x: 0.7, y: 6.15, w: W - 1.4, h: 0.65, rectRadius: 0.15, fill: { color: T } });
        sl.addImage({ path: await emoji("light-bulb"), x: 0.85, y: 6.24, w: 0.45, h: 0.45 });
        sl.addText(s.analogie, { x: 1.45, y: 6.15, w: W - 2.3, h: 0.65, fontSize: 15, italic: true, color: D, valign: "middle", fontFace: F });
      }
      continue;
    }
    if (s.t === "cards") {
      const sl = base(s.titre);
      const cw = 3.75, gap = 0.37;
      for (const [k, [e, t, d]] of s.items.entries()) {
        const x = 0.7 + k * (cw + gap), y = 2.0;
        sl.addShape(pptx.ShapeType.roundRect, { x, y, w: cw, h: 4.5, rectRadius: 0.25, fill: { color: "FFFFFF" }, line: { color: "E2E8F0", width: 1 }, shadow: { type: "outer", blur: 10, offset: 3, angle: 90, color: "0F172A", opacity: 0.1 } });
        sl.addShape(pptx.ShapeType.ellipse, { x: x + cw / 2 - 0.95, y: y + 0.4, w: 1.9, h: 1.9, fill: { color: T } });
        sl.addImage({ path: await emoji(e), x: x + cw / 2 - 0.65, y: y + 0.7, w: 1.3, h: 1.3 });
        sl.addText(t, { x: x + 0.3, y: y + 2.5, w: cw - 0.6, h: 0.55, fontSize: 20, color: D, align: "center", fontFace: FB });
        sl.addText(d, { x: x + 0.35, y: y + 3.1, w: cw - 0.7, h: 1.2, fontSize: 14, color: "475569", align: "center", valign: "top", fontFace: F });
      }
      continue;
    }
    if (s.t === "levels") {
      const sl = base(s.titre);
      const cw = 5.8;
      for (const [k, nv] of s.niveaux.entries()) {
        const x = 0.7 + k * (cw + 0.53), y = 1.75, prem = k === 1;
        sl.addShape(pptx.ShapeType.roundRect, { x, y, w: cw, h: 4.75, rectRadius: 0.25, fill: { color: prem ? D : "FFFFFF" }, line: { color: prem ? D : "E2E8F0", width: 1 }, shadow: { type: "outer", blur: 10, offset: 3, angle: 90, color: "0F172A", opacity: 0.12 } });
        sl.addImage({ path: await emoji(nv.emoji), x: x + 0.4, y: y + 0.35, w: 0.8, h: 0.8 });
        sl.addText(nv.nom, { x: x + 1.4, y: y + 0.3, w: cw - 1.6, h: 0.5, fontSize: 22, color: prem ? "FFFFFF" : D, fontFace: FB });
        sl.addText(nv.sous, { x: x + 1.4, y: y + 0.8, w: cw - 1.6, h: 0.4, fontSize: 13, color: prem ? "CBD5E1" : "64748B", fontFace: F });
        let yy = y + 1.45;
        if (nv.plus) {
          sl.addText(nv.plus, { x: x + 0.4, y: yy, w: cw - 0.8, h: 0.4, fontSize: 13, bold: true, color: C(th.soft), fontFace: F });
          yy += 0.45;
        }
        for (const it of nv.items) {
          sl.addImage({ path: await emoji(prem ? "sparkles" : "check-mark-button"), x: x + 0.4, y: yy + 0.06, w: 0.3, h: 0.3 });
          sl.addText(it, { x: x + 0.85, y: yy, w: cw - 1.1, h: 0.42, fontSize: 13, color: prem ? "FFFFFF" : "1E293B", valign: "middle", fontFace: F });
          yy += 0.47;
        }
      }
      sl.addText(s.note, { x: 0.7, y: 6.6, w: W - 1.4, h: 0.35, fontSize: 13, italic: true, color: "64748B", fontFace: F });
      continue;
    }
    if (s.t === "kit") {
      const sl = base(s.titre);
      const cw = 2.85, gap = 0.2;
      for (const [k, [cat, e, t, d]] of s.items.entries()) {
        const x = 0.7 + k * (cw + gap), y = 1.9;
        const last = k === s.items.length - 1;
        sl.addShape(pptx.ShapeType.roundRect, { x, y, w: cw, h: 4.7, rectRadius: 0.25, fill: { color: last ? P : "FFFFFF" }, line: { color: last ? P : "E2E8F0", width: 1 }, shadow: { type: "outer", blur: 10, offset: 3, angle: 90, color: "0F172A", opacity: 0.1 } });
        pill(sl, x + 0.35, y + 0.35, cw - 0.7, cat, last ? "FFFFFF" : T, last ? P : P);
        sl.addImage({ path: await emoji(e), x: x + cw / 2 - 0.7, y: y + 1.0, w: 1.4, h: 1.4 });
        sl.addText(t, { x: x + 0.2, y: y + 2.65, w: cw - 0.4, h: 0.85, fontSize: 16, color: last ? "FFFFFF" : D, align: "center", valign: "top", fontFace: FB });
        sl.addText(d, { x: x + 0.3, y: y + 3.5, w: cw - 0.6, h: 1.0, fontSize: 13, color: last ? "FFE4E6" : "475569", align: "center", valign: "top", fontFace: F });
      }
      continue;
    }
    if (s.t === "duel") {
      const sl = base(s.titre);
      const cols = [[s.sans, "FEF2F2", "B91C1C", "cross-mark", s.imgSans, s.rSans, "Sans"], [s.avec, "F0FDF4", "15803D", "check-mark-button", s.imgAvec, s.rAvec, "Avec"]];
      for (const [k, [items, bg, c, e, img, r, lab]] of cols.entries()) {
        const x = 0.7 + k * 6.17, w = 5.95, y = 1.75;
        sl.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 4.95, rectRadius: 0.25, fill: { color: bg }, line: { color: bg } });
        const iw = 2.6, ih = iw * r;
        if (k === 1) sl.addShape(pptx.ShapeType.roundRect, { x: x + w - iw - 0.35, y: y + 0.3, w: iw + 0.1, h: ih + 0.1, rectRadius: 0.2, fill: { color: D } });
        sl.addImage({ path: await png(img()), x: x + w - iw - 0.3, y: y + 0.35, w: iw, h: ih });
        pill(sl, x + 0.4, y + 0.45, 1.3, lab, c);
        for (const [j, t] of items.entries()) {
          const yy = y + 2.35 + j * 0.85;
          sl.addImage({ path: await emoji(e), x: x + 0.4, y: yy + 0.08, w: 0.42, h: 0.42 });
          sl.addText(t, { x: x + 1.0, y: yy, w: w - 1.3, h: 0.6, fontSize: 16, color: "1E293B", valign: "middle", fontFace: F });
        }
      }
      continue;
    }
    if (s.t === "closing") {
      const sl = pptx.addSlide();
      sl.background = { color: D };
      num++;
      sl.addText(s.titre, { x: 0.8, y: 0.8, w: W - 1.6, h: 0.9, fontSize: 34, color: "FFFFFF", fontFace: FB });
      const cw = 3.7, gap = 0.36;
      for (const [k, [e, t]] of s.items.entries()) {
        const x = 0.8 + k * (cw + gap);
        sl.addShape(pptx.ShapeType.roundRect, { x, y: 2.0, w: cw, h: 2.9, rectRadius: 0.25, fill: { color: "FFFFFF", transparency: 92 }, line: { color: "FFFFFF", transparency: 75, width: 1 } });
        sl.addImage({ path: await emoji(e), x: x + cw / 2 - 0.6, y: 2.35, w: 1.2, h: 1.2 });
        sl.addText(t, { x: x + 0.2, y: 3.8, w: cw - 0.4, h: 0.8, fontSize: 19, color: "FFFFFF", align: "center", valign: "top", fontFace: FB });
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

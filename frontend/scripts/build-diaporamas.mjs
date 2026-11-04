// Génère les diaporamas « installation minimum » :
//  - public/diaporamas/<clé>.pptx           (PowerPoint modifiable)
//  - public/diaporamas/<clé>/NN.png         (pages rendues depuis le PowerPoint, pour le site)
//  - src/data/diaporamas.json               (manifeste lu par le site)
// Usage : node scripts/build-diaporamas.mjs   (requiert LibreOffice + pdftoppm + playwright)
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import PptxGenJS from "pptxgenjs";
import { DECKS } from "./diaporamas/contenu.mjs";
import { carteSvg, fluxSvg, iconSvg } from "./diaporamas/schemas.mjs";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public/diaporamas");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "diapo-"));
const logo = path.join(root, "src/assets/logo.jpg");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

// ---------- rendu SVG -> PNG (navigateur)
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = await import("playwright")); }
const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
let n = 0;
async function png(svg) {
  const file = path.join(tmp, `img${n++}.png`);
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
  await page.locator("svg").first().screenshot({ path: file, omitBackground: true });
  return file;
}
const iconCache = new Map();
async function ico(name, color) {
  const k = name + color;
  if (!iconCache.has(k)) iconCache.set(k, await png(iconSvg(name, color, 128, 2)));
  return iconCache.get(k);
}

const W = 13.333, H = 7.5, F = "Segoe UI";
const C = (h) => h.replace("#", "");

function entete(pptx, sl, deck, titre) {
  sl.background = { color: "FFFFFF" };
  sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.18, fill: { color: C(deck.couleur) } });
  sl.addText(titre, { x: 0.6, y: 0.4, w: W - 1.2, h: 0.9, fontSize: 32, bold: true, color: C(deck.couleur), fontFace: F });
}
function pied(sl, deck, i, total) {
  sl.addText(`Absolute Micro — ${deck.titre}`, { x: 0.6, y: 7.02, w: 7, h: 0.3, fontSize: 10, color: "94A3B8", fontFace: F });
  sl.addText(`${i} / ${total}`, { x: W - 1.6, y: 7.02, w: 1, h: 0.3, fontSize: 10, color: "94A3B8", align: "right", fontFace: F });
}

const manifeste = [];

for (const deck of DECKS) {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Absolute Micro";
  pptx.company = "Absolute Micro";
  pptx.title = deck.titre;
  const col = C(deck.couleur);
  const total = 6;

  // 0 — Couverture
  {
    const sl = pptx.addSlide();
    sl.background = { color: "231F20" };
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H * 0.78, fill: { color: col } });
    sl.addShape(pptx.ShapeType.ellipse, { x: W / 2 - 1.05, y: 0.8, w: 2.1, h: 2.1, fill: { color: "FFFFFF", transparency: 82 } });
    sl.addImage({ path: await ico(deck.icone, "#ffffff"), x: W / 2 - 0.65, y: 1.2, w: 1.3, h: 1.3 });
    sl.addText(deck.titre, { x: 0.5, y: 3.15, w: W - 1, h: 1.1, fontSize: 50, bold: true, color: "FFFFFF", align: "center", fontFace: F });
    sl.addText(deck.sousTitre, { x: 0.5, y: 4.25, w: W - 1, h: 0.7, fontSize: 24, color: "FFFFFF", align: "center", fontFace: F });
    sl.addImage({ path: logo, x: 0.6, y: 6.05, w: 1.0, h: 1.0 });
    sl.addText("L'installation minimum, expliquée simplement", { x: 1.8, y: 6.2, w: 9, h: 0.7, fontSize: 18, color: "FFFFFF", fontFace: F });
  }

  // 1 — Le problème
  {
    const sl = pptx.addSlide();
    entete(pptx, sl, deck, deck.probleme.titre);
    sl.addText(deck.probleme.texte, { x: 0.6, y: 1.35, w: W - 1.2, h: 0.9, fontSize: 20, color: "334155", fontFace: F });
    const cw = 3.85, gap = 0.3;
    for (const [k, [ic, txt]] of deck.probleme.risques.entries()) {
      const x = 0.6 + k * (cw + gap);
      sl.addShape(pptx.ShapeType.roundRect, { x, y: 2.65, w: cw, h: 3.9, rectRadius: 0.15, fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 1 } });
      sl.addShape(pptx.ShapeType.ellipse, { x: x + cw / 2 - 0.75, y: 3.0, w: 1.5, h: 1.5, fill: { color: col, transparency: 86 } });
      sl.addImage({ path: await ico(ic, deck.couleur), x: x + cw / 2 - 0.45, y: 3.3, w: 0.9, h: 0.9 });
      sl.addText(txt, { x: x + 0.25, y: 4.75, w: cw - 0.5, h: 1.5, fontSize: 18, color: "1E293B", align: "center", valign: "top", fontFace: F });
    }
    pied(sl, deck, 1, total);
  }

  // 2 — Où il se place (schéma général)
  {
    const sl = pptx.addSlide();
    entete(pptx, sl, deck, "Où se place l'outil dans votre installation ?");
    const img = await png(carteSvg(deck.carte, deck.couleur));
    const iw = 9.3, ih = iw * 650 / 1200;
    sl.addImage({ path: img, x: (W - iw) / 2, y: 1.2, w: iw, h: ih });
    sl.addShape(pptx.ShapeType.roundRect, { x: 0.6, y: 6.4, w: W - 1.2, h: 0.55, rectRadius: 0.1, fill: { color: col, transparency: 88 } });
    sl.addText(deck.carte.legende, { x: 0.8, y: 6.4, w: W - 1.6, h: 0.55, fontSize: 17, bold: true, color: col, valign: "middle", fontFace: F });
    pied(sl, deck, 2, total);
  }

  // 3 — Comment ça marche
  {
    const sl = pptx.addSlide();
    entete(pptx, sl, deck, deck.flux.titre);
    const img = await png(fluxSvg(deck.flux.etapes, deck.couleur));
    sl.addImage({ path: img, x: 0.6, y: 1.6, w: W - 1.2, h: (W - 1.2) * 330 / 1200 });
    sl.addShape(pptx.ShapeType.rect, { x: 0.6, y: 5.45, w: 0.09, h: 1.0, fill: { color: col } });
    sl.addText(deck.flux.texte, { x: 0.75, y: 5.45, w: W - 1.4, h: 1.0, fontSize: 19, italic: true, color: "334155", fill: { color: "F1F5F9" }, valign: "middle", margin: 12, fontFace: F });
    pied(sl, deck, 3, total);
  }

  // 4 — L'installation minimum
  {
    const sl = pptx.addSlide();
    entete(pptx, sl, deck, "L'installation minimum");
    const rows = deck.minimum;
    const rh = Math.min(1.25, 5.2 / rows.length);
    for (const [k, [ic, cat, quoi, detail]] of rows.entries()) {
      const y = 1.5 + k * (rh + 0.12);
      sl.addShape(pptx.ShapeType.roundRect, { x: 0.6, y, w: W - 1.2, h: rh, rectRadius: 0.12, fill: { color: "F8FAFC" }, line: { color: "E2E8F0", width: 1 } });
      sl.addShape(pptx.ShapeType.ellipse, { x: 0.85, y: y + rh / 2 - 0.42, w: 0.84, h: 0.84, fill: { color: col } });
      sl.addImage({ path: await ico(ic, "#ffffff"), x: 1.02, y: y + rh / 2 - 0.25, w: 0.5, h: 0.5 });
      sl.addShape(pptx.ShapeType.roundRect, { x: 2.0, y: y + rh / 2 - 0.2, w: 1.9, h: 0.4, rectRadius: 0.2, fill: { color: col, transparency: 85 } });
      sl.addText(cat, { x: 2.0, y: y + rh / 2 - 0.2, w: 1.9, h: 0.4, fontSize: 13, bold: true, color: col, align: "center", valign: "middle", fontFace: F });
      sl.addText([
        { text: quoi, options: { bold: true, fontSize: 20, color: "1E293B", breakLine: true } },
        { text: detail, options: { fontSize: 15, color: "475569" } },
      ], { x: 4.15, y, w: W - 5, h: rh, valign: "middle", fontFace: F });
    }
    pied(sl, deck, 4, total);
  }

  // 5 — Sans / Avec
  {
    const sl = pptx.addSlide();
    entete(pptx, sl, deck, "Sans l'outil… avec l'outil");
    const cols = [["Sans", deck.sansAvec.sans, "B91C1C", "FEF2F2", "CircleX", "#b91c1c"], ["Avec", deck.sansAvec.avec, "15803D", "F0FDF4", "CircleCheck", "#15803d"]];
    for (const [k, [titre, items, c, bg, ic, hex]] of cols.entries()) {
      const x = 0.6 + k * 6.17, w = 5.95;
      sl.addShape(pptx.ShapeType.roundRect, { x, y: 1.45, w, h: 5.2, rectRadius: 0.15, fill: { color: bg }, line: { color: c, width: 1.5 } });
      sl.addText(titre, { x: x + 0.35, y: 1.65, w: w - 0.7, h: 0.6, fontSize: 26, bold: true, color: c, fontFace: F });
      for (const [j, t] of items.entries()) {
        const y = 2.55 + j * 1.3;
        sl.addImage({ path: await ico(ic, hex), x: x + 0.4, y: y + 0.08, w: 0.5, h: 0.5 });
        sl.addText(t, { x: x + 1.1, y, w: w - 1.4, h: 0.95, fontSize: 19, color: "1E293B", valign: "top", fontFace: F });
      }
    }
    pied(sl, deck, 5, total);
  }

  // 6 — Ce qu'Absolute Micro fait pour vous
  {
    const sl = pptx.addSlide();
    entete(pptx, sl, deck, "Ce qu'Absolute Micro fait pour vous");
    const cw = 3.85, gap = 0.3;
    for (const [k, [ic, t, d]] of deck.nous.entries()) {
      const x = 0.6 + k * (cw + gap);
      sl.addShape(pptx.ShapeType.roundRect, { x, y: 1.6, w: cw, h: 4.1, rectRadius: 0.15, fill: { color: col } });
      sl.addImage({ path: await ico(ic, "#ffffff"), x: x + cw / 2 - 0.55, y: 2.05, w: 1.1, h: 1.1 });
      sl.addText(t, { x: x + 0.2, y: 3.45, w: cw - 0.4, h: 0.7, fontSize: 24, bold: true, color: "FFFFFF", align: "center", fontFace: F });
      sl.addText(d, { x: x + 0.3, y: 4.2, w: cw - 0.6, h: 1.2, fontSize: 17, color: "FFFFFF", align: "center", valign: "top", fontFace: F });
    }
    sl.addText("Un seul interlocuteur : 01 34 87 74 43 — contact@absolutemicro.fr", { x: 0.6, y: 6.1, w: W - 1.2, h: 0.5, fontSize: 18, bold: true, color: "231F20", align: "center", fontFace: F });
    pied(sl, deck, 6, total);
  }

  const pptxFile = path.join(out, `${deck.key}.pptx`);
  await pptx.writeFile({ fileName: pptxFile });

  // Rendu des pages pour le site, à partir du PowerPoint lui-même
  execFileSync("soffice", ["--headless", "--convert-to", "pdf", "--outdir", tmp, pptxFile], { stdio: "ignore" });
  const dir = path.join(out, deck.key);
  fs.mkdirSync(dir, { recursive: true });
  execFileSync("pdftoppm", ["-png", "-scale-to-x", "1600", "-scale-to-y", "-1", path.join(tmp, `${deck.key}.pdf`), path.join(dir, "p")]);
  const pages = fs.readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
  manifeste.push({ key: deck.key, titre: deck.titre, sousTitre: deck.sousTitre, couleur: deck.couleur, topics: deck.topics, pages });
  console.log("OK", deck.key, pages.length, "pages");
}

await browser.close();
fs.writeFileSync(path.join(root, "src/data/diaporamas.json"), JSON.stringify(manifeste, null, 2) + "\n");
fs.rmSync(tmp, { recursive: true, force: true });

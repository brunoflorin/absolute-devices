// Génère public/diaporamas/<clé>.pptx à partir de src/data/diaporamas.js
// Usage : node scripts/build-diaporamas.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PptxGenJS from "pptxgenjs";
import sizeOf from "image-size";
import { DIAPORAMAS } from "../src/data/diaporamas.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
const out = path.join(pub, "diaporamas");
fs.mkdirSync(out, { recursive: true });
const logo = path.join(root, "src/assets/logo.jpg");
const C = (hex) => hex.replace("#", "");
const W = 13.333, H = 7.5;

for (const [key, deck] of Object.entries(DIAPORAMAS)) {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Absolute Micro";
  pptx.company = "Absolute Micro";
  pptx.title = deck.titre;
  const col = C(deck.couleur);

  // Couverture
  const cover = pptx.addSlide();
  cover.background = { color: "231F20" };
  cover.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H * 0.82, fill: { color: col } });
  cover.addImage({ path: logo, x: W / 2 - 0.9, y: 1.1, w: 1.8, h: 1.8, sizing: { type: "contain", w: 1.8, h: 1.8 } });
  cover.addText(deck.titre, { x: 0.5, y: 3.3, w: W - 1, h: 1.2, fontSize: 48, bold: true, color: "FFFFFF", align: "center", fontFace: "Segoe UI" });
  cover.addText(deck.sousTitre, { x: 0.5, y: 4.5, w: W - 1, h: 0.7, fontSize: 24, color: "EEEEEE", align: "center", fontFace: "Segoe UI" });

  deck.slides.forEach((s, i) => {
    const sl = pptx.addSlide();
    sl.background = { color: "FFFFFF" };
    sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: 0.22, fill: { color: col } });
    const tw = 7.6;
    sl.addText(s.titre, { x: 0.6, y: 0.5, w: tw, h: 1.1, fontSize: 30, bold: true, color: col, fontFace: "Segoe UI", valign: "top", fit: "shrink" });
    sl.addText(s.accroche, { x: 0.6, y: 1.65, w: tw, h: 1.0, fontSize: 17, color: "334155", fontFace: "Segoe UI", valign: "top" });
    sl.addText(
      s.points.map((p) => ({ text: p, options: { bullet: { code: "25CF" }, paraSpaceAfter: 10 } })),
      { x: 0.6, y: 2.75, w: tw, h: 2.6, fontSize: 18, color: "1E293B", fontFace: "Segoe UI", valign: "top" }
    );
    if (s.analogie) {
      sl.addShape(pptx.ShapeType.rect, { x: 0.6, y: 5.6, w: 0.08, h: 0.9, fill: { color: col } });
      sl.addText("💡 " + s.analogie, { x: 0.7, y: 5.6, w: tw - 0.1, h: 0.9, fontSize: 15, italic: true, color: "334155", fill: { color: "F1F5F9" }, fontFace: "Segoe UI", margin: 10 });
    }
    // Illustration
    const bx = 8.6, by = 0.5, bw = 4.3, bh = 6.3;
    if (s.image) {
      const file = path.join(pub, s.image);
      const { width, height } = sizeOf(fs.readFileSync(file));
      const r = Math.min(bw / width, bh / height);
      const w = width * r, h = height * r;
      sl.addImage({ path: file, x: bx + (bw - w) / 2, y: by + (bh - h) / 2, w, h });
    } else {
      sl.addShape(pptx.ShapeType.ellipse, { x: bx + 0.35, y: 1.85, w: 3.6, h: 3.6, fill: { color: col, transparency: 88 } });
      sl.addText(s.icone || "", { x: bx + 0.35, y: 1.85, w: 3.6, h: 3.6, fontSize: 110, align: "center", valign: "middle" });
    }
    sl.addText("Absolute Micro — 01 34 87 74 43", { x: 0.6, y: 7.0, w: 6, h: 0.35, fontSize: 10, color: "94A3B8" });
    sl.addText(`${i + 1} / ${deck.slides.length}`, { x: W - 1.6, y: 7.0, w: 1, h: 0.35, fontSize: 10, color: "94A3B8", align: "right" });
  });

  const file = path.join(out, `${key}.pptx`);
  await pptx.writeFile({ fileName: file });
  console.log("OK", path.relative(root, file));
}

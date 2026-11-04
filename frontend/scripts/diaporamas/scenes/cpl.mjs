// CPL — le réseau par les fils électriques.
import { icon, tile, chip, label, line, path, panel, router, monitor, svg } from "../tech.mjs";

const C = "#4D7C0F", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#1F3305";

function plug(x, y, c = C) {
  return `<rect x="${x - 34}" y="${y - 46}" width="68" height="92" rx="14" fill="#ffffff" stroke="${c}" stroke-width="3"/>` +
    `<circle cx="${x}" cy="${y - 12}" r="16" fill="#f1f5f9" stroke="${c}" stroke-width="2"/>` +
    `<circle cx="${x - 6}" cy="${y - 12}" r="3" fill="${c}"/><circle cx="${x + 6}" cy="${y - 12}" r="3" fill="${c}"/>` +
    `<circle cx="${x}" cy="${y + 26}" r="5" fill="#22c55e"/>`;
}

// Principe
export function principe() {
  const W = 1600, H = 500;
  const l1 = (() => {
    let b = panel(30, 60, 1540, 380, { r: 20, fill: "#f7fee7", stroke: "#d9f99d" });
    b += path("M 330 380 L 1270 380", "#a16207", { w: 8 });
    b += chip(800, 380, "circuit électrique du bâtiment (230 V)", { size: 14, color: "#713f12", border: "#fde68a" });
    b += router(150, 250, 120, INK) + chip(150, 330, "Box", { size: 13, bold: true });
    b += line(215, 250, 290, 250, MUTED, { w: 3 });
    b += plug(330, 250) + line(330, 296, 330, 380, "#a16207", { w: 4 });
    b += plug(1270, 250) + line(1270, 296, 1270, 380, "#a16207", { w: 4 });
    b += line(1310, 250, 1390, 250, MUTED, { w: 3 });
    b += monitor(1460, 250, 110, INK);
    b += chip(330, 140, "Adaptateur 1", { size: 13, bg: C, color: "#fff", border: C, bold: true });
    b += chip(1270, 140, "Adaptateur 2", { size: 13, bg: C, color: "#fff", border: C, bold: true });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = path("M 380 230 C 600 120 1000 120 1220 230", C, { w: 4, dash: "10 8", arrow: true });
    b += chip(800, 150, "Les données voyagent dans le courant électrique", { size: 15, bg: "#ffffff", color: DARK, border: "#d9f99d", bold: true });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

// Débit annoncé vs réel
export function debit() {
  const W = 1000, H = 560;
  const bars = [["Annoncé sur la boîte", 1200, "#a3a3a3"], ["Même pièce, même circuit", 400, C], ["Autre étage", 120, "#d97706"], ["Autre tableau électrique", 0, RED]];
  const l1 = (() => {
    let b = label(40, 40, "Débit réel typique (Mb/s)", { size: 17, color: DARK, anchor: "start", weight: 800 });
    bars.forEach(([t, v, c], i) => {
      const y = 90 + i * 110, w = Math.max(8, (v / 1200) * 560);
      b += label(40, y + 30, t, { size: 15, color: INK, anchor: "start", weight: 600 });
      b += `<rect x="40" y="${y + 45}" width="560" height="34" rx="10" fill="#f1f5f9"/>`;
      b += `<rect x="40" y="${y + 45}" width="${w}" height="34" rx="10" fill="${c}"/>`;
      b += label(620, y + 70, v === 0 ? "ne passe pas" : `≈ ${v}`, { size: 16, color: c === "#a3a3a3" ? INK : c, anchor: "start", weight: 800, mono: true });
    });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = panel(780, 90, 200, 400, { r: 16, stroke: "#fecaca", fill: "#fff1f2" });
    b += label(880, 130, "Perturbent", { size: 15, color: RED, weight: 800 });
    const it = [["PlugZap", "multiprises"], ["Microwave", "électroménager"], ["Lightbulb", "variateurs"], ["Zap", "chargeurs"]];
    it.forEach(([ic, t], i) => (b += tile(ic, 880, 190 + i * 80, 46, RED) + label(880, 232 + i * 80, t, { size: 12, color: INK, weight: 600 })));
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

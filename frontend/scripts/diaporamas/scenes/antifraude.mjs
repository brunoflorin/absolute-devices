// Loi anti-fraude TVA — les 4 conditions et le justificatif.
import { icon, tile, chip, label, line, path, panel, doc, svg } from "../tech.mjs";

const A = "#B45309", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#3A1A03";

// Les 4 conditions
export function conditions() {
  const W = 1600, H = 520;
  const items = [
    ["Lock", "Inaltérabilité", "une vente enregistrée ne peut plus être modifiée ou effacée sans trace"],
    ["ShieldCheck", "Sécurisation", "les données sont protégées et leur intégrité est contrôlable"],
    ["HardDrive", "Conservation", "les données sont conservées et restent consultables"],
    ["Archive", "Archivage", "des clôtures périodiques figent les données dans des archives sécurisées"],
  ];
  const layers = items.map(([ic, t, d], i) => {
    const x = 40 + i * 390;
    let b = panel(x, 60, 360, 400, { r: 20, stroke: "#fde68a", fill: i % 2 ? "#ffffff" : "#fffbeb" });
    b += `<circle cx="${x + 50}" cy="110" r="22" fill="${A}"/>` + label(x + 50, 117, String(i + 1), { size: 16, color: "#fff", weight: 800 });
    b += tile(ic, x + 180, 210, 100, A, { solid: true });
    b += label(x + 180, 310, t, { size: 21, color: DARK, weight: 800 });
    const words = d.split(" ");
    let lines = [""];
    for (const w of words) (lines[lines.length - 1] + " " + w).length > 26 ? lines.push(w) : (lines[lines.length - 1] = (lines[lines.length - 1] + " " + w).trim());
    lines.forEach((l, k) => (b += label(x + 180, 350 + k * 26, l, { size: 14, color: INK, weight: 500 })));
    return svg(W, H, b);
  });
  return { W, H, layers };
}

// Le contrôle : ticket modifié, trace et justificatif
export function controle() {
  const W = 1600, H = 520;
  const l1 = (() => {
    let b = panel(40, 40, 380, 440, { r: 16 });
    b += label(230, 85, "Ticket n° 2026-11-0457", { size: 16, color: DARK, weight: 800, mono: true });
    const rows = [["Menu du jour", "18,50"], ["Café", "2,20"], ["Dessert", "6,00"]];
    rows.forEach(([a, p], i) => (b += label(70, 140 + i * 36, a, { size: 15, color: INK, anchor: "start", weight: 500 }) + label(390, 140 + i * 36, p, { size: 15, color: INK, anchor: "end", weight: 600, mono: true })));
    b += line(70, 255, 390, 255, "#e2e8f0", { w: 2 });
    b += label(70, 290, "Total TTC", { size: 16, color: DARK, anchor: "start", weight: 800 }) + label(390, 290, "26,70 €", { size: 16, color: DARK, anchor: "end", weight: 800, mono: true });
    b += chip(230, 360, "empreinte : 9f2c…e41a", { size: 13, mono: true, color: A, border: "#fde68a", bg: "#fffbeb" });
    b += label(230, 420, "Chaque ticket est chaîné au précédent", { size: 14, color: INK, weight: 500 });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = path("M 430 260 L 600 260", RED, { w: 3, dash: "6 6", arrow: true });
    b += chip(515, 225, "suppression", { size: 13, color: RED, border: "#fecaca", bg: "#fff1f2" });
    b += panel(610, 120, 400, 280, { r: 16, stroke: "#fecaca", fill: "#fff1f2" });
    b += tile("TriangleAlert", 660, 180, 60, RED, { solid: true });
    b += label(705, 175, "Trace indélébile", { size: 18, color: RED, anchor: "start", weight: 800 });
    b += label(705, 200, "dans le journal des événements", { size: 14, color: INK, anchor: "start", weight: 500 });
    b += label(640, 270, "Le chaînage est rompu :", { size: 15, color: INK, anchor: "start", weight: 600 });
    b += label(640, 298, "la modification est visible", { size: 15, color: INK, anchor: "start", weight: 600 });
    b += label(640, 326, "lors d'un contrôle fiscal.", { size: 15, color: INK, anchor: "start", weight: 600 });
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = panel(1100, 80, 460, 360, { r: 18, stroke: "#bbf7d0", fill: "#f0fdf4" });
    b += doc(1190, 200, 110, "", { accent: OK });
    b += icon("BadgeCheck", 1225, 240, 44, OK, 2.2);
    b += label(1270, 175, "Justificatif", { size: 19, color: OK, anchor: "start", weight: 800 });
    b += label(1270, 202, "attestation de l'éditeur", { size: 14, color: INK, anchor: "start", weight: 500 });
    b += label(1270, 224, "ou certificat accrédité", { size: 14, color: INK, anchor: "start", weight: 500 });
    b += label(1130, 330, "À présenter en cas de contrôle.", { size: 15, color: DARK, anchor: "start", weight: 700 });
    b += label(1130, 360, "Sans justificatif : amende de 7 500 €", { size: 15, color: RED, anchor: "start", weight: 800 });
    b += label(1130, 388, "par logiciel concerné", { size: 14, color: INK, anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

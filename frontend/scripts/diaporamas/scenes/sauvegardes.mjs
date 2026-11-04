// Sauvegardes — la règle 3-2-1 et le scénario rançongiciel.
import { icon, tile, chip, label, line, path, panel, monitor, nas, cloud, ring, svg } from "../tech.mjs";

const G = "#15803D", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", DARK = "#052E16";

// 3-2-1
export function regle321() {
  const W = 1600, H = 560;
  const l1 = (() => {
    let b = panel(40, 110, 340, 340, { r: 20 });
    b += monitor(210, 230, 150, INK);
    b += label(210, 345, "Copie n°1", { size: 18, color: DARK, weight: 800 });
    b += label(210, 372, "les données de travail", { size: 14, color: INK, weight: 500 });
    b += chip(210, 415, "PC et serveur", { size: 13 });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = path("M 385 280 L 600 280", G, { w: 4, arrow: true });
    b += chip(492, 245, "chaque nuit", { size: 13, color: G, border: "#bbf7d0" });
    b += panel(610, 110, 340, 340, { r: 20, stroke: "#bbf7d0" });
    b += nas(780, 225, 150, INK);
    b += label(780, 345, "Copie n°2", { size: 18, color: DARK, weight: 800 });
    b += label(780, 372, "sur un autre support", { size: 14, color: INK, weight: 500 });
    b += chip(780, 415, "NAS au bureau", { size: 13, bg: G, color: "#fff", border: G, bold: true });
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = path("M 955 280 L 1170 280", G, { w: 4, arrow: true });
    b += chip(1062, 245, "chiffrée", { size: 13, color: G, border: "#bbf7d0" });
    b += panel(1180, 110, 380, 340, { r: 20, stroke: "#bbf7d0", fill: "#f0fdf4" });
    b += cloud(1370, 220, 170, G, "#dcfce7");
    b += icon("Lock", 1370, 222, 34, G, 2.2);
    b += label(1370, 345, "Copie n°3", { size: 18, color: DARK, weight: 800 });
    b += label(1370, 372, "hors des locaux", { size: 14, color: INK, weight: 500 });
    b += chip(1370, 415, "Cloud en France", { size: 13, bg: G, color: "#fff", border: G, bold: true });
    b += chip(800, 510, "3 copies  ·  2 supports  ·  1 hors site", { size: 16, bg: DARK, color: "#fff", border: DARK, bold: true });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

// Scénario : rançongiciel au bureau
export function scenario() {
  const W = 1600, H = 560;
  const l1 = (() => {
    let b = panel(40, 60, 700, 420, { r: 20, fill: "#fff7f7", stroke: "#fecaca" });
    b += label(70, 105, "Vendredi 18 h : rançongiciel au bureau", { size: 18, color: RED, anchor: "start", weight: 800 });
    b += monitor(200, 260, 150, RED, "#fee2e2") + icon("Lock", 200, 245, 40, RED, 2.4);
    b += path("M 290 260 L 470 260", RED, { w: 3.5, dash: "6 6", arrow: true });
    b += nas(570, 255, 150, RED, RED) + icon("Lock", 570, 255, 36, RED, 2.4);
    b += chip(200, 380, "PC chiffré", { size: 14, bg: RED, color: "#fff", border: RED, bold: true });
    b += chip(570, 380, "NAS branché : chiffré aussi", { size: 14, bg: RED, color: "#fff", border: RED, bold: true });
    b += label(390, 450, "Tout ce qui est joignable depuis le réseau peut être touché", { size: 14, color: INK, weight: 500 });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = panel(820, 60, 740, 420, { r: 20, stroke: "#bbf7d0", fill: "#f0fdf4" });
    b += label(850, 105, "Lundi 9 h : la copie Cloud est intacte", { size: 18, color: G, anchor: "start", weight: 800 });
    b += cloud(1010, 250, 180, G, "#dcfce7") + icon("ShieldCheck", 1010, 252, 38, G, 2.2);
    b += chip(1010, 360, "Copie isolée et non modifiable", { size: 14, bg: G, color: "#fff", border: G, bold: true });
    b += path("M 1110 250 L 1300 250", G, { w: 4, arrow: true });
    b += monitor(1400, 250, 150, INK, "#dcfce7") + icon("Check", 1400, 240, 40, G, 3);
    b += chip(1400, 360, "Données restaurées", { size: 14, bg: G, color: "#fff", border: G, bold: true });
    b += label(1190, 450, "Aucune rançon payée, activité relancée", { size: 15, color: DARK, weight: 700 });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

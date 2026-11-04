// Audits de sécurité — faire l'état des lieux, mesurer, prioriser.
import { icon, tile, chip, label, line, path, panel, monitor, nas, ring, svg } from "../tech.mjs";

const C = "#0369A1", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", AMB = "#d97706", OK = "#16a34a", DARK = "#082F49";

// Les 4 étapes d'un audit
export function demarche() {
  const W = 1600, H = 490;
  const steps = [["ClipboardList", "1. Inventaire", "postes, comptes, logiciels, équipements"], ["ScanSearch", "2. Analyse", "configurations, mises à jour, droits"], ["Gauge", "3. Évaluation", "chaque point noté, selon son risque"], ["ListChecks", "4. Plan d'action", "corrections classées, par priorité"]];
  const layers = steps.map(([ic, t, d], i) => {
    const x = 200 + i * 400;
    let b = panel(x - 175, 60, 350, 400, { r: 20, stroke: "#bae6fd" });
    b += tile(ic, x, 150, 100, C, { solid: true });
    b += label(x, 260, t, { size: 22, color: DARK, weight: 800 });
    const words = d.split(", ");
    words.forEach((w, k) => (b += label(x, 305 + k * 32, w, { size: 17, color: INK, weight: 500 })));
    if (i < 3) b += line(x + 175, 240, x + 225, 240, C, { w: 4, arrow: true });
    return svg(W, H, b);
  });
  return { W, H, layers };
}

// Le tableau de bord de l'audit : constats notés
export function constats() {
  const W = 1500, H = 560;
  const rows = [
    ["Mises à jour Windows", "3 postes en retard", RED, "Critique"],
    ["Mots de passe", "Comptes sans double authentification", RED, "Critique"],
    ["Sauvegardes", "Jamais testées en restauration", AMB, "Important"],
    ["Droits d'accès", "Tout le monde est administrateur", AMB, "Important"],
    ["Pare-feu", "Règles à jour, journal actif", OK, "Conforme"],
  ];
  const l1 = (() => {
    let b = panel(30, 30, 1440, 500, { r: 20 });
    b += label(70, 85, "Rapport d'audit — synthèse", { size: 20, color: DARK, anchor: "start", weight: 800 });
    ["Domaine", "Constat", "Niveau"].forEach((h, i) => (b += label([70, 480, 1150][i], 130, h, { size: 14, color: MUTED, anchor: "start", weight: 700 })));
    rows.forEach(([d, c], j) => {
      const y = 180 + j * 68;
      b += `<rect x="50" y="${y - 32}" width="1400" height="56" rx="10" fill="${j % 2 ? "#ffffff" : "#f8fafc"}"/>`;
      b += label(70, y + 6, d, { size: 19, color: DARK, anchor: "start", weight: 700 });
      b += label(480, y + 6, c, { size: 18, color: INK, anchor: "start", weight: 500 });
    });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = "";
    rows.forEach(([, , col, n], j) => {
      const y = 180 + j * 68;
      b += chip(1150, y - 1, n, { size: 17, bg: col, color: "#ffffff", border: col, bold: true, anchor: "start" });
    });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

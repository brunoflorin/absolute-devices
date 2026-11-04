// RGPD — le cycle de vie d'une donnée personnelle et la violation sous 72 h.
import { icon, tile, chip, label, line, path, panel, person, doc, svg } from "../tech.mjs";

const P = "#DB2777", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#3B0A22";

// Cycle de vie d'une donnée
export function cycle() {
  const W = 1600, H = 520;
  const steps = [
    ["UserPlus", "Collecte", "seulement le nécessaire", "minimisation"],
    ["Lock", "Stockage", "protégé et accès limités", "sécurité"],
    ["Eye", "Utilisation", "pour le but annoncé", "finalité"],
    ["Timer", "Conservation", "durée définie à l'avance", "durée"],
    ["Trash2", "Suppression", "ou archivage", "effacement"],
  ];
  const l1 = (() => {
    let b = "";
    steps.forEach(([ic, t, d], i) => {
      const x = 150 + i * 325;
      b += tile(ic, x, 170, 100, P, { solid: i === 0 });
      b += label(x, 270, t, { size: 19, color: DARK, weight: 800 });
      b += label(x, 298, d, { size: 14, color: INK, weight: 500 });
      if (i < 4) b += line(x + 75, 170, x + 250, 170, MUTED, { w: 3, arrow: true });
    });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = panel(80, 360, 1440, 120, { r: 18, stroke: "#fbcfe8", fill: "#fdf2f8" });
    b += tile("BookOpen", 150, 420, 64, P, { solid: true });
    b += label(205, 410, "Le registre des traitements", { size: 19, color: DARK, anchor: "start", weight: 800 });
    b += label(205, 440, "Pour chaque fichier : quelles données, pourquoi, qui y a accès, combien de temps, quelle protection.", { size: 15, color: INK, anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

// Violation de données : 72 heures
export function violation() {
  const W = 1600, H = 520;
  const l1 = (() => {
    let b = line(80, 250, 1520, 250, MUTED, { w: 4, arrow: true });
    const marks = [[120, "1", "Incident constaté", "PC volé, piratage, envoi par erreur", RED], [560, "2", "Évaluer le risque", "quelles données, combien de personnes", P], [1000, "3", "Documenter", "registre des violations", P], [1440, "72 h", "Notifier la CNIL", "si risque pour les personnes", DARK]];
    for (const [x, t, h, d, c] of marks) {
      b += `<circle cx="${x}" cy="250" r="30" fill="${c}"/>`;
      b += label(x, 257, t, { size: 14, color: "#fff", weight: 800 });
      b += label(x, 320, h, { size: 17, color: DARK, weight: 800 });
      b += label(x, 346, d, { size: 13, color: INK, weight: 500 });
    }
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = panel(1080, 400, 480, 90, { r: 16, stroke: "#fecaca", fill: "#fff1f2" });
    b += tile("Users", 1125, 445, 52, RED, { solid: true });
    b += label(1165, 438, "Risque élevé pour les personnes ?", { size: 15, color: RED, anchor: "start", weight: 800 });
    b += label(1165, 463, "Elles doivent aussi être informées", { size: 14, color: INK, anchor: "start", weight: 500 });
    b += panel(40, 400, 520, 90, { r: 16, stroke: "#bbf7d0", fill: "#f0fdf4" });
    b += tile("ShieldCheck", 85, 445, 52, OK, { solid: true });
    b += label(125, 438, "Données chiffrées, sauvegardées ?", { size: 15, color: OK, anchor: "start", weight: 800 });
    b += label(125, 463, "Le risque, et donc l'impact, sont bien moindres", { size: 14, color: INK, anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

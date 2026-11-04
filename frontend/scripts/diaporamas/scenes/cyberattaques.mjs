// Cyberattaques — la chaîne d'attaque, étape par étape.
import { icon, tile, chip, label, line, path, panel, monitor, nas, svg } from "../tech.mjs";

const C = "#9F1239", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#2A0712";

export function chaine() {
  const W = 1600, H = 560;
  const steps = [
    ["Search", "Repérage", "sites, réseaux sociaux, adresses mail"],
    ["Mail", "Entrée", "mail piégé ou accès mal protégé"],
    ["Footprints", "Progression", "vol de mots de passe, poste après poste"],
    ["Lock", "Frappe", "vol des données puis chiffrement"],
    ["Banknote", "Rançon", "paiement exigé sous menace de publication"],
  ];
  const layers = [];
  steps.forEach(([ic, t, d], i) => {
    const x = 160 + i * 320;
    let b = "";
    if (i > 0) b += line(x - 250, 180, x - 70, 180, MUTED, { w: 3, arrow: true });
    b += tile(ic, x, 180, 100, C, { solid: i === 4 });
    b += `<circle cx="${x - 46}" cy="${134}" r="18" fill="${DARK}"/>` + label(x - 46, 140, String(i + 1), { size: 14, color: "#fff", weight: 800 });
    b += label(x, 270, t, { size: 19, color: DARK, weight: 800 });
    b += label(x, 300, d.split(" ").slice(0, 3).join(" "), { size: 13, color: INK, weight: 500 });
    b += label(x, 322, d.split(" ").slice(3).join(" "), { size: 13, color: INK, weight: 500 });
    layers.push(svg(W, H, b));
  });
  let s = panel(200, 390, 1200, 110, { r: 18, stroke: "#bbf7d0", fill: "#f0fdf4" });
  s += tile("ShieldCheck", 260, 445, 60, OK, { solid: true });
  s += label(310, 438, "À chaque étape, une protection peut casser la chaîne :", { size: 16, color: "#14532d", anchor: "start", weight: 800 });
  s += label(310, 466, "filtre mail, MFA, pare-feu, EDR, sauvegarde isolée…", { size: 15, color: "#14532d", anchor: "start", weight: 500 });
  layers.push(svg(W, H, s));
  return { W, H, layers };
}

export function cibles() {
  const W = 1500, H = 560;
  const l1 = (() => {
    let b = panel(40, 60, 640, 440, { r: 20, fill: "#f8fafc" });
    b += label(360, 105, "Ce que l'on imagine", { size: 18, color: INK, weight: 800 });
    b += tile("Landmark", 240, 230, 110, MUTED);
    b += tile("Building", 480, 230, 110, MUTED);
    b += label(360, 350, "Les pirates visent les grands groupes,", { size: 15, color: INK, weight: 500 });
    b += label(360, 376, "une petite entreprise n'intéresse personne", { size: 15, color: INK, weight: 500 });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = panel(800, 60, 660, 440, { r: 20, stroke: "#fecdd3" });
    b += label(1130, 105, "La réalité", { size: 18, color: C, weight: 800 });
    b += tile("Bot", 980, 230, 110, C, { solid: true });
    b += path("M 1040 230 L 1150 230", C, { w: 3, arrow: true });
    for (let i = 0; i < 3; i++) b += monitor(1220 + (i % 3) * 70, 190 + (i % 2) * 70, 70, C, "#ffe4e6");
    b += label(1130, 350, "Des attaques automatisées testent tout le", { size: 15, color: INK, weight: 500 });
    b += label(1130, 376, "monde : les moins protégés tombent en premier", { size: 15, color: INK, weight: 500 });
    b += chip(1130, 445, "TPE, artisans, mairies, cabinets…", { size: 14, bg: C, color: "#fff", border: C, bold: true });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

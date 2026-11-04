// EDR — de la liste de signatures à l'analyse de comportement.
import { icon, tile, chip, label, line, path, panel, monitor, laptop, doc, ring, svg } from "../tech.mjs";

const V = "#6D28D9", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#1E1036";

// L'antivirus classique : comparaison d'empreintes
export function signatures() {
  const W = 1000, H = 600;
  const l1 = (() => {
    let b = panel(40, 40, 420, 330, { r: 16 });
    b += label(65, 78, "Base de signatures", { size: 17, color: DARK, anchor: "start", weight: 700 });
    const hs = ["a3f9 1c07 …", "77be 0d4e …", "e10c 9a2f …", "4b6d 33f1 …", "9c02 e8aa …"];
    hs.forEach((h, i) => {
      b += `<rect x="62" y="${100 + i * 50}" width="376" height="38" rx="8" fill="#f8fafc"/>`;
      b += icon("Bug", 88, 119 + i * 50, 22, RED);
      b += label(112, 125 + i * 50, h, { size: 14, color: INK, anchor: "start", mono: true });
    });
    b += doc(700, 140, 90, "facture.pdf.exe", { danger: true });
    b += label(700, 245, "empreinte : 77be 0d4e …", { size: 13, color: INK, mono: true });
    b += path("M 640 140 C 560 140 520 190 445 197", RED, { w: 3, arrow: true });
    b += chip(860, 140, "Connu → bloqué", { size: 14, bg: OK, color: "#fff", border: OK, bold: true });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = doc(700, 430, 90, "devis_2026.docm", { danger: true });
    b += label(700, 535, "empreinte : jamais vue", { size: 13, color: RED, mono: true });
    b += path("M 640 430 C 540 430 520 380 445 360", MUTED, { w: 3, dash: "6 6", arrow: true });
    b += chip(250, 430, "Aucune correspondance", { size: 14, color: RED, border: "#fecaca", bg: "#fff1f2", bold: true });
    b += chip(860, 430, "Inconnu → passe", { size: 14, bg: RED, color: "#fff", border: RED, bold: true });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

// L'EDR suit la chaîne des processus
export function chaine() {
  const W = 1600, H = 560;
  const steps = [
    ["FileText", "WINWORD.EXE", "ouvre une pièce jointe"],
    ["Terminal", "powershell.exe", "lancé par Word ?!"],
    ["Download", "télécharge", "un exécutable"],
    ["Lock", "chiffre", "fichier sur fichier"],
  ];
  const l1 = (() => {
    let b = "";
    steps.forEach(([ic, p, d], i) => {
      const x = 170 + i * 400;
      b += tile(ic, x, 150, 96, i === 0 ? INK : V);
      b += label(x, 245, p, { size: 16, color: DARK, weight: 700, mono: true });
      b += label(x, 272, d, { size: 14, color: INK, weight: 500 });
      if (i < 3) b += line(x + 70, 150, x + 330, 150, MUTED, { w: 3, arrow: true });
    });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = "";
    b += ring(570, 150, 66, RED, { dash: "6 6", w: 3 });
    b += chip(570, 330, "Comportement anormal", { size: 13, bg: "#fff1f2", color: RED, border: "#fecaca", bold: true });
    b += ring(1370, 150, 66, RED, { dash: "6 6", w: 3 });
    b += chip(1370, 330, "Chiffrement en masse", { size: 13, bg: "#fff1f2", color: RED, border: "#fecaca", bold: true });
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = panel(40, 380, 1520, 130, { r: 18, stroke: "#ddd6fe", fill: "#f5f3ff" });
    const acts = [["OctagonX", "Processus arrêté"], ["Unplug", "Poste isolé du réseau"], ["RotateCcw", "Fichiers restaurés"], ["FileSearch", "Rapport d'attaque"]];
    acts.forEach(([ic, t], i) => {
      const x = 120 + i * 380;
      b += tile(ic, x, 445, 58, V, { solid: true });
      b += label(x + 42, 451, t, { size: 15, color: DARK, anchor: "start", weight: 700 });
    });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

// Isolation d'un poste
export function isolation() {
  const W = 1500, H = 560;
  const pcs = [[300, 140], [300, 420], [700, 140], [700, 420]];
  const l1 = (() => {
    let b = tile("Network", 500, 280, 80, INK);
    for (const [x, y] of pcs) b += line(500, 280, x, y, MUTED, { w: 3 }) + monitor(x, y, 110, INK);
    b += chip(500, 345, "Réseau du bureau", { size: 14 });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = `<circle cx="640" cy="378" r="17" fill="#ffffff" stroke="${RED}" stroke-width="2"/>` + icon("X", 640, 378, 22, RED, 3);
    b += monitor(700, 420, 110, RED, "#fee2e2");
    b += ring(700, 420, 90, RED, { w: 4 });
    b += chip(700, 535, "Isolé du réseau", { size: 14, bg: RED, color: "#fff", border: RED, bold: true });
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = tile("ShieldCheck", 1220, 200, 110, V, { solid: true });
    b += label(1220, 290, "Console de supervision", { size: 15, color: DARK, weight: 700 });
    b += label(1220, 315, "équipe Absolute Micro", { size: 14, color: INK, weight: 500 });
    b += path("M 790 420 C 1000 420 1050 260 1150 230", V, { w: 4, dash: "8 7", arrow: true });
    b += chip(1000, 400, "seul lien conservé", { size: 13, color: V, border: "#ddd6fe", bold: true });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

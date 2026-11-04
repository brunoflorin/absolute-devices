// SharePoint & OneDrive — qui range quoi, qui voit quoi, et le retour en arrière.
import { icon, tile, chip, label, line, path, panel, person, doc, svg } from "../tech.mjs";

const T = "#0D9488", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#062A27";

// OneDrive (perso) vs SharePoint (entreprise) + matrice de droits
export function droits() {
  const W = 1600, H = 580;
  const l1 = (() => {
    let b = panel(30, 40, 420, 500, { r: 20, stroke: "#99f6e4", fill: "#f0fdfa" });
    b += tile("Cloud", 100, 110, 70, T, { solid: true });
    b += label(150, 104, "OneDrive", { size: 20, color: DARK, anchor: "start", weight: 800 });
    b += label(150, 130, "les documents de chacun", { size: 14, color: INK, anchor: "start", weight: 500 });
    const items = ["Bureau et Documents protégés", "Synchronisé avec le PC", "Partage ponctuel par lien", "PC perdu : rien n'est perdu"];
    items.forEach((t, i) => (b += icon("Check", 75, 205 + i * 62, 22, OK, 3) + label(100, 211 + i * 62, t, { size: 15, color: INK, anchor: "start", weight: 500 })));
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = panel(500, 40, 1070, 500, { r: 20, stroke: "#99f6e4" });
    b += tile("Building2", 570, 110, 70, T, { solid: true });
    b += label(620, 104, "SharePoint", { size: 20, color: DARK, anchor: "start", weight: 800 });
    b += label(620, 130, "les dossiers de l'entreprise, avec des droits par service", { size: 14, color: INK, anchor: "start", weight: 500 });
    const cols = ["Direction", "Comptabilité", "Commercial", "Technique"];
    const rows = [["Gérant", [1, 1, 1, 1]], ["Comptable", [0, 1, 0, 0]], ["Commercial", [0, 0, 1, 1]], ["Technicien", [0, 0, 0, 1]]];
    cols.forEach((c, i) => (b += label(870 + i * 175, 200, c, { size: 14, color: DARK, weight: 700 })));
    rows.forEach(([r, v], j) => {
      const y = 260 + j * 68;
      b += `<rect x="530" y="${y - 30}" width="1010" height="56" rx="10" fill="${j % 2 ? "#ffffff" : "#f8fafc"}"/>`;
      b += person(575, y - 2, 40, "#64748b");
      b += label(605, y + 4, r, { size: 15, color: INK, anchor: "start", weight: 600 });
      v.forEach((ok, i) => {
        const x = 870 + i * 175;
        b += ok ? `<circle cx="${x}" cy="${y - 2}" r="16" fill="${OK}"/>` + icon("Check", x, y - 2, 20, "#fff", 3)
                : `<circle cx="${x}" cy="${y - 2}" r="16" fill="#e2e8f0"/>` + icon("Lock", x, y - 2, 18, "#64748b", 2.2);
      });
    });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

// Historique des versions et co-édition
export function versions() {
  const W = 1000, H = 620;
  const l1 = (() => {
    let b = doc(150, 150, 120, "Devis_Martin.xlsx", { accent: T });
    b += person(330, 110, 70, "#0f766e", "#ccfbf1") + person(330, 200, 70, "#7c3aed", "#ede9fe");
    b += chip(470, 110, "Julie modifie", { size: 13, color: "#0f766e", border: "#99f6e4" });
    b += chip(470, 200, "Marc commente", { size: 13, color: "#7c3aed", border: "#ddd6fe" });
    b += label(150, 285, "Un seul fichier, ouvert à plusieurs en même temps", { size: 15, color: INK, anchor: "start", weight: 600 });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = line(80, 420, 920, 420, MUTED, { w: 3, arrow: true });
    const vs = [["v1", "lundi"], ["v2", "mardi"], ["v3", "mercredi"], ["v4", "jeudi"], ["v5", "vendredi"]];
    vs.forEach(([v, d], i) => {
      const x = 140 + i * 180;
      const bad = i === 4;
      b += `<circle cx="${x}" cy="420" r="26" fill="${bad ? RED : i === 3 ? OK : T}"/>`;
      b += label(x, 427, v, { size: 15, color: "#fff", weight: 800 });
      b += label(x, 480, d, { size: 14, color: INK, weight: 500 });
    });
    b += chip(860, 360, "colonne effacée par erreur", { size: 13, bg: "#fff1f2", color: RED, border: "#fecaca", bold: true });
    b += path("M 860 505 C 860 565 690 565 690 505", OK, { w: 3.5, arrow: true });
    b += chip(775, 585, "Restaurer la v4", { size: 14, bg: OK, color: "#fff", border: OK, bold: true });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

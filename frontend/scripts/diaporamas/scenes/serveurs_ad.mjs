// Serveur Windows & Active Directory — un annuaire central pour les comptes, les droits et les règles.
import { icon, tile, chip, label, line, path, panel, monitor, laptop, person, svg } from "../tech.mjs";

const C = "#0F4C5C", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#06232B";

// Sans annuaire : un compte par PC / Avec : un compte unique
export function annuaire() {
  const W = 1500, H = 500;
  const l1 = (() => {
    let b = panel(20, 20, 680, 460, { r: 18, fill: "#f8fafc" });
    b += label(360, 62, "Sans annuaire : un compte par poste", { size: 17, color: INK, weight: 800 });
    const pcs = [[150, 190], [360, 190], [570, 190]];
    pcs.forEach(([x, y], i) => {
      b += monitor(x, y, 120, INK);
      b += chip(x, y + 80, ["julie / Soleil1", "julie / julie78", "julie / Azerty!"][i], { size: 12, mono: true, color: RED, border: "#fecaca", bg: "#fff1f2" });
    });
    b += label(360, 360, "Trois mots de passe, trois profils,", { size: 15, color: INK, weight: 500 });
    b += label(360, 386, "et un départ à gérer poste par poste", { size: 15, color: INK, weight: 500 });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = panel(800, 20, 680, 460, { r: 18, stroke: "#a5d8e0" });
    b += label(1140, 62, "Avec Active Directory : un compte unique", { size: 17, color: C, weight: 800 });
    b += tile("Server", 1140, 150, 90, C, { solid: true });
    b += chip(1140, 222, "julie.martin@societe.local", { size: 13, mono: true, bg: C, color: "#fff", border: C, bold: true });
    const pcs = [[950, 360], [1140, 370], [1330, 360]];
    for (const [x, y] of pcs) b += line(1140, 240, x, y - 55, C, { w: 2.5, dash: "5 5" }) + monitor(x, y, 110, INK);
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

// Groupes, droits et stratégies
export function gpo() {
  const W = 1600, H = 560;
  const l1 = (() => {
    let b = "";
    const users = [["Julie", 120], ["Marc", 260], ["Sonia", 400]];
    users.forEach(([n, y]) => (b += person(110, y, 70, "#64748b") + label(165, y + 6, n, { size: 15, color: INK, anchor: "start", weight: 600 })));
    const groups = [["Comptabilité", 170], ["Commercial", 350]];
    groups.forEach(([g, y]) => (b += panel(380, y - 40, 260, 80, { r: 14 }) + tile("Users", 425, y, 50, C) + label(465, y + 6, g, { size: 16, color: DARK, anchor: "start", weight: 700 })));
    b += path("M 230 120 C 300 120 300 170 375 170", MUTED, { w: 2.5 });
    b += path("M 230 260 C 300 260 300 170 375 170", MUTED, { w: 2.5 });
    b += path("M 230 400 C 300 400 300 350 375 350", MUTED, { w: 2.5 });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = "";
    const shares = [["Folder", "\\\\SRV\\Compta", 120, true, false], ["Folder", "\\\\SRV\\Commercial", 280, false, true], ["Folder", "\\\\SRV\\Commun", 440, true, true]];
    for (const [ic, n, y, a, c] of shares) {
      b += panel(760, y - 38, 330, 76, { r: 14 });
      b += tile(ic, 805, y, 48, "#d97706");
      b += label(845, y + 6, n, { size: 15, color: DARK, anchor: "start", weight: 700, mono: true });
      if (a) b += path(`M 640 170 C 700 170 700 ${y} 755 ${y}`, OK, { w: 2.5, arrow: true });
      if (c) b += path(`M 640 350 C 700 350 700 ${y} 755 ${y}`, OK, { w: 2.5, arrow: true });
    }
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = panel(1170, 60, 400, 440, { r: 18, stroke: "#a5d8e0", fill: "#f0f9fb" });
    b += label(1195, 100, "Stratégies de groupe (GPO)", { size: 17, color: DARK, anchor: "start", weight: 800 });
    const g = [["Lock", "Verrouillage après 10 min"], ["KeyRound", "Mots de passe robustes"], ["Printer", "Imprimantes installées seules"], ["Ban", "Clés USB bloquées"], ["RefreshCw", "Mises à jour imposées"]];
    g.forEach(([ic, t], i) => (b += tile(ic, 1215, 160 + i * 70, 44, C, { solid: true }) + label(1250, 166 + i * 70, t, { size: 15, color: INK, anchor: "start", weight: 600 })));
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

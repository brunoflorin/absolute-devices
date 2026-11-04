// Procédures internes — arrivée / départ d'un salarié et réflexes en cas d'incident.
import { icon, tile, chip, label, line, path, panel, person, svg } from "../tech.mjs";

const O = "#3F6212", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#1A2E05";

// Cycle arrivée / départ
export function arriveeDepart() {
  const W = 1600, H = 540;
  const l1 = (() => {
    let b = panel(30, 30, 740, 480, { r: 20, stroke: "#bef264", fill: "#f7fee7" });
    b += person(100, 95, 70, OK, "#dcfce7");
    b += label(150, 90, "Arrivée d'un salarié", { size: 19, color: DARK, anchor: "start", weight: 800 });
    b += label(150, 115, "la veille de son premier jour", { size: 14, color: INK, anchor: "start", weight: 500 });
    const a = [["UserPlus", "Compte et messagerie créés"], ["Users", "Ajouté aux bons groupes"], ["Laptop", "Poste préparé et protégé"], ["Smartphone", "Double authentification activée"], ["BookOpen", "Charte informatique signée"]];
    a.forEach(([ic, t], i) => (b += tile(ic, 90, 185 + i * 66, 48, O, { solid: true }) + label(130, 191 + i * 66, t, { size: 16, color: INK, anchor: "start", weight: 600 })));
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = panel(830, 30, 740, 480, { r: 20, stroke: "#fecaca", fill: "#fff7f7" });
    b += person(900, 95, 70, RED, "#fee2e2");
    b += label(950, 90, "Départ d'un salarié", { size: 19, color: RED, anchor: "start", weight: 800 });
    b += label(950, 115, "le jour même, pas trois mois après", { size: 14, color: INK, anchor: "start", weight: 500 });
    const d = [["UserX", "Compte désactivé"], ["KeyRound", "Mots de passe partagés changés"], ["Mail", "Messagerie redirigée ou conservée"], ["FolderInput", "Fichiers transférés au successeur"], ["Laptop", "Matériel récupéré et effacé"]];
    d.forEach(([ic, t], i) => (b += tile(ic, 890, 185 + i * 66, 48, RED, { solid: true }) + label(930, 191 + i * 66, t, { size: 16, color: INK, anchor: "start", weight: 600 })));
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

// En cas d'incident : les bons réflexes, dans l'ordre
export function incident() {
  const W = 1600, H = 480;
  const steps = [
    ["Unplug", "Débrancher", "le câble réseau ou couper le Wi-Fi", RED],
    ["Power", "Ne pas éteindre", "le PC : les traces restent en mémoire", "#d97706"],
    ["Phone", "Appeler", "Absolute Micro au 01 34 87 74 43", O],
    ["NotebookPen", "Noter", "l'heure, le message affiché, ce qui a été cliqué", O],
  ];
  const layers = steps.map(([ic, t, d, c], i) => {
    const x = 200 + i * 400;
    let b = `<circle cx="${x - 95}" cy="90" r="24" fill="${c}"/>` + label(x - 95, 97, String(i + 1), { size: 16, color: "#fff", weight: 800 });
    b += tile(ic, x, 170, 110, c, { solid: true });
    b += label(x, 285, t, { size: 21, color: DARK, weight: 800 });
    const words = d.split(" ");
    let lines = [""];
    for (const w of words) (lines[lines.length - 1] + " " + w).length > 24 ? lines.push(w) : (lines[lines.length - 1] = (lines[lines.length - 1] + " " + w).trim());
    lines.forEach((l, k) => (b += label(x, 322 + k * 27, l, { size: 15, color: INK, weight: 500 })));
    if (i < 3) b += line(x + 85, 170, x + 300, 170, MUTED, { w: 3, arrow: true });
    return svg(W, H, b);
  });
  return { W, H, layers };
}

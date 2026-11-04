// Mots de passe — longueur, réutilisation, gestionnaire.
import { icon, tile, chip, label, line, path, panel, person, svg } from "../tech.mjs";

const C = "#A21CAF", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#2E0833";

// Longueur vs complexité
export function longueur() {
  const W = 1500, H = 560;
  const rows = [
    ["Soleil2024!", "11 caractères, très répandu", 0.12, RED, "deviné vite"],
    ["Tr0ub4dor&3", "complexe mais court", 0.32, "#d97706", "résiste un peu"],
    ["cheval-agrafe-nuage-violon", "phrase de passe, 26 caractères", 0.96, OK, "résiste très longtemps"],
  ];
  const layers = [];
  const l0 = label(80, 60, "Résistance face à un logiciel qui essaie toutes les combinaisons (illustratif)", { size: 15, color: INK, anchor: "start", weight: 600 });
  layers.push(svg(W, H, l0));
  rows.forEach(([pw, d, v, c, verdict], i) => {
    const y = 140 + i * 130;
    let b = chip(80, y, pw, { size: 16, mono: true, bold: true, anchor: "start", color: c, border: c });
    b += label(80, y + 45, d, { size: 14, color: INK, anchor: "start", weight: 500 });
    b += `<rect x="640" y="${y - 16}" width="700" height="32" rx="16" fill="#f1f5f9"/>`;
    b += `<rect x="640" y="${y - 16}" width="${700 * v}" height="32" rx="16" fill="${c}"/>`;
    b += label(1340, y + 45, verdict, { size: 15, color: c, anchor: "end", weight: 800 });
    layers.push(svg(W, H, b));
  });
  return { W, H, layers };
}

// Réutilisation : une fuite ouvre toutes les portes / Gestionnaire : un coffre
export function reutilisation() {
  const W = 1600, H = 560;
  const l1 = (() => {
    let b = panel(30, 40, 720, 480, { r: 20, fill: "#fff7f7", stroke: "#fecaca" });
    b += label(390, 85, "Un seul mot de passe partout", { size: 18, color: RED, weight: 800 });
    b += tile("Store", 130, 200, 80, MUTED);
    b += label(130, 275, "Site de jardinage", { size: 13, color: INK });
    b += chip(130, 315, "fuite de données", { size: 13, bg: RED, color: "#fff", border: RED, bold: true });
    const t = [["Mail", 520, 150, "Messagerie"], ["Landmark", 520, 270, "Banque"], ["Building2", 520, 390, "Logiciel métier"]];
    for (const [ic, x, y, n] of t) {
      b += path(`M 180 200 C 330 200 360 ${y} ${x - 50} ${y}`, RED, { w: 2.5, dash: "6 6", arrow: true });
      b += tile(ic, x, y, 66, RED);
      b += label(x + 48, y + 6, n, { size: 15, color: INK, anchor: "start", weight: 600 });
    }
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = panel(840, 40, 730, 480, { r: 20, stroke: "#f5d0fe" });
    b += label(1205, 85, "Un gestionnaire de mots de passe", { size: 18, color: C, weight: 800 });
    b += person(960, 260, 90, "#64748b");
    b += chip(960, 340, "1 phrase maître + MFA", { size: 13, color: C, border: "#f5d0fe", bold: true });
    b += line(1010, 260, 1110, 260, C, { w: 3, arrow: true });
    b += tile("Vault", 1170, 260, 100, C, { solid: true });
    const k = ["k8#Lq…", "Zp2!v…", "9wR$m…"];
    k.forEach((t, i) => (b += line(1225, 260, 1340, 160 + i * 100, MUTED, { w: 2 }) + chip(1420, 160 + i * 100, t, { size: 14, mono: true })));
    b += label(1205, 470, "Un mot de passe unique et long pour chaque service", { size: 15, color: DARK, weight: 700 });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

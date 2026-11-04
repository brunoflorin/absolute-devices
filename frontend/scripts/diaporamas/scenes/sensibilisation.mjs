// Sensibilisation — campagne de faux hameçonnage et progression des réflexes.
import { icon, tile, chip, label, line, path, panel, person, svg } from "../tech.mjs";

const C = "#CA8A04", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#2B1D02";

// Campagne de test : envoi → clics → formation ciblée
export function campagne() {
  const W = 1600, H = 560;
  const l1 = (() => {
    let b = panel(30, 150, 300, 220, { r: 20, stroke: "#fde68a", fill: "#fefce8" });
    b += tile("Send", 100, 230, 70, C, { solid: true });
    b += label(150, 222, "Faux mail", { size: 18, color: DARK, anchor: "start", weight: 800 });
    b += label(150, 248, "de test", { size: 18, color: DARK, anchor: "start", weight: 800 });
    b += label(60, 320, "envoyé à toute l'équipe", { size: 14, color: INK, anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = "";
    const ppl = [[500, 80, OK, "Signale"], [500, 200, OK, "Ignore"], [500, 320, RED, "Clique"], [500, 440, RED, "Saisit son mot de passe"]];
    for (const [x, y, c, t] of ppl) {
      b += path(`M 335 260 C 400 260 400 ${y} ${x - 40} ${y}`, MUTED, { w: 2.5 });
      b += person(x, y, 64, c, c === OK ? "#dcfce7" : "#fee2e2");
      b += label(x + 50, y + 6, t, { size: 15, color: c, anchor: "start", weight: 700 });
    }
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = path("M 790 380 C 900 380 920 280 1010 280", C, { w: 4, arrow: true });
    b += panel(1020, 150, 540, 260, { r: 20, stroke: "#fde68a" });
    b += tile("GraduationCap", 1090, 220, 70, C, { solid: true });
    b += label(1140, 214, "Mini-formation", { size: 18, color: DARK, anchor: "start", weight: 800 });
    b += label(1140, 240, "immédiate, 5 minutes", { size: 14, color: INK, anchor: "start", weight: 500 });
    b += label(1060, 310, "« Voici les indices que vous auriez pu repérer »", { size: 14, color: INK, anchor: "start", weight: 600 });
    b += chip(1290, 365, "Aucune sanction, que de l'apprentissage", { size: 13, bg: OK, color: "#fff", border: OK, bold: true });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

// Progression des clics au fil des campagnes
export function progression() {
  const W = 1500, H = 560;
  const vals = [["Campagne 1", 32], ["Campagne 2", 18], ["Campagne 3", 9], ["Campagne 4", 4]];
  const base = 450, sc = 9;
  const l1 = (() => {
    let b = line(120, base, 1380, base, MUTED, { w: 2.5 });
    b += label(120, 60, "Part de l'équipe qui clique (exemple illustratif)", { size: 15, color: INK, anchor: "start", weight: 600 });
    return svg(W, H, b);
  })();
  const layers = [l1];
  vals.forEach(([t, v], i) => {
    const x = 240 + i * 300, h = v * sc;
    let b = `<rect x="${x - 70}" y="${base - h}" width="140" height="${h}" rx="12" fill="${i === 3 ? OK : C}" opacity="${0.55 + i * 0.15}"/>`;
    b += label(x, base - h - 16, `${v} %`, { size: 20, color: DARK, weight: 800 });
    b += label(x, base + 34, t, { size: 15, color: INK, weight: 600 });
    layers.push(svg(W, H, b));
  });
  return { W, H, layers };
}

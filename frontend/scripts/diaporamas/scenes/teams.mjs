// Teams — équipes, canaux, réunions.
import { icon, tile, chip, label, line, path, panel, person, svg } from "../tech.mjs";

const I = "#4F46E5", INK = "#334155", MUTED = "#94a3b8", OK = "#16a34a", DARK = "#15133A";

// Organisation : équipe → canaux → onglets
export function structure() {
  const W = 1600, H = 560;
  const l1 = (() => {
    let b = panel(40, 200, 300, 160, { r: 20, stroke: "#c7d2fe", fill: "#eef2ff" });
    b += tile("Users", 110, 280, 72, I, { solid: true });
    b += label(160, 272, "Équipe", { size: 19, color: DARK, anchor: "start", weight: 800 });
    b += label(160, 298, "« Société »", { size: 15, color: INK, anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  const chans = [["Hash", "Général"], ["Hash", "Comptabilité"], ["Hash", "Chantiers"], ["Hash", "Clients"]];
  const l2 = (() => {
    let b = "";
    chans.forEach(([ic, t], i) => {
      const y = 85 + i * 130;
      b += path(`M 340 280 C 420 280 420 ${y} 500 ${y}`, MUTED, { w: 3 });
      b += panel(500, y - 40, 300, 80, { r: 14 });
      b += tile(ic, 545, y, 50, I);
      b += label(585, y + 6, t, { size: 17, color: DARK, anchor: "start", weight: 700 });
    });
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = panel(900, 40, 660, 480, { r: 20, stroke: "#c7d2fe" });
    b += label(930, 85, "Dans le canal « Chantiers » :", { size: 17, color: DARK, anchor: "start", weight: 800 });
    const tabs = [["MessageCircle", "Conversations", "questions, décisions, historique"], ["Folder", "Fichiers", "rangés automatiquement dans SharePoint"], ["Video", "Réunions", "planifiées depuis l'agenda Outlook"], ["ListChecks", "Tâches", "qui fait quoi, pour quand"]];
    tabs.forEach(([ic, t, d], i) => {
      const y = 155 + i * 95;
      b += tile(ic, 960, y, 60, I, { solid: true });
      b += label(1010, y - 4, t, { size: 18, color: DARK, anchor: "start", weight: 700 });
      b += label(1010, y + 22, d, { size: 14, color: INK, anchor: "start", weight: 500 });
    });
    b += path("M 800 345 C 850 345 850 300 900 300", I, { w: 3, arrow: true });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

// Réunion : participants internes, distants et invité extérieur
export function reunion() {
  const W = 1000, H = 640;
  const l1 = (() => {
    let b = panel(40, 30, 920, 520, { r: 20, fill: "#1e1b4b", stroke: "#1e1b4b" });
    const cells = [[60, 50, "Bureau", "#c7d2fe"], [510, 50, "Télétravail", "#c7d2fe"], [60, 290, "Chantier (téléphone)", "#c7d2fe"]];
    for (const [x, y, t] of cells) {
      b += `<rect x="${x}" y="${y}" width="430" height="225" rx="14" fill="#312e81"/>`;
      b += person(x + 215, y + 100, 120, "#a5b4fc", "#3730a3");
      b += chip(x + 215, y + 195, t, { size: 13, bg: "#1e1b4b", color: "#e0e7ff", border: "#4338ca" });
    }
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = `<rect x="510" y="290" width="430" height="225" rx="14" fill="#312e81" stroke="#22c55e" stroke-width="4"/>`;
    b += person(725, 390, 120, "#bbf7d0", "#166534");
    b += chip(725, 485, "Client invité (sans compte)", { size: 13, bg: "#166534", color: "#ffffff", border: "#22c55e", bold: true });
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = "";
    const tools = [["Mic", 330], ["Video", 420], ["MonitorUp", 510], ["MessageSquare", 600]];
    for (const [ic, x] of tools) b += `<circle cx="${x}" cy="590" r="30" fill="#4338ca"/>` + icon(ic, x, 590, 28, "#ffffff", 2);
    b += `<circle cx="690" cy="590" r="30" fill="#dc2626"/>` + icon("PhoneOff", 690, 590, 28, "#ffffff", 2);
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

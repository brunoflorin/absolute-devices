// Supervision du parc — l'agent remonte, la console alerte, le technicien agit.
import { icon, tile, chip, label, line, path, panel, monitor, laptop, nas, svg } from "../tech.mjs";

const C = "#0891B2", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", AMB = "#d97706", OK = "#16a34a", DARK = "#083344";

// Agents → console → alertes
export function remontee() {
  const W = 1600, H = 560;
  const devices = [[150, 110, "monitor", "Poste compta"], [150, 280, "laptop", "Portable commercial"], [150, 450, "nas", "Serveur / NAS"]];
  const l1 = (() => {
    let b = "";
    for (const [x, y, k, t] of devices) {
      b += k === "monitor" ? monitor(x, y, 110, INK) : k === "laptop" ? laptop(x, y, 110, INK) : nas(x, y, 100, INK);
      b += chip(x + 110, y - 40, "agent", { size: 12, bg: C, color: "#fff", border: C, bold: true });
      b += label(x, y + 78, t, { size: 16, color: INK });
      b += path(`M ${x + 80} ${y} C 420 ${y} 440 280 560 280`, C, { w: 3, dash: "6 6", arrow: true });
    }
    b += panel(570, 120, 420, 320, { r: 22, stroke: "#a5f3fc", fill: "#ecfeff" });
    b += tile("LayoutDashboard", 640, 190, 70, C, { solid: true });
    b += label(690, 185, "Console", { size: 20, color: DARK, anchor: "start", weight: 800 });
    b += label(690, 211, "de supervision", { size: 15, color: INK, anchor: "start", weight: 500 });
    const kpis = [["Disques", "ok"], ["Mises à jour", "ok"], ["Antivirus", "ok"], ["Sauvegarde", "ok"]];
    kpis.forEach(([k], i) => (b += chip(615 + (i % 2) * 190, 300 + Math.floor(i / 2) * 70, k, { size: 15, color: DARK, border: "#a5f3fc", anchor: "start" })));
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = "";
    const al = [[140, "Disque presque plein", AMB, "HardDrive"], [280, "Sauvegarde échouée cette nuit", RED, "DatabaseBackup"], [420, "12 mises à jour en attente", AMB, "RefreshCw"]];
    for (const [y, t, c, ic] of al) {
      b += path(`M 995 280 C 1060 280 1060 ${y} 1110 ${y}`, c, { w: 3, arrow: true });
      b += panel(1120, y - 45, 450, 90, { r: 16, stroke: c === RED ? "#fecaca" : "#fde68a", fill: c === RED ? "#fff1f2" : "#fffbeb" });
      b += tile(ic, 1170, y, 54, c, { solid: true });
      b += label(1215, y + 6, t, { size: 17, color: DARK, anchor: "start", weight: 700 });
    }
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

// Avant / après : réagir après la panne ou avant
export function frise() {
  const W = 1600, H = 500;
  const l1 = (() => {
    let b = label(60, 70, "Sans supervision", { size: 19, color: RED, anchor: "start", weight: 800 });
    b += line(60, 140, 1540, 140, MUTED, { w: 3, arrow: true });
    const ev = [[200, "Disque qui faiblit", "aucun signe visible"], [620, "Panne du disque", "le poste ne démarre plus"], [1080, "Appel au support", "données à récupérer"], [1420, "Journée perdue", ""]];
    ev.forEach(([x, t, d], i) => {
      b += `<circle cx="${x}" cy="140" r="12" fill="${i === 0 ? MUTED : RED}"/>`;
      b += label(x, 185, t, { size: 15, color: DARK, weight: 700 });
      if (d) b += label(x, 210, d, { size: 13, color: INK, weight: 500 });
    });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = label(60, 300, "Avec supervision", { size: 19, color: OK, anchor: "start", weight: 800 });
    b += line(60, 370, 1540, 370, MUTED, { w: 3, arrow: true });
    const ev = [[200, "Disque qui faiblit", "détecté par l'agent"], [620, "Alerte reçue", "chez Absolute Micro"], [1080, "Remplacement planifié", "au moment choisi"], [1420, "Aucune interruption", ""]];
    ev.forEach(([x, t, d]) => {
      b += `<circle cx="${x}" cy="370" r="12" fill="${OK}"/>`;
      b += label(x, 415, t, { size: 15, color: DARK, weight: 700 });
      if (d) b += label(x, 440, d, { size: 13, color: INK, weight: 500 });
    });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

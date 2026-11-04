// Contrat de maintenance Absolute Micro — supervision proactive et circuit d'une demande.
import { icon, tile, chip, label, line, path, panel, monitor, laptop, nas, person, svg } from "../tech.mjs";

const R = "#C5161D", INK = "#334155", MUTED = "#94a3b8", OK = "#16a34a", DARK = "#231F20";

// Supervision : les postes remontent leur état, l'alerte arrive avant la panne
export function supervision() {
  const W = 1600, H = 540;
  const l1 = (() => {
    let b = "";
    const devs = [[140, 120, "pc", "Poste 1"], [140, 290, "laptop", "Portable"], [140, 460, "nas", "NAS"]];
    for (const [x, y, k, t] of devs) {
      b += k === "pc" ? monitor(x, y, 110, INK) : k === "laptop" ? laptop(x, y, 110, INK) : nas(x, y, 100, INK);
      b += label(x + 75, y + 6, t, { size: 15, color: INK, anchor: "start", weight: 600 });
    }
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = "";
    for (const y of [120, 290, 460]) b += path(`M 290 ${y} C 420 ${y} 440 270 560 270`, MUTED, { w: 2.5, dash: "6 6", arrow: true });
    b += panel(570, 140, 420, 260, { r: 20, stroke: "#fecaca" });
    b += tile("Activity", 625, 200, 64, R, { solid: true });
    b += label(670, 194, "Supervision", { size: 19, color: DARK, anchor: "start", weight: 800 });
    b += label(670, 218, "en continu", { size: 14, color: INK, anchor: "start", weight: 500 });
    const m = [["Disque", "92 %", R], ["Sauvegarde", "OK", OK], ["Antivirus", "à jour", OK], ["Mises à jour", "3 en attente", "#d97706"]];
    m.forEach(([k, v, c], i) => (b += label(600, 268 + i * 30, k, { size: 14, color: INK, anchor: "start", weight: 500 }) + label(965, 268 + i * 30, v, { size: 14, color: c, anchor: "end", weight: 800, mono: true })));
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = path("M 995 270 L 1140 270", R, { w: 4, arrow: true });
    b += chip(1068, 235, "alerte", { size: 13, bg: R, color: "#fff", border: R, bold: true });
    b += panel(1150, 150, 420, 240, { r: 20, stroke: "#fecaca", fill: "#fff7f7" });
    b += person(1215, 215, 70, R, "#fee2e2");
    b += label(1265, 208, "Technicien Absolute Micro", { size: 16, color: DARK, anchor: "start", weight: 800 });
    b += label(1265, 232, "intervient à distance", { size: 14, color: INK, anchor: "start", weight: 500 });
    b += label(1180, 300, "Disque presque plein : nettoyé", { size: 15, color: OK, anchor: "start", weight: 700 });
    b += label(1180, 330, "avant que le poste ne se bloque", { size: 14, color: INK, anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

// Circuit d'une demande d'assistance
export function circuit() {
  const W = 1600, H = 440;
  const steps = [["Phone", "Vous appelez", "ou envoyez un mail"], ["Ticket", "Demande enregistrée", "rien ne se perd"], ["MonitorSmartphone", "Prise en main à distance", "dans la plupart des cas"], ["Car", "Intervention sur site", "si nécessaire"], ["CircleCheck", "Résolu et tracé", "historique conservé"]];
  const layers = [0, 1].map((half) => {
    let b = "";
    steps.forEach(([ic, t, d], i) => {
      if ((i < 3) !== (half === 0)) return;
      const x = 150 + i * 325;
      b += tile(ic, x, 160, 100, i === 4 ? OK : R, { solid: i === 0 || i === 4 });
      b += label(x, 262, t, { size: 18, color: DARK, weight: 800 });
      b += label(x, 290, d, { size: 14, color: INK, weight: 500 });
      if (i < 4) b += line(x + 75, 160, x + 250, 160, MUTED, { w: 3, arrow: true });
    });
    return svg(W, H, b);
  });
  return { W, H, layers };
}

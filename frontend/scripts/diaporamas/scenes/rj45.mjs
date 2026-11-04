// RJ45 — câble, blindage, brassage.
import { icon, tile, chip, label, line, path, panel, switchBox, monitor, svg } from "../tech.mjs";

const C = "#475569", INK = "#334155", MUTED = "#94a3b8", OK = "#16a34a", DARK = "#1E293B";

// Coupe d'un câble : 4 paires torsadées + blindage
export function coupe() {
  const W = 1500, H = 520;
  const pairs = [["#f97316", "orange"], ["#16a34a", "vert"], ["#2563eb", "bleu"], ["#92400e", "marron"]];
  const cable = (cx, cy, shielded) => {
    let b = `<circle cx="${cx}" cy="${cy}" r="150" fill="#e2e8f0" stroke="${C}" stroke-width="4"/>`;
    if (shielded) b += `<circle cx="${cx}" cy="${cy}" r="132" fill="none" stroke="#94a3b8" stroke-width="10" stroke-dasharray="3 3"/>`;
    pairs.forEach(([c], i) => {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4, px = cx + Math.cos(a) * 62, py = cy + Math.sin(a) * 62;
      if (shielded) b += `<circle cx="${px}" cy="${py}" r="44" fill="none" stroke="#cbd5e1" stroke-width="5"/>`;
      b += `<circle cx="${px - 15}" cy="${py}" r="17" fill="${c}"/><circle cx="${px + 15}" cy="${py}" r="17" fill="#ffffff" stroke="${c}" stroke-width="6"/>`;
    });
    return b;
  };
  const l1 = (() => {
    let b = cable(260, 260, false);
    b += chip(260, 455, "Non blindé (U/UTP)", { size: 15, bold: true });
    b += label(560, 170, "4 paires torsadées", { size: 18, color: DARK, anchor: "start", weight: 800 });
    b += label(560, 200, "La torsion annule les parasites entre fils", { size: 15, color: INK, anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = cable(1230, 260, true);
    b += chip(1230, 455, "Blindé (F/FTP, S/FTP)", { size: 15, bold: true, bg: C, color: "#fff", border: C });
    b += label(560, 320, "Blindage par paire et global", { size: 18, color: DARK, anchor: "start", weight: 800 });
    b += label(560, 350, "Indispensable près de câbles électriques", { size: 15, color: INK, anchor: "start", weight: 500 });
    b += label(560, 378, "ou de machines industrielles", { size: 15, color: INK, anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

// Du bureau à la baie : prise murale → câble horizontal → panneau → cordon → switch
export function brassage() {
  const W = 1600, H = 520;
  const l1 = (() => {
    let b = monitor(110, 240, 110, INK);
    b += line(170, 240, 260, 240, MUTED, { w: 3 });
    b += `<rect x="260" y="200" width="70" height="80" rx="10" fill="#fff" stroke="${C}" stroke-width="3"/><rect x="280" y="225" width="30" height="24" rx="3" fill="#cbd5e1"/>`;
    b += chip(295, 320, "Prise murale", { size: 13, bold: true });
    b += chip(110, 320, "Cordon ≤ 5 m", { size: 13 });
    b += path("M 330 240 L 900 240", "#2563eb", { w: 6 });
    b += chip(615, 200, "Câble horizontal dans les murs : 90 m maxi", { size: 14, bold: true, color: "#1d4ed8", border: "#bfdbfe" });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = panel(900, 90, 640, 330, { r: 18, fill: "#f8fafc" });
    b += label(1220, 125, "Baie : panneau de brassage, puis switch", { size: 17, color: DARK, weight: 800 });
    b += `<rect x="940" y="160" width="560" height="60" rx="8" fill="#e2e8f0" stroke="${C}" stroke-width="2"/>`;
    for (let i = 0; i < 12; i++) b += `<rect x="${960 + i * 44}" y="178" width="30" height="24" rx="3" fill="#ffffff" stroke="${C}"/>`;
    b += switchBox(1220, 360, 520, C);
    for (let i = 0; i < 6; i++) b += path(`M ${975 + i * 88} 202 C ${975 + i * 88} 290 ${1000 + i * 88} 290 ${1000 + i * 88} 340`, ["#f97316", "#16a34a", "#2563eb", "#eab308", "#a855f7", "#ef4444"][i], { w: 3.5 });
    b += chip(1220, 455, "Cordons courts, couleur par usage", { size: 13, bold: true, bg: OK, color: "#fff", border: OK });
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = chip(480, 455, "Total d'un lien : 100 m maximum (cordons compris)", { size: 16, bg: DARK, color: "#fff", border: DARK, bold: true });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

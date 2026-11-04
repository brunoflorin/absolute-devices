// Microsoft 365 — le bureau dans le Cloud, synchronisé partout.
import { icon, tile, chip, label, line, path, panel, cloud, laptop, monitor, phone, doc, svg } from "../tech.mjs";

const B = "#2563EB", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#0B1B3F";

// Avant : tout sur un seul PC / Après : tout dans le Cloud
export function avantApres() {
  const W = 1500, H = 470;
  const l1 = (() => {
    let b = panel(20, 20, 690, 430, { r: 18, fill: "#f8fafc" });
    b += label(365, 65, "Messagerie « à l'ancienne »", { size: 18, color: INK, weight: 800 });
    b += monitor(170, 210, 170, INK);
    b += phone(330, 200, 80, MUTED, "#f1f5f9") + icon("X", 330, 198, 30, RED, 3);
    b += chip(545, 160, "boite.pst — 4,2 Go", { size: 14, mono: true });
    b += label(545, 215, "Mails rangés dans un", { size: 15, color: INK, weight: 500 });
    b += label(545, 240, "fichier, sur un seul PC", { size: 15, color: INK, weight: 500 });
    b += chip(365, 380, "PC en panne = mails perdus", { size: 15, bg: RED, color: "#fff", border: RED, bold: true });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = panel(790, 20, 690, 430, { r: 18, stroke: "#bfdbfe" });
    b += label(1135, 65, "Avec Microsoft 365", { size: 18, color: B, weight: 800 });
    b += cloud(1135, 150, 160, B, "#eff6ff");
    b += icon("Mail", 1135, 150, 38, B, 2);
    const dev = [[935, 285, "laptop"], [1135, 295, "phone"], [1335, 285, "monitor"]];
    for (const [x, y, k] of dev) {
      b += line(1135, 195, x, y - 50, B, { w: 2.5, dash: "5 5" });
      b += k === "laptop" ? laptop(x, y, 110, INK) : k === "phone" ? phone(x, y, 80, INK) : monitor(x, y, 110, INK);
    }
    b += chip(1135, 395, "Mêmes mails, agenda, contacts partout", { size: 15, bg: OK, color: "#fff", border: OK, bold: true });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

// Le « hub » : services et appareils
export function hub() {
  const W = 1600, H = 600;
  const services = [["Mail", "Exchange", "messagerie"], ["FileText", "Word, Excel…", "toujours à jour"], ["MessagesSquare", "Teams", "échanges"], ["Cloud", "OneDrive", "fichiers perso"], ["Building2", "SharePoint", "fichiers d'équipe"]];
  const l1 = (() => {
    let b = panel(560, 70, 480, 460, { r: 26, stroke: "#bfdbfe", fill: "#eff6ff" });
    b += label(800, 115, "Microsoft 365", { size: 21, color: DARK, weight: 800 });
    services.forEach(([ic, n, d], i) => {
      const y = 170 + i * 72;
      b += tile(ic, 620, y, 52, B, { solid: true });
      b += label(660, y - 2, n, { size: 16, color: DARK, anchor: "start", weight: 700 });
      b += label(660, y + 20, d, { size: 13, color: INK, anchor: "start", weight: 500 });
    });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = "";
    const left = [[230, 170, "laptop", "PC portable"], [230, 430, "monitor", "PC du bureau"]];
    const right = [[1370, 170, "phone", "Téléphone"], [1370, 430, "laptop", "Mac / tablette"]];
    for (const [x, y, k, t] of [...left, ...right]) {
      const ex = x < 800 ? 560 : 1040;
      b += path(`M ${x < 800 ? x + 80 : x - 80} ${y} C ${(x + ex) / 2} ${y} ${(x + ex) / 2} 300 ${ex} 300`, B, { w: 3, dash: "6 6" });
      b += k === "laptop" ? laptop(x, y, 130, INK) : k === "phone" ? phone(x, y, 100, INK) : monitor(x, y, 130, INK);
      b += label(x, y + 85, t, { size: 14, color: INK });
    }
    b += chip(800, 565, "Synchronisé en permanence, chiffré, sauvegardé par Microsoft", { size: 13, color: DARK, border: "#bfdbfe" });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

// Scènes du diaporama Pare-feu & VPN — métaphore : le poste de contrôle à l'entrée du bureau.
import { E, badge, blob, flow, tube, glow, card, appliance, svg } from "../art.mjs";

const R = "#C5161D", R2 = "#ef4444", NAVY = "#0b1530", OK = "#16a34a";

// Couverture : le bureau sous un bouclier, les menaces rebondissent
export function cover() {
  let b = "";
  b += glow(500, 420, 420, "#ffffff", 0.18);
  b += blob(500, 640, 400, 90, "#1e2b52", "#0b1530", 1, 2);
  // dôme de protection
  b += `<path d="M 170 640 A 330 360 0 0 1 830 640" fill="${R}" fill-opacity="0.16" stroke="${R2}" stroke-width="8"/>`;
  b += `<path d="M 215 640 A 285 315 0 0 1 785 640" fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="3" stroke-dasharray="4 14"/>`;
  b += E("office-building", 500, 470, 330);
  b += E("shield", 500, 225, 150);
  b += glow(500, 225, 140, R2, 0.55);
  // menaces repoussées
  const m = [["microbe", 120, 250, -15], ["skull", 880, 290, 12], ["robot", 110, 520, 0], ["alien-monster", 890, 560, -10]];
  for (const [n, x, y, r] of m) {
    b += E(n, x, y, 110, { r, o: 0.9 });
    const tx = x < 500 ? x + 75 : x - 75;
    b += flow(`M ${tx} ${y} q ${x < 500 ? 40 : -40} -40 ${x < 500 ? 10 : -10} -80`, "#ffffff", { w: 5, dash: "2 12", op: 0.6 });
  }
  b += badge("check-mark-button", 700, 600, 44, "#ffffff");
  return svg(1000, 760, b);
}

// La box seule : tout entre
export function boxSeule() {
  let b = "";
  b += blob(520, 330, 470, 270, "#fff1f2", "#ffe4e6", 1, 1);
  b += E("globe-showing-europe-africa", 130, 300, 170);
  b += E("satellite-antenna", 420, 330, 150);
  b += E("office-building", 790, 300, 260);
  b += flow("M 220 300 C 300 300 330 320 370 325", "#94a3b8", { w: 8 });
  b += flow("M 480 325 C 560 320 600 310 650 305", "#94a3b8", { w: 8 });
  const intrus = [["microbe", 300, 170], ["skull", 470, 150], ["robot", 600, 190], ["fishing-pole", 560, 470]];
  for (const [n, x, y] of intrus) {
    b += E(n, x, y, 88, { r: -8 });
    b += flow(`M ${x + 40} ${y + 20} Q ${(x + 700) / 2} ${y - 30} 690 ${y < 300 ? 250 : 360}`, R2, { w: 5, dash: "3 11" });
  }
  b += badge("warning", 900, 120, 46, "#fff7ed");
  return svg(1040, 600, b);
}

// Le poste de contrôle : tri du trafic
export function controle() {
  let b = "";
  b += blob(800, 330, 760, 260, "#f8fafc", "#eef2f7", 1, 3);
  // flux entrant (gauche)
  const entrants = [["envelope", 110, 180], ["microbe", 230, 300], ["package", 100, 400], ["skull", 250, 470], ["page-facing-up", 190, 120]];
  for (const [n, x, y] of entrants) b += E(n, x, y, 96);
  b += flow("M 330 300 L 560 300", "#64748b", { w: 10 });
  // le contrôle (centre)
  b += glow(800, 300, 300, R, 0.22);
  b += card(620, 110, 360, 380, { fill: "#ffffff", r: 40 });
  b += appliance(660, 330, 280);
  b += E("shield", 800, 215, 150);
  b += E("guard", 940, 150, 110);
  // rejets
  b += flow("M 800 500 Q 800 560 760 590", R2, { w: 7, dash: "3 12" });
  b += E("wastebasket", 720, 600, 110);
  b += E("microbe", 690, 545, 56, { r: 25, o: 0.9, shadow: false });
  b += E("skull", 760, 540, 50, { r: -20, o: 0.9, shadow: false });
  // flux autorisé (droite)
  b += flow("M 1010 300 L 1230 300", OK, { w: 10 });
  const sortants = [["envelope", 1290, 210], ["package", 1300, 400], ["page-facing-up", 1400, 300]];
  for (const [n, x, y] of sortants) b += E(n, x, y, 90);
  b += E("laptop", 1510, 300, 150);
  b += badge("check-mark-button", 1560, 200, 34, "#ffffff");
  return svg(1600, 660, b);
}

// Le VPN : tunnel privé maison -> bureau
export function vpn() {
  let b = "";
  b += blob(800, 320, 760, 250, "#fef2f2", "#fff7ed", 1, 4);
  b += E("house-with-garden", 220, 330, 230);
  b += E("woman-technologist", 330, 440, 120);
  b += E("office-building", 1370, 300, 260);
  b += tube("M 340 300 C 600 140 1000 140 1240 290", "#fca5a5", R, 60);
  for (const t of [0.3, 0.55, 0.78]) {
    const x = 340 + (1240 - 340) * t, y = 300 - Math.sin(Math.PI * t) * 150;
    b += badge("locked", x, y - 4, 30, "#ffffff", { ring: R });
  }
  // espion bloqué
  b += E("detective", 800, 520, 140);
  b += badge("no-entry", 880, 450, 36, "#ffffff");
  b += flow("M 800 445 L 800 330", "#94a3b8", { w: 5, dash: "3 10", arrow: false });
  return svg(1600, 640, b);
}

// Licence : boîtier seul vs boîtier + licence
export function licence() {
  let b = "";
  b += blob(390, 320, 360, 250, "#f1f5f9", "#e2e8f0", 1, 5);
  b += blob(1210, 320, 360, 250, "#fff1f2", "#ffe4e6", 1, 6);
  // seul
  b += appliance(240, 300, 300, { body1: "#64748b", body2: "#334155", led: "#f59e0b", led2: "#475569" });
  for (const [n, x] of [["hourglass-done", 270], ["bell-with-slash", 390], ["electric-plug", 510]]) b += E(n, x, 190, 86, { o: 0.75 });
  b += E("spider-web", 520, 300, 80, { o: 0.55, shadow: false });
  // plus
  b += badge("plus", 800, 340, 52, R);
  // avec licence
  b += appliance(1060, 300, 300, {});
  b += glow(1210, 330, 260, R2, 0.25);
  for (const [n, x] of [["counterclockwise-arrows-button", 1080], ["books", 1210], ["headphone", 1340]]) {
    b += flow(`M ${x} 238 L ${1210 + (x - 1210) * 0.5} 292`, R, { w: 4, dash: "2 9", arrow: false });
    b += badge(n, x, 190, 50, "#ffffff", { ring: R });
  }
  b += badge("check-mark-button", 1380, 420, 34, "#ffffff");
  return svg(1600, 600, b);
}

export const PICTOS = {}; // pictos simples rendus par le moteur générique

// Pare-feu & VPN — schémas techniques en calques (chaque calque apparaît au clic dans PowerPoint).
import { icon, tile, chip, label, line, path, panel, grid, glow, appliance, router, cloud, laptop, monitor, switchBox, packet, svg } from "../tech.mjs";

const R = "#C5161D", NAVY = "#0B1530", INK = "#334155", OK = "#16a34a", RED = "#dc2626", MUTED = "#94a3b8";

// ---------- Couverture : vue « blueprint »
export function cover() {
  const W = 1000, H = 760;
  let b = grid(W, H, "#93c5fd", 0.10, 36);
  b += glow(520, 380, 380, R, 0.28);
  // Internet
  b += cloud(150, 200, 170, "#93c5fd", "#13224a");
  b += icon("Globe", 150, 195, 46, "#93c5fd", 1.6);
  // flux entrants (mélange menaces / sains)
  const ins = [[230, 250, RED], [250, 300, "#93c5fd"], [235, 350, RED], [255, 400, "#93c5fd"]];
  for (const [x, y, c] of ins) b += path(`M ${x} ${y} C 330 ${y} 330 380 395 380`, c, { w: 3, dash: c === RED ? "6 8" : "", op: 0.9 });
  // le pare-feu
  b += appliance(395, 345, 250, { accent: R });
  b += `<path d="M 520 190 l 70 26 v 54 c 0 46 -32 74 -70 88 c -38 -14 -70 -42 -70 -88 v -54 z" fill="${R}" fill-opacity="0.18" stroke="${R}" stroke-width="3"/>`;
  b += icon("ShieldCheck", 520, 262, 64, "#ffffff", 1.8);
  // bloqués
  b += path("M 470 440 Q 470 520 420 560", RED, { w: 3, dash: "6 8", arrow: true });
  b += `<circle cx="405" cy="575" r="22" fill="${RED}"/>` + icon("X", 405, 575, 26, "#ffffff", 3);
  // LAN
  b += path("M 645 380 C 720 380 720 250 790 250", "#22c55e", { w: 3 });
  b += path("M 645 380 L 790 380", "#22c55e", { w: 3 });
  b += path("M 645 380 C 720 380 720 510 790 510", "#22c55e", { w: 3 });
  for (const y of [250, 380, 510]) b += monitor(840, y, 90, "#93c5fd", "#1e3a8a");
  return { W, H, layers: [svg(W, H, b)] };
}

// ---------- La box seule : ports ouverts, scans
export function boxSeule() {
  const W = 1100, H = 620;
  const base = (() => {
    let b = "";
    b += cloud(130, 330, 190, MUTED);
    b += label(130, 340, "Internet", { size: 18, color: INK });
    b += line(225, 330, 380, 330, MUTED, { w: 4 });
    b += router(450, 340, 130, INK);
    b += line(520, 330, 650, 330, MUTED, { w: 4 });
    b += switchBox(720, 330, 140, INK);
    for (const [y, i] of [[170, 1], [330, 2], [490, 3]]) {
      b += line(790, 330, 900, y, MUTED, { w: 3 });
      b += monitor(960, y, 100, INK);
    }
    b += chip(450, 420, "Box opérateur", { size: 15, bold: true });
    b += chip(720, 400, "Réseau local", { size: 14 });
    return svg(W, H, b);
  })();
  const scans = (() => {
    let b = "";
    const ips = [["185.220.101.4", 90], ["45.95.147.12", 150], ["103.77.18.9", 210]];
    for (const [ip, y] of ips) {
      b += path(`M 300 ${y} C 380 ${y} 420 ${y + 60} 440 270`, RED, { w: 2.5, dash: "5 7", arrow: true });
      b += chip(200, y, ip, { mono: true, size: 14, color: RED, border: "#fecaca", bg: "#fff1f2" });
    }
    const ports = [["22  SSH", 330, 255], ["3389  RDP", 450, 230], ["445  SMB", 570, 255]];
    for (const [t, x, y] of ports) b += chip(x, y, t, { mono: true, size: 14, bold: true, bg: RED, color: "#ffffff", border: RED });
    return svg(W, H, b);
  })();
  const silence = (() => {
    let b = panel(560, 470, 270, 92, { r: 16, stroke: "#fde68a", fill: "#fffbeb" });
    b += tile("BellOff", 610, 516, 52, "#d97706");
    b += label(650, 509, "Aucun journal", { size: 17, color: "#92400e", anchor: "start", weight: 700 });
    b += label(650, 533, "Aucune alerte", { size: 15, color: "#92400e", anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  return { W, H, layers: [base, scans, silence] };
}

// ---------- Le contrôle : paquet → règles → décision
export function controle() {
  const W = 1600, H = 640;
  const l1 = (() => {
    let b = packet(40, 140, 330, [["Source", "185.220.101.4", true], ["Destination", "82.64.12.30"], ["Port", "3389 (RDP)", true], ["Contenu", "à inspecter"]], { accent: NAVY, title: "Paquet entrant" });
    b += line(380, 240, 520, 240, INK, { w: 4, arrow: true });
    b += appliance(530, 205, 300, { accent: R });
    b += chip(680, 175, "Pare-feu", { size: 15, bold: true });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = panel(470, 360, 420, 230, { r: 16 });
    b += label(495, 392, "Table de règles", { size: 16, color: NAVY, anchor: "start", weight: 700 });
    const cols = [495, 535, 700, 775];
    ["#", "Flux", "Port", "Action"].forEach((h, i) => (b += label(cols[i], 422, h, { size: 13, color: MUTED, anchor: "start", weight: 700 })));
    const rows = [["1", "LAN → Internet", "443", "AUTORISER", OK], ["2", "Internet → LAN", "3389", "BLOQUER", RED], ["3", "Tout le reste", "*", "BLOQUER", RED]];
    rows.forEach(([n, f, p, a, c], i) => {
      const y = 455 + i * 42;
      if (i === 1) b += `<rect x="482" y="${y - 24}" width="396" height="36" rx="8" fill="#fee2e2"/>`;
      b += label(cols[0], y, n, { size: 14, color: INK, anchor: "start", weight: 600 });
      b += label(cols[1], y, f, { size: 14, color: INK, anchor: "start", weight: 500 });
      b += label(cols[2], y, p, { size: 14, color: INK, anchor: "start", weight: 600, mono: true });
      b += label(cols[3], y, a, { size: 13, color: c, anchor: "start", weight: 800 });
    });
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = "";
    // bloqué
    b += path("M 840 240 C 960 240 980 120 1080 120", RED, { w: 3, dash: "6 7", arrow: true });
    b += panel(1090, 70, 340, 100, { r: 16, stroke: "#fecaca", fill: "#fff1f2" });
    b += tile("Ban", 1135, 120, 54, RED, { solid: true });
    b += label(1175, 112, "Bloqué", { size: 18, color: RED, anchor: "start", weight: 800 });
    b += label(1175, 137, "+ inscrit au journal", { size: 14, color: "#7f1d1d", anchor: "start", weight: 500 });
    // autorisé
    b += path("M 840 260 C 960 260 980 400 1080 400", OK, { w: 4, arrow: true });
    b += panel(1090, 330, 360, 140, { r: 16, stroke: "#bbf7d0", fill: "#f0fdf4" });
    b += label(1110, 360, "Autre paquet : port 443", { size: 14, color: "#14532d", anchor: "start", weight: 600 });
    b += tile("CircleCheck", 1135, 415, 54, OK, { solid: true });
    b += label(1175, 422, "Autorisé, puis analysé", { size: 16, color: OK, anchor: "start", weight: 800 });
    b += line(1460, 400, 1520, 400, OK, { w: 4, arrow: true });
    b += monitor(1590, 400, 110, INK);
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

// ---------- Le VPN : en clair vs chiffré
export function vpn() {
  const W = 1600, H = 600;
  const base = (() => {
    let b = laptop(160, 300, 170, INK);
    b += chip(160, 390, "Wi-Fi de l'hôtel", { size: 14 });
    b += cloud(800, 300, 200, MUTED);
    b += label(800, 310, "Internet", { size: 18, color: INK });
    b += appliance(1250, 275, 230, { accent: R });
    b += chip(1365, 350, "Pare-feu du bureau", { size: 14, bold: true });
    b += line(1480, 300, 1530, 300, INK, { w: 3 });
    b += tile("Server", 1560, 300, 56, INK);
    return svg(W, H, b);
  })();
  const clair = (() => {
    let b = path("M 260 300 L 690 300", MUTED, { w: 4, arrow: true });
    b += tile("Eye", 470, 140, 62, RED, { solid: true });
    b += path("M 470 175 L 470 285", RED, { w: 2.5, dash: "4 6" });
    b += panel(520, 100, 330, 80, { r: 14, stroke: "#fecaca", fill: "#fff1f2" });
    b += label(540, 130, "Sans VPN, l'espion lit :", { size: 13, color: "#7f1d1d", anchor: "start", weight: 600 });
    b += label(540, 160, "« Voici notre nouveau RIB »", { size: 15, color: RED, anchor: "start", weight: 700 });
    return svg(W, H, b);
  })();
  const tunnel = (() => {
    let b = `<path d="M 255 300 C 600 470 1000 470 1245 300" fill="none" stroke="${R}" stroke-opacity="0.15" stroke-width="58" stroke-linecap="round"/>`;
    b += path("M 255 300 C 600 470 1000 470 1245 300", R, { w: 5, arrow: true });
    b += `<circle cx="750" cy="427" r="30" fill="${R}"/>` + icon("Lock", 750, 427, 32, "#ffffff", 2.2);
    b += panel(560, 495, 390, 80, { r: 14, stroke: "#fecaca" });
    b += label(580, 525, "Avec VPN, l'espion ne voit que :", { size: 13, color: INK, anchor: "start", weight: 600 });
    b += label(580, 555, "8f3a 91c2 e07b 4d1f a9…", { size: 16, color: NAVY, anchor: "start", weight: 700, mono: true });
    return svg(W, H, b);
  })();
  return { W, H, layers: [base, clair, tunnel] };
}

// ---------- Licence : la base de menaces évolue chaque jour
export function licence() {
  const W = 1600, H = 560;
  const l1 = (() => {
    let b = line(90, 90, 1510, 90, MUTED, { w: 3, arrow: true });
    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
    days.forEach((d, i) => {
      const x = 200 + i * 290;
      b += `<circle cx="${x}" cy="90" r="9" fill="${NAVY}"/>`;
      b += label(x, 60, d, { size: 15, color: INK });
      b += chip(x, 135, `+${[312, 287, 401, 356, 298][i]} menaces`, { size: 13, color: RED, border: "#fecaca", bg: "#fff1f2", mono: true });
    });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = panel(80, 210, 640, 300, { r: 20, fill: "#f8fafc" });
    b += label(110, 250, "Sans licence", { size: 20, color: INK, anchor: "start", weight: 800 });
    b += appliance(150, 300, 300, { dim: true });
    b += tile("Snowflake", 560, 330, 64, "#64748b");
    b += label(110, 440, "Protections figées au jour de l'expiration", { size: 15, color: INK, anchor: "start", weight: 500 });
    b += label(110, 470, "Pas de correctifs, pas d'assistance", { size: 15, color: INK, anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = panel(880, 210, 640, 300, { r: 20, stroke: "#fecaca" });
    b += label(910, 250, "Avec licence", { size: 20, color: R, anchor: "start", weight: 800 });
    b += appliance(950, 330, 300, { accent: R });
    const feeds = [["Signatures", 1080], ["Sites dangereux", 1230], ["Correctifs", 1380]];
    for (const [t, x] of feeds) {
      b += line(x, 300, x - (x - 1100) * 0.35, 328, R, { w: 2.5, dash: "4 5", arrow: true });
      b += chip(x, 285, t, { size: 13, bg: R, color: "#ffffff", border: R, bold: true });
    }
    b += label(910, 440, "Mises à jour plusieurs fois par jour", { size: 15, color: INK, anchor: "start", weight: 500 });
    b += label(910, 470, "Assistance et garantie du constructeur", { size: 15, color: INK, anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

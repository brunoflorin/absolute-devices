// Antispam & double authentification — le tri du courrier et la deuxième serrure.
import { icon, tile, chip, label, line, path, panel, laptop, phone, person, ring, svg } from "../tech.mjs";

const O = "#EA580C", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#2A1305";

// Anatomie d'un mail d'hameçonnage
export function phishing() {
  const W = 980, H = 620;
  const l1 = (() => {
    let b = panel(40, 40, 620, 540, { r: 18 });
    b += `<rect x="40" y="40" width="620" height="54" rx="18" fill="#f8fafc"/><rect x="40" y="76" width="620" height="18" fill="#f8fafc"/>`;
    for (const [c, x] of [["#f87171", 70], ["#fbbf24", 92], ["#34d399", 114]]) b += `<circle cx="${x}" cy="67" r="7" fill="${c}"/>`;
    b += label(70, 130, "De :", { size: 14, color: MUTED, anchor: "start" });
    b += label(115, 130, "Service Client <support@micros0ft-securite.com>", { size: 14, color: INK, anchor: "start", weight: 600 });
    b += label(70, 162, "Objet :", { size: 14, color: MUTED, anchor: "start" });
    b += label(135, 162, "URGENT : votre compte sera suspendu sous 24 h", { size: 14, color: INK, anchor: "start", weight: 700 });
    b += line(70, 185, 630, 185, "#e2e8f0", { w: 1.5 });
    const body = ["Bonjour,", "Une activité inhabituelle a été détectée sur", "votre messagerie. Pour éviter la suspension,", "confirmez votre identité dès maintenant :"];
    body.forEach((t, i) => (b += label(70, 222 + i * 28, t, { size: 14, color: INK, anchor: "start", weight: 400 })));
    b += `<rect x="70" y="345" width="250" height="46" rx="10" fill="#2563eb"/>`;
    b += label(195, 374, "Vérifier mon compte", { size: 15, color: "#ffffff", weight: 700 });
    b += label(70, 430, "Cordialement, l'équipe sécurité", { size: 14, color: INK, anchor: "start", weight: 400 });
    b += panel(70, 470, 560, 70, { r: 10, fill: "#f8fafc", shadow: false });
    b += icon("Paperclip", 98, 505, 22, INK);
    b += label(120, 511, "Facture_impayee.pdf.exe", { size: 14, color: INK, anchor: "start", mono: true, weight: 600 });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = "";
    const flags = [
      [128, "Domaine imité : un zéro à la place du « o »"],
      [162, "Urgence et menace : pression pour agir vite"],
      [368, "Le lien mène vers un faux site de connexion"],
      [505, "Double extension : c'est un programme"],
    ];
    flags.forEach(([y, t], i) => {
      b += `<circle cx="690" cy="${y - 5}" r="15" fill="${RED}"/>` + label(690, y + 1, String(i + 1), { size: 13, color: "#fff", weight: 800 });
      b += label(715, y + 1, t, { size: 13, color: RED, anchor: "start", weight: 700 });
    });
    b += line(255, 140, 560, 140, RED, { w: 3 });
    b += line(135, 172, 560, 172, RED, { w: 3 });
    b += `<rect x="64" y="338" width="262" height="60" rx="12" fill="none" stroke="${RED}" stroke-width="3" stroke-dasharray="6 5"/>`;
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

// Le trajet d'un mail à travers le filtre
export function tri() {
  const W = 1600, H = 560;
  const l1 = (() => {
    let b = "";
    const senders = [[110, 110, "Fournisseur", OK], [110, 250, "Publicité", "#d97706"], [110, 390, "Pirate", RED]];
    for (const [x, y, t, c] of senders) {
      b += tile("Mail", x, y, 70, c);
      b += label(x, y + 58, t, { size: 14, color: INK });
      b += path(`M ${x + 45} ${y} C 300 ${y} 330 250 430 250`, MUTED, { w: 3, arrow: true });
    }
    b += panel(440, 160, 300, 180, { r: 20, stroke: "#fed7aa", fill: "#fff7ed" });
    b += tile("Filter", 520, 250, 80, O, { solid: true });
    b += label(575, 230, "Filtre", { size: 18, color: DARK, anchor: "start", weight: 800 });
    b += label(575, 256, "antispam", { size: 18, color: DARK, anchor: "start", weight: 800 });
    b += label(575, 285, "dans le Cloud", { size: 13, color: INK, anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = "";
    const checks = ["Réputation de l'expéditeur", "Authenticité du domaine", "Liens analysés au clic", "Pièces jointes ouvertes à l'écart"];
    checks.forEach((t, i) => (b += chip(590, 390 + i * 40, t, { size: 13, color: DARK, border: "#fed7aa", bg: "#ffffff" })));
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = "";
    const outs = [[110, "Boîte de réception", "Inbox", OK], [250, "Dossier publicités", "Newspaper", "#d97706"], [390, "Quarantaine", "ShieldAlert", RED]];
    for (const [y, t, ic, c] of outs) {
      b += path(`M 745 250 C 860 250 880 ${y} 1000 ${y}`, c, { w: 3.5, arrow: true });
      b += tile(ic, 1050, y, 70, c, { solid: true });
      b += label(1100, y + 6, t, { size: 17, color: DARK, anchor: "start", weight: 700 });
    }
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

// Double authentification : le mot de passe ne suffit plus
export function mfa() {
  const W = 1600, H = 560;
  const l1 = (() => {
    let b = person(130, 150, 110, "#64748b");
    b += label(130, 230, "Vous", { size: 15, color: INK, weight: 700 });
    b += chip(390, 150, "mot de passe ✓", { size: 14, mono: true, bg: "#f0fdf4", color: OK, border: "#bbf7d0", bold: true });
    b += line(195, 150, 300, 150, MUTED, { w: 3 }) + line(485, 150, 620, 150, MUTED, { w: 3, arrow: true });
    b += phone(700, 150, 120, INK, "#dcfce7");
    b += icon("Check", 700, 145, 44, OK, 3);
    b += line(760, 150, 900, 150, OK, { w: 4, arrow: true });
    b += tile("Mail", 970, 150, 84, "#2563eb", { solid: true });
    b += label(1030, 140, "Accès accordé", { size: 18, color: OK, anchor: "start", weight: 800 });
    b += label(1030, 166, "à la messagerie", { size: 14, color: INK, anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = person(130, 400, 110, "#7f1d1d", "#fee2e2");
    b += label(130, 480, "Pirate", { size: 15, color: RED, weight: 700 });
    b += chip(390, 400, "mot de passe volé", { size: 14, mono: true, bg: "#fff1f2", color: RED, border: "#fecaca", bold: true });
    b += line(195, 400, 280, 400, MUTED, { w: 3 }) + line(500, 400, 620, 400, MUTED, { w: 3, arrow: true });
    b += phone(700, 400, 120, RED, "#fee2e2");
    b += icon("X", 700, 395, 44, RED, 3);
    b += line(760, 400, 900, 400, RED, { w: 4, dash: "6 6" });
    b += tile("Ban", 970, 400, 84, RED, { solid: true });
    b += label(1030, 390, "Bloqué", { size: 18, color: RED, anchor: "start", weight: 800 });
    b += label(1030, 416, "il n'a pas votre téléphone", { size: 14, color: INK, anchor: "start", weight: 500 });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

// Illustrations « scène » en SVG (style plat) : le bureau du client, menacé ou protégé.
import { iconSvg } from "./schemas.mjs";

const FONT = "Segoe UI, Arial, Helvetica, sans-serif";
function ic(name, color, cx, cy, size, stroke = 2) {
  return iconSvg(name, color, size, stroke).replace("<svg ", `<svg x="${cx - size / 2}" y="${cy - size / 2}" `);
}

function batiment(x, y, couleur) {
  let s = "";
  // sol
  s += `<ellipse cx="${x + 170}" cy="${y + 330}" rx="290" ry="34" fill="#e2e8f0"/>`;
  // arbre
  s += `<rect x="${x - 70}" y="${y + 230}" width="14" height="95" rx="5" fill="#a16207"/>`;
  s += `<circle cx="${x - 63}" cy="${y + 215}" r="48" fill="#4ade80"/><circle cx="${x - 85}" cy="${y + 240}" r="30" fill="#22c55e"/>`;
  // corps
  s += `<rect x="${x}" y="${y + 60}" width="340" height="265" rx="10" fill="#f1f5f9" stroke="#334155" stroke-width="5"/>`;
  s += `<path d="M ${x - 18} ${y + 70} L ${x + 170} ${y - 15} L ${x + 358} ${y + 70} Z" fill="#334155"/>`;
  s += `<rect x="${x + 110}" y="${y + 18}" width="120" height="34" rx="6" fill="#fff" stroke="${couleur}" stroke-width="3"/>`;
  s += `<text x="${x + 170}" y="${y + 42}" font-size="18" font-weight="800" fill="${couleur}" text-anchor="middle" font-family="${FONT}">BUREAU</text>`;
  // fenêtres avec personnes à leur poste
  const fen = [[30, 95], [130, 95], [230, 95], [30, 195], [230, 195]];
  for (const [fx, fy] of fen) {
    s += `<rect x="${x + fx}" y="${y + fy}" width="80" height="70" rx="6" fill="#bae6fd" stroke="#334155" stroke-width="4"/>`;
    s += `<circle cx="${x + fx + 28}" cy="${y + fy + 30}" r="10" fill="#334155"/>`;
    s += `<path d="M ${x + fx + 12} ${y + fy + 66} Q ${x + fx + 28} ${y + fy + 38} ${x + fx + 44} ${y + fy + 66} Z" fill="#334155"/>`;
    s += `<rect x="${x + fx + 46}" y="${y + fy + 36}" width="26" height="18" rx="2" fill="#1e293b"/><rect x="${x + fx + 49}" y="${y + fy + 39}" width="20" height="12" fill="#38bdf8"/>`;
  }
  // porte
  s += `<rect x="${x + 135}" y="${y + 225}" width="70" height="100" rx="6" fill="${couleur}"/>`;
  s += `<circle cx="${x + 193}" cy="${y + 278}" r="5" fill="#fff"/>`;
  return s;
}

const MENACES = [["Bug", 70, 60], ["MailWarning", 610, 70], ["Skull", 640, 300], ["Lock", 40, 330]];

// mode : "menace" (attaques qui arrivent) ou "protege" (bouclier, attaques repoussées)
export function sceneSvg(mode, couleur, outil) {
  const W = 700, H = 470, bx = 180, by = 100;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${FONT}">`;
  s += `<defs><marker id="ar" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#dc2626"/></marker></defs>`;
  // ciel
  s += `<circle cx="600" cy="0" r="0"/>`;
  s += `<g opacity="0.9"><ellipse cx="130" cy="40" rx="55" ry="18" fill="#f1f5f9"/><ellipse cx="560" cy="200" rx="45" ry="14" fill="#f1f5f9"/></g>`;
  const cx = bx + 170, cy = by + 170;
  if (mode === "protege") {
    s += `<path d="M ${bx - 60} ${by + 330} A 240 230 0 0 1 ${bx + 400} ${by + 330}" fill="${couleur}" fill-opacity="0.10" stroke="${couleur}" stroke-width="7" stroke-dasharray="2 0"/>`;
  }
  s += batiment(bx, by, couleur);
  for (const [name, mx, my] of MENACES) {
    if (mode === "menace") {
      const dx = cx - mx, dy = cy - my, d = Math.hypot(dx, dy);
      const ex = mx + dx * (1 - 150 / d), ey = my + dy * (1 - 150 / d);
      s += `<line x1="${mx + dx * 40 / d}" y1="${my + dy * 40 / d}" x2="${ex}" y2="${ey}" stroke="#dc2626" stroke-width="4" stroke-dasharray="9 7" marker-end="url(#ar)"/>`;
      s += `<circle cx="${mx}" cy="${my}" r="34" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/>`;
      s += ic(name, "#dc2626", mx, my, 38);
    } else {
      s += `<g opacity="0.55"><circle cx="${mx}" cy="${my}" r="30" fill="#f1f5f9" stroke="#94a3b8" stroke-width="3"/>`;
      s += ic(name, "#94a3b8", mx, my, 32) + `</g>`;
      s += `<circle cx="${mx + 24}" cy="${my - 24}" r="14" fill="#dc2626"/>`;
      s += ic("X", "#ffffff", mx + 24, my - 24, 18, 3);
    }
  }
  if (mode === "protege") {
    // l'outil, en médaillon au sommet du bouclier
    s += `<circle cx="${cx}" cy="${by - 55}" r="46" fill="${couleur}" stroke="#fff" stroke-width="6"/>`;
    s += ic(outil, "#ffffff", cx, by - 55, 48);
    s += `<circle cx="${bx + 330}" cy="${by + 300}" r="24" fill="#16a34a" stroke="#fff" stroke-width="4"/>`;
    s += ic("Check", "#ffffff", bx + 330, by + 300, 28, 3);
  } else {
    s += `<circle cx="${bx + 330}" cy="${by + 300}" r="24" fill="#dc2626" stroke="#fff" stroke-width="4"/>`;
    s += ic("TriangleAlert", "#ffffff", bx + 330, by + 299, 26, 3);
  }
  return s + "</svg>";
}

// Illustration « boîtier + licence » : le boîtier seul (vide) vs le boîtier avec son abonnement (services actifs)
export function licenceSvg(couleur) {
  const W = 1200, H = 420;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${FONT}">`;
  const boitier = (x, y, actif) => {
    let b = `<rect x="${x}" y="${y}" width="300" height="90" rx="14" fill="${actif ? "#1e293b" : "#475569"}"/>`;
    for (let i = 0; i < 6; i++) b += `<rect x="${x + 22 + i * 30}" y="${y + 50}" width="20" height="16" rx="3" fill="#0f172a"/>`;
    b += `<circle cx="${x + 245}" cy="${y + 30}" r="9" fill="${actif ? "#22c55e" : "#f59e0b"}"/>`;
    b += `<circle cx="${x + 270}" cy="${y + 30}" r="9" fill="${actif ? "#22c55e" : "#64748b"}"/>`;
    b += ic("BrickWall", "#ffffff", x + 40, y + 28, 30);
    return b;
  };
  // gauche : boîtier seul
  s += `<text x="300" y="40" font-size="28" font-weight="800" fill="#475569" text-anchor="middle">Le boîtier seul</text>`;
  s += boitier(150, 150, false);
  s += `<g>`;
  [["CloudOff", 120], ["ShieldOff", 300], ["Clock", 480]].forEach(([n, x]) => {
    s += `<circle cx="${x}" cy="90" r="30" fill="#f1f5f9" stroke="#94a3b8" stroke-width="3"/>` + ic(n, "#94a3b8", x, 90, 30);
  });
  s += `</g>`;
  s += `<text x="300" y="300" font-size="22" fill="#475569" text-anchor="middle">Il route le trafic, mais ne reconnaît</text>`;
  s += `<text x="300" y="330" font-size="22" fill="#475569" text-anchor="middle">plus les nouvelles menaces</text>`;
  // signe +
  s += `<circle cx="600" cy="195" r="34" fill="${couleur}"/>`;
  s += ic("Plus", "#ffffff", 600, 195, 40, 3);
  // droite : boîtier + licence
  s += `<text x="900" y="40" font-size="28" font-weight="800" fill="${couleur}" text-anchor="middle">Le boîtier + sa licence</text>`;
  s += boitier(750, 150, true);
  [["CloudDownload", 720], ["ShieldCheck", 900], ["Headset", 1080]].forEach(([n, x]) => {
    s += `<line x1="${x}" y1="122" x2="${900 + (x - 900) * 0.4}" y2="150" stroke="${couleur}" stroke-width="4" stroke-dasharray="6 5"/>`;
    s += `<circle cx="${x}" cy="90" r="30" fill="${couleur}"/>` + ic(n, "#ffffff", x, 90, 30);
  });
  s += `<text x="900" y="300" font-size="22" fill="#1e293b" text-anchor="middle">Mises à jour quotidiennes, filtres actifs,</text>`;
  s += `<text x="900" y="330" font-size="22" fill="#1e293b" text-anchor="middle">assistance et remplacement en cas de panne</text>`;
  return s + "</svg>";
}

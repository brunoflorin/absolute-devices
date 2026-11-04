// LAN / WAN / mode bridge — adresses, NAT, double NAT.
import { icon, tile, chip, label, line, path, panel, cloud, router, monitor, laptop, appliance, svg } from "../tech.mjs";

const C = "#92400E", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#3B1A06";

// LAN / WAN et NAT
export function nat() {
  const W = 1600, H = 520;
  const l1 = (() => {
    let b = panel(30, 40, 700, 440, { r: 20, fill: "#fffbeb", stroke: "#fde68a" });
    b += label(60, 82, "LAN : réseau local (privé)", { size: 18, color: DARK, anchor: "start", weight: 800 });
    const pcs = [[150, 200, "192.168.1.10"], [150, 380, "192.168.1.11"], [420, 290, "192.168.1.12"]];
    for (const [x, y, ip] of pcs) {
      b += monitor(x, y, 100, INK);
      b += chip(x, y + 70, ip, { size: 13, mono: true });
      b += line(x + 55, y, 640, 290, MUTED, { w: 2.5 });
    }
    b += router(700, 300, 130, INK);
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = chip(700, 390, "NAT", { size: 16, bg: C, color: "#fff", border: C, bold: true });
    b += path("M 770 290 L 1060 290", C, { w: 4, arrow: true });
    b += chip(915, 250, "une seule adresse publique", { size: 13, color: C, border: "#fde68a" });
    b += chip(915, 330, "82.64.12.30", { size: 14, mono: true, bold: true, color: DARK });
    b += cloud(1300, 290, 260, MUTED);
    b += label(1300, 280, "WAN : Internet", { size: 18, color: INK, weight: 800 });
    b += label(1300, 306, "(réseau public)", { size: 14, color: INK, weight: 500 });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2] };
}

// Double NAT vs mode bridge
export function bridge() {
  const W = 1600, H = 560;
  const row = (y, title, bridged) => {
    let b = label(40, y - 70, title, { size: 17, color: bridged ? OK : RED, anchor: "start", weight: 800 });
    b += cloud(120, y, 150, MUTED) + label(120, y + 6, "Internet", { size: 14, color: INK });
    b += line(195, y, 330, y, MUTED, { w: 3 });
    b += router(400, y + 10, 110, bridged ? MUTED : INK);
    b += chip(400, y + 60, bridged ? "Box en mode bridge" : "Box : NAT n°1", { size: 13, bg: bridged ? "#f0fdf4" : "#fff1f2", color: bridged ? OK : RED, border: bridged ? "#bbf7d0" : "#fecaca", bold: true });
    b += line(470, y, 620, y, MUTED, { w: 3 });
    b += appliance(630, y - 30, 220, { accent: C });
    b += chip(740, y + 60, bridged ? "Pare-feu : seul NAT" : "Pare-feu : NAT n°2", { size: 13, bg: bridged ? OK : RED, color: "#fff", border: bridged ? OK : RED, bold: true });
    b += line(860, y, 980, y, MUTED, { w: 3 });
    b += monitor(1040, y, 90, INK);
    b += chip(1300, y, bridged ? "VPN, caméras, serveurs : simple" : "VPN instable, ports à ouvrir 2 fois", { size: 14, bg: "#ffffff", color: bridged ? OK : RED, border: bridged ? "#bbf7d0" : "#fecaca", bold: true });
    return svg(W, H, b);
  };
  return { W, H, layers: [row(150, "Double NAT : deux traducteurs à la suite", false), row(420, "Mode bridge : la box ne fait plus que le modem", true)] };
}

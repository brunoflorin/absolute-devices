// Switchs — hub vs switch, table MAC, VLAN.
import { icon, tile, chip, label, line, path, panel, monitor, switchBox, svg } from "../tech.mjs";

const C = "#155E75", INK = "#334155", MUTED = "#94a3b8", RED = "#dc2626", OK = "#16a34a", DARK = "#082F3B";

// Hub : diffuse partout / Switch : envoie au bon port
export function hubSwitch() {
  const W = 1500, H = 520;
  const half = (x0, title, smart) => {
    let b = panel(x0, 20, 700, 480, { r: 18, fill: smart ? "#ecfeff" : "#f8fafc", stroke: smart ? "#a5f3fc" : "#e2e8f0" });
    b += label(x0 + 350, 62, title, { size: 18, color: smart ? C : INK, weight: 800 });
    const cx = x0 + 350, cy = 260;
    b += switchBox(cx, cy, 170, smart ? C : INK);
    const pcs = [[x0 + 110, 140, "A"], [x0 + 590, 140, "B"], [x0 + 110, 400, "C"], [x0 + 590, 400, "D"]];
    for (const [x, y, n] of pcs) {
      const target = n === "D";
      const active = !smart || n === "A" || target;
      b += line(cx, cy, x, y, active ? (smart ? OK : "#f59e0b") : MUTED, { w: active ? 4 : 2.5, dash: active ? "" : "5 6" });
      b += monitor(x, y, 90, INK);
      b += chip(x, y + 62, `PC ${n}`, { size: 13, bold: true });
    }
    b += chip(cx, 470, smart ? "A → D : seul D reçoit" : "A → D : tout le monde reçoit", { size: 14, bg: smart ? OK : "#f59e0b", color: "#fff", border: smart ? OK : "#f59e0b", bold: true });
    return b;
  };
  return { W, H, layers: [svg(W, H, half(20, "Hub (niveau 1)", false)), svg(W, H, half(780, "Switch (niveau 2)", true))] };
}

// Table MAC + VLAN
export function vlan() {
  const W = 1600, H = 560;
  const l1 = (() => {
    let b = panel(30, 40, 520, 300, { r: 16 });
    b += label(55, 78, "Table d'adresses MAC du switch", { size: 16, color: DARK, anchor: "start", weight: 800 });
    const rows = [["Port 1", "3C:52:82:1A:04:9F"], ["Port 2", "A4:5E:60:C2:11:7B"], ["Port 3", "00:1B:44:11:3A:B7"], ["Port 4", "F0:9F:C2:7D:E2:05"]];
    rows.forEach(([p, m], i) => {
      const y = 125 + i * 50;
      b += `<rect x="50" y="${y - 22}" width="480" height="38" rx="8" fill="${i % 2 ? "#fff" : "#f8fafc"}"/>`;
      b += label(70, y + 3, p, { size: 14, color: INK, anchor: "start", weight: 700 });
      b += label(510, y + 3, m, { size: 14, color: C, anchor: "end", weight: 700, mono: true });
    });
    return svg(W, H, b);
  })();
  const l2 = (() => {
    let b = switchBox(1080, 120, 360, C);
    b += label(1080, 70, "Un seul switch, plusieurs réseaux virtuels (VLAN)", { size: 16, color: DARK, weight: 800 });
    const groups = [[740, "VLAN 10", "Bureaux", "#155e75"], [1080, "VLAN 20", "Téléphonie", "#7c3aed"], [1420, "VLAN 30", "Wi-Fi invités", "#d97706"]];
    for (const [x, v, n, c] of groups) {
      b += line(1080, 145, x, 300, c, { w: 3.5 });
      b += panel(x - 150, 300, 300, 180, { r: 16, stroke: c });
      b += chip(x, 330, v, { size: 14, bg: c, color: "#fff", border: c, bold: true });
      b += tile(x === 1080 ? "Phone" : x === 740 ? "Monitor" : "Wifi", x, 400, 60, c);
      b += label(x, 462, n, { size: 15, color: DARK, weight: 700 });
    }
    return svg(W, H, b);
  })();
  const l3 = (() => {
    let b = path("M 1420 490 C 1420 540 760 540 740 490", RED, { w: 3, dash: "6 6" });
    b += `<circle cx="1080" cy="527" r="17" fill="#fff" stroke="${RED}" stroke-width="2"/>` + icon("X", 1080, 527, 22, RED, 3);
    b += chip(290, 470, "Les invités ne voient pas les PC du bureau", { size: 14, bg: "#fff1f2", color: RED, border: "#fecaca", bold: true });
    return svg(W, H, b);
  })();
  return { W, H, layers: [l1, l2, l3] };
}

import React from "react";
import ColorVisualGroup from "./ColorVisualGroup";

const items = [
  {
    file: "WatchGuard_T115_T125_T145.PNG",
    label: "WatchGuard T115 / T125 / T145",
  },
  {
    file: "Difference_Firewall_Grand_Public_VS_WatchGuard+licences.png",
    label: "Grand public vs WatchGuard + licences",
  },
  {
    file: "Firewall_Materiel_VS_Logiciel.png",
    label: "Pare-feu materiel vs logiciel",
  },
  {
    file: "Firewalls_materiels_et_logiciels.PNG",
    label: "Firewalls materiels et logiciels",
  },
  {
    file: "Comprendre_parefeu_Materiel.png",
    label: "Comprendre le pare-feu materiel",
  },
  {
    file: "Comprendre_Firewall_Materiel.png",
    label: "Comprendre le firewall materiel",
  },
  {
    file: "VPN-types.PNG",
    label: "Types de VPN",
  },
];

export default function WatchGuardVisual() {
  return <ColorVisualGroup folder="ROUGE" items={items} />;
}
import React from "react";
import ColorVisualGroup from "./ColorVisualGroup";

const items = [
  {
    file: "Comprendre_MFA.PNG",
    bdFile: "MFA_BD.png",
    label: "Comprendre le MFA",
  },
  {
    file: "Anti_phishing.PNG",
    label: "Anti-phishing",
  },
  {
    file: "Comprendre_antiransomware.png",
    label: "Comprendre l'antiransomware",
  },
  {
    file: "Keepass_Pro.png",
    label: "KeePass Pro",
  },
  {
    file: "Keeper_Pro.png",
    label: "Keeper Pro",
  },
];

export default function MFAVIsual() {
  return <ColorVisualGroup folder="ROUGE" items={items} />;
}
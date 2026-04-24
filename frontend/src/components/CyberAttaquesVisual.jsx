import React from "react";
import ColorVisualGroup from "./ColorVisualGroup";

const items = [
  {
    file: "Cyberattaques.PNG",
    label: "Cyberattaques",
  },
];

export default function CyberAttaquesVisual() {
  return <ColorVisualGroup folder="ROUGE" items={items} />;
}
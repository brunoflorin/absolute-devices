import React from "react";
import ColorVisualGroup from "./ColorVisualGroup";

const items = [
  {
    file: "Sensibilisation_des_utilisateurs.PNG",
    label: "Sensibilisation des utilisateurs",
  },
];

export default function SensibilisationVisual() {
  return <ColorVisualGroup folder="ROUGE" items={items} />;
}
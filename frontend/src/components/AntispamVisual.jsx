import React from "react";
import ColorVisualGroup from "./ColorVisualGroup";

const items = [
  {
    file: "VADE365.PNG",
    label: "Vade 365",
  },
  {
    file: "Spams_Greymails_Virus.PNG",
    label: "Spams, greymails, virus",
  },
  {
    file: "Hornet365_Plans.PNG",
    label: "Hornet 365",
  },
];

export default function AntispamVisual() {
  return <ColorVisualGroup folder="ROUGE" items={items} />;
}
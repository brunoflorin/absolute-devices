import React from "react";
import ColorVisualGroup from "./ColorVisualGroup";

const items = [
  {
    file: "Atera.PNG",
    label: "Atera",
  },
  {
    file: "PRTG.PNG",
    label: "PRTG",
  },
  {
    file: "Acronis.PNG",
    bdFile: "Acronis_BD.PNG",
    label: "Acronis",
  },
  {
    file: "Trend_Micro_Worry_Free.PNG",
    label: "Trend Micro Worry-Free",
  },
];

export default function MonitoringVisual() {
  return <ColorVisualGroup folder="ROUGE" items={items} />;
}
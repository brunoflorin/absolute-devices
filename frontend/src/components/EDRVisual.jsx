import React from "react";
import ColorVisualGroup from "./ColorVisualGroup";

const items = [
  {
    file: "Acronis_EDR.PNG",
    label: "Acronis EDR",
  },
  {
    file: "Antivirus_Pro_VS_EDR.PNG",
    label: "Antivirus pro vs EDR",
  },
  {
    file: "Trend_Micro_Worry_Free.PNG",
    label: "Trend Micro Worry-Free",
  },
  {
    file: "Antivirus_Gratuit.PNG",
    label: "Antivirus gratuit",
  },
  {
    file: "Antivirus_Gratuit_VS_Professionnel.png",
    label: "Antivirus gratuit vs professionnel",
  },
];

export default function EDRVisual() {
  return <ColorVisualGroup folder="ROUGE" items={items} />;
}
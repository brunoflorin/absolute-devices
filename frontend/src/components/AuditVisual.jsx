import React from "react";
import ColorVisualGroup from "./ColorVisualGroup";

const items = [
  {
    file: "Audit.PNG",
    label: "Audit de securite",
  },
];

export default function AuditVisual() {
  return <ColorVisualGroup folder="ROUGE" items={items} />;
}
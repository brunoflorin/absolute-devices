// frontend/src/components/CyberAttaquesVisual.jsx

import React, { useState } from "react";

const visuals = [
  {
    src: "/visuels/Repartition-types-de-victimes-ransomware-2023.png",
    label: "Victimes des ransomwares (2023)",
  },
];

export default function CyberAttaquesVisual({ onOpen }) {
  const [activeVisual, setActiveVisual] = useState(null);

  const handleOpen = (visual) => {
    if (typeof onOpen === "function") {
      onOpen(visual.src);
      return;
    }
    setActiveVisual(visual);
  };

  if (activeVisual) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        <button
          onClick={() => setActiveVisual(null)}
          className="m-4 px-4 py-2 bg-white rounded shadow self-start"
        >
          ← Retour
        </button>

        <div className="flex-1 flex items-center justify-center overflow-auto">
          <img
            src={activeVisual.src}
            alt={activeVisual.label}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {visuals.map((visual, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleOpen(visual)}
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center"
        >
          <img
            src={visual.src}
            alt={visual.label}
            className="w-full h-64 object-contain mb-4"
          />
          <div className="text-sm font-medium text-slate-700">
            {visual.label}
          </div>
        </button>
      ))}
    </div>
  );
}
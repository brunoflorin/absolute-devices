// frontend/src/components/CyberAttaquesVisual.jsx

import React, { useState } from "react";

const visuals = [
  {
    src: "/visuels/Long_Versions/Cyberattaques_Pourquoi_Comment_Qui_LongVersion.pdf",
    label: "Cyberattaques : pourquoi, comment, qui ?",
  },
];

export default function CyberAttaquesVisual({ onOpen }) {
  const [activeVisual, setActiveVisual] = useState(null);

  const isPdf = (src) => src.toLowerCase().endsWith(".pdf");

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

        <div className="flex-1 flex items-center justify-center overflow-auto bg-white mx-4 mb-4 rounded-xl">
          {isPdf(activeVisual.src) ? (
            <iframe
              src={activeVisual.src}
              title={activeVisual.label}
              className="w-full h-full min-h-[80vh] rounded-xl"
            />
          ) : (
            <img
              src={activeVisual.src}
              alt={activeVisual.label}
              className="max-w-full max-h-full object-contain"
            />
          )}
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
          {isPdf(visual.src) ? (
            <div className="w-full h-64 mb-4 rounded-lg border border-slate-200 bg-slate-50 flex flex-col items-center justify-center">
              <div className="text-5xl mb-3">📄</div>
              <div className="text-sm text-slate-600 px-4">
                Aperçu PDF disponible au clic
              </div>
            </div>
          ) : (
            <img
              src={visual.src}
              alt={visual.label}
              className="w-full h-64 object-contain mb-4"
            />
          )}

          <div className="text-sm font-medium text-slate-700">
            {visual.label}
          </div>
        </button>
      ))}
    </div>
  );
}
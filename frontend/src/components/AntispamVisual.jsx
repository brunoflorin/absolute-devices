import React, { useState } from "react";

const visuals = [
  {
    src: "/visuels/schema-antispam.png",
    label: "Fonctionnement d’un antispam",
  },
  {
    src: "/visuels/Spams-Greymails-virus.png",
    label: "Spam, greymail et virus",
  },
  {
    src: "/visuels/Vade-365-Antispam.png",
    label: "Protection Vade 365",
  },
];

export default function AntispamVisual({ onOpen }) {
  const [activeVisual, setActiveVisual] = useState(null);

  const openVisual = (v) => {
    if (onOpen) {
      onOpen(v.src);
    } else {
      setActiveVisual(v);
    }
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {visuals.map((v, i) => (
        <button
          key={i}
          onClick={() => openVisual(v)}
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center"
        >
          <img
            src={v.src}
            alt={v.label}
            className="w-full h-48 object-contain mb-4"
          />
          <div className="text-sm font-medium text-slate-700">
            {v.label}
          </div>
        </button>
      ))}
    </div>
  );
}

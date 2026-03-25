// frontend/src/components/GenericVisual.jsx

import React, { useState, useMemo } from "react";

export default function GenericVisual({ topicId }) {
  const [activeSrc, setActiveSrc] = useState(null);

  const visuals = useMemo(() => {
    if (!topicId) return [];
    return [
      { src: `/visuels/${topicId}.png`, label: `${topicId}.png` },
      { src: `/visuels/${topicId}.jpg`, label: `${topicId}.jpg` },
      { src: `/visuels/${topicId}.jpeg`, label: `${topicId}.jpeg` },
      { src: `/visuels/${topicId}.webp`, label: `${topicId}.webp` },
    ];
  }, [topicId]);

  if (activeSrc) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        <button
          onClick={() => setActiveSrc(null)}
          className="m-4 px-4 py-2 bg-white rounded shadow self-start"
        >
          ← Retour
        </button>
        <div className="flex-1 flex items-center justify-center overflow-auto">
          <img src={activeSrc} alt="" className="max-w-full max-h-full object-contain" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {visuals.map((v, i) => (
        <img
          key={i}
          src={v.src}
          alt={v.label}
          className="rounded-xl shadow object-contain h-64 bg-white cursor-pointer"
          onClick={() => setActiveSrc(v.src)}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ))}
    </div>
  );
}

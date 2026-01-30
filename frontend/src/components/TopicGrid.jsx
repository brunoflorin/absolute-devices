import React from "react";

// Couleurs DISC (mêmes que FamilyGrid)
const COLORS = {
  cyber: "#D62828",      // rouge
  backup: "#4CAF50",     // vert
  collab: "#F4D35E",     // jaune
  infra: "#0077B6"       // bleu
};

export default function TopicGrid({ family, selectedTopicId, onSelectTopic }) {
  if (!family) return null;

  return (
    <section className="max-w-6xl mx-auto mt-6">
      <h3 className="text-base text-sky-900 mb-3">
        Étape 2 — Choisissez un sujet dans « {family.label} »
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {family.topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className="rounded-xl shadow-md bg-white border border-slate-200 p-3 text-left transition hover:scale-[1.02] hover:shadow-lg"
            style={{
              borderLeft: `6px solid ${COLORS[family.id]}`, // couleur DISC de la famille
            }}
          >
            {/* Titre du sujet */}
            <div className="text-sm font-semibold text-slate-800 mb-1">
              {topic.label}
            </div>

            {/* Indicateur sélection */}
            {selectedTopicId === topic.id && (
              <div className="text-[11px] text-sky-700 font-semibold mt-1">
                ✓ Sélectionné
              </div>
            )}
          </button>
        ))}

      </div>
    </section>
  );
}

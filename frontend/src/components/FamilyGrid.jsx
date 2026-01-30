import React from "react";

// Couleurs DISC — figées
const COLORS = {
  cyber: "#D62828",       // Rouge (D)
  backup: "#4CAF50",      // Vert (S)
  collab: "#F4D35E",      // Jaune (I)
  infra: "#0077B6"        // Bleu (C)
};

export default function FamilyGrid({ families, selectedFamilyId, onSelectFamily }) {
  return (
    <section className="max-w-6xl mx-auto">
      <h2 className="text-lg text-sky-900 mb-3">
        Étape 1 — Choisissez une famille
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {families.map((fam) => (
          <button
            key={fam.id}
            onClick={() => onSelectFamily(fam.id)}
            className="rounded-xl shadow-lg bg-white border border-slate-200 p-4 text-left transition hover:scale-[1.02] hover:shadow-xl"
            style={{
              borderTop: `6px solid ${COLORS[fam.id]}`, // trait de couleur DISC
            }}
          >
            {/* Titre */}
            <div className="text-base font-semibold text-slate-800 mb-1">
              {fam.label}
            </div>

            {/* Description */}
            <div className="text-xs text-slate-600 leading-snug">
              {fam.description}
            </div>

            {/* Sélection visuelle */}
            {selectedFamilyId === fam.id && (
              <div
                className="mt-3 text-[11px] font-semibold text-sky-700"
              >
                ✓ Sélectionné
              </div>
            )}
          </button>
        ))}

      </div>
    </section>
  );
}

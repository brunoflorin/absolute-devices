import React from "react";

export default function FamilySelect({ families, selectedFamilyId, onSelectFamily }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg text-sky-900">Étape 1 – Choisissez une famille</h2>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {families.map((fam) => (
          <button
            key={fam.id}
            onClick={() => onSelectFamily(fam.id)}
            className={`text-left rounded-xl border px-3 py-3 shadow-sm transition ${
              selectedFamilyId === fam.id
                ? "border-sky-600 bg-sky-50"
                : "border-slate-200 bg-slate-50 hover:bg-sky-50/50"
            }`}
          >
            <div className="text-sm font-semibold text-sky-900">
              {fam.label}
            </div>
            <div className="mt-1 text-xs text-slate-700">
              {fam.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

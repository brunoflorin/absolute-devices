import React from "react";

// Couleurs DISC
const COLORS = {
  cyber: "#D62828",
  backup: "#4CAF50",
  collab: "#F4D35E",
  infra: "#0077B6"
};

export default function SideMenu({
  families,
  selectedFamilyId,
  selectedTopicId,
  onSelectFamily,
  onSelectTopic
}) {
  return (
    <aside className="w-60 bg-white border-r border-slate-200 h-screen overflow-y-auto p-4 hidden lg:block">

      <h2 className="text-sm font-semibold text-sky-900 mb-3">
        Navigation
      </h2>

      <div className="space-y-5">
        {families.map((fam) => (
          <div key={fam.id}>
            {/* Titre de la famille */}
            <button
              onClick={() => onSelectFamily(fam.id)}
              className="flex items-center gap-2 mb-1"
            >
              <div
                className="w-2 h-4 rounded-sm"
                style={{ backgroundColor: COLORS[fam.id] }}
              />
              <span
                className={`text-sm font-semibold ${
                  selectedFamilyId === fam.id ? "text-sky-700" : "text-slate-800"
                }`}
              >
                {fam.label}
              </span>
            </button>

            {/* Sujets (uniquement si famille sélectionnée) */}
            {selectedFamilyId === fam.id && (
              <ul className="mt-1 ml-4 border-l border-slate-200 pl-3 space-y-1">
                {fam.topics.map((topic) => (
                  <li key={topic.id}>
                    <button
                      onClick={() => onSelectTopic(topic.id)}
                      className={`text-xs ${
                        selectedTopicId === topic.id
                          ? "text-sky-600 font-semibold"
                          : "text-slate-600"
                      }`}
                    >
                      {topic.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

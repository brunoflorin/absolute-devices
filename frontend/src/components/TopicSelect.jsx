import React from "react";

export default function TopicSelect({ family, selectedTopicId, onSelectTopic }) {
  if (!family) return null;

  return (
    <div className="space-y-2 mt-4">
      <h3 className="text-base text-sky-900">
        Étape 2 – Sujets dans “{family.label}”
      </h3>

      <div className="grid gap-2 md:grid-cols-2">
        {family.topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className={`text-left text-xs rounded-lg border px-3 py-2 transition ${
              selectedTopicId === topic.id
                ? "border-sky-600 bg-sky-50"
                : "border-slate-200 bg-white hover:bg-sky-50"
            }`}
          >
            {topic.label}
          </button>
        ))}
      </div>
    </div>
  );
}

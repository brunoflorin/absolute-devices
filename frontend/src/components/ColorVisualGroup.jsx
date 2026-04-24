import React, { useMemo, useState } from "react";

function buildEducatifFileName(fileName) {
  const baseName = fileName.replace(/\.[^.]+$/, "");
  return `${baseName}_BD.PNG`;
}

function buildTechniqueItems(folder, items) {
  return items.map((item) => ({
    src: `/visuels/${folder}/${item.file}`,
    label: item.label,
  }));
}

function buildEducatifItems(folder, items) {
  return items.map((item) => ({
    src: `/visuels/${folder}-BD/${buildEducatifFileName(item.file)}`,
    label: item.label,
  }));
}

export default function ColorVisualGroup({ folder, items = [] }) {
  const [activeVisual, setActiveVisual] = useState(null);
  const [hiddenSrcs, setHiddenSrcs] = useState({});

  const isPdf = (src) => src.toLowerCase().endsWith(".pdf");

  const sections = useMemo(() => {
    const techniqueItems = buildTechniqueItems(folder, items).filter(
      (item) => !hiddenSrcs[item.src]
    );

    const educatifItems = buildEducatifItems(folder, items).filter(
      (item) => !hiddenSrcs[item.src]
    );

    return [
      { title: "Visuel technique", items: techniqueItems },
      { title: "Visuel educatif", items: educatifItems },
    ].filter((section) => section.items.length > 0);
  }, [folder, items, hiddenSrcs]);

  if (activeVisual) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
        <button
          onClick={() => setActiveVisual(null)}
          className="m-4 px-4 py-2 bg-white rounded shadow self-start"
        >
          ← Retour
        </button>

        <div className="mx-4 text-white text-sm">
          {activeVisual.family} — {activeVisual.label}
        </div>

        <div className="flex-1 overflow-auto bg-white mx-4 mb-4 mt-2 rounded-xl p-2">
          {isPdf(activeVisual.src) ? (
            <iframe
              src={`${activeVisual.src}#toolbar=1&navpanes=0&scrollbar=1`}
              title={activeVisual.label}
              className="w-full min-h-[85vh] rounded-xl border-0"
            />
          ) : (
            <img
              src={activeVisual.src}
              alt={activeVisual.label}
              className="max-w-full max-h-full object-contain mx-auto"
            />
          )}
        </div>
      </div>
    );
  }

  if (!sections.length) {
    return (
      <div className="text-gray-400 italic text-center py-12">
        Aucun visuel defini pour ce sujet.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="mb-4 text-lg font-semibold text-slate-800">
            {section.title}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {section.items.map((visual, index) => (
              <div
                key={`${section.title}-${index}`}
                role="button"
                tabIndex={0}
                onClick={() =>
                  setActiveVisual({ ...visual, family: section.title })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveVisual({ ...visual, family: section.title });
                  }
                }}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center cursor-pointer"
              >
                <div className="w-full h-56 mb-4 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
                  {isPdf(visual.src) ? (
                    <iframe
                      src={`${visual.src}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      title={visual.label}
                      className="w-full h-full border-0 bg-white pointer-events-none"
                    />
                  ) : (
                    <img
                      src={visual.src}
                      alt={visual.label}
                      className="w-full h-full object-contain"
                      onError={() =>
                        setHiddenSrcs((prev) => ({
                          ...prev,
                          [visual.src]: true,
                        }))
                      }
                    />
                  )}
                </div>

                <div className="text-xs text-violet-600 mb-1">
                  {section.title}
                </div>

                <div className="text-sm font-medium text-slate-700">
                  {visual.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
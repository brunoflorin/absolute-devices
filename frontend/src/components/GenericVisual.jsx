import React, { useMemo, useState } from "react";

const TOPIC_VISUALS = {
  backup_acronis: [
    {
      title: "Version courte",
      items: [
        {
          src: "/visuels/Short_Versions/Acronis_Backup.pdf",
          label: "Acronis Backup",
        },
        {
          src: "/visuels/Short_Versions/Acronis_Cyber_Protect_Cloud.pdf",
          label: "Acronis Cyber Protect Cloud",
        },
      ],
    },
    {
      title: "Version longue",
      items: [
        {
          src: "/visuels/Long_Versions/AcronisBackup_LongVersion.pdf",
          label: "Acronis Backup",
        },
      ],
    },
    {
      title: "Version educative",
      items: [
        {
          src: "/visuels/Educative_Versions/Acronis_Backup.png",
          label: "Illustration Acronis Backup",
        },
      ],
    },
  ],

  backup_nas: [
    {
      title: "Version courte",
      items: [],
    },
    {
      title: "Version longue",
      items: [
        {
          src: "/visuels/Long_Versions/NAS_LongVersion.pdf",
          label: "NAS",
        },
      ],
    },
    {
      title: "Version educative",
      items: [
        {
          src: "/visuels/Educative_Versions/NAS_Synology.png",
          label: "NAS Synology",
        },
        {
          src: "/visuels/Educative_Versions/NAS_Sauvegardes_Hybrides.png",
          label: "NAS et sauvegardes hybrides",
        },
      ],
    },
  ],

  backup_hybride: [
    {
      title: "Version courte",
      items: [],
    },
    {
      title: "Version longue",
      items: [
        {
          src: "/visuels/Long_Versions/SauvegardesHybrides_LongVersion.pdf",
          label: "Sauvegardes hybrides",
        },
      ],
    },
    {
      title: "Version educative",
      items: [
        {
          src: "/visuels/Educative_Versions/Sauvegardes_hybrides.png",
          label: "Illustration sauvegardes hybrides",
        },
      ],
    },
  ],

  backup_integrite: [
    {
      title: "Version courte",
      items: [
        {
          src: "/visuels/Short_Versions/Verification_d_integrite_des_sauvegardes.pdf",
          label: "Verification d'integrite des sauvegardes",
        },
      ],
    },
    {
      title: "Version longue",
      items: [
        {
          src: "/visuels/Long_Versions/VerificationIntegrite_LongVersion.pdf",
          label: "Verification d'integrite",
        },
      ],
    },
    {
      title: "Version educative",
      items: [],
    },
  ],

  backup_tests: [
    {
      title: "Version courte",
      items: [
        {
          src: "/visuels/Short_Versions/Tests_de_restauration.pdf",
          label: "Tests de restauration",
        },
      ],
    },
    {
      title: "Version longue",
      items: [
        {
          src: "/visuels/Long_Versions/TestsRestauration_LongVersion.pdf",
          label: "Tests de restauration",
        },
      ],
    },
    {
      title: "Version educative",
      items: [
        {
          src: "/visuels/Educative_Versions/Tests_de_restauration.png",
          label: "Illustration tests de restauration",
        },
      ],
    },
  ],

  backup_crashdisk: [
    {
      title: "Version courte",
      items: [
        {
          src: "/visuels/Short_Versions/Qui_est_touche_par_les_ransomwares.pdf",
          label: "Qui est touche par les ransomwares ?",
        },
      ],
    },
    {
      title: "Version longue",
      items: [
        {
          src: "/visuels/Long_Versions/CrashDisk_Cryptolocker_LongVersion.pdf",
          label: "CrashDisk et cryptolocker",
        },
      ],
    },
    {
      title: "Version educative",
      items: [
        {
          src: "/visuels/Educative_Versions/Comprendre_les_cryptolockers.png",
          label: "Comprendre les cryptolockers",
        },
      ],
    },
  ],

  backup_pca_pra_pci: [
    {
      title: "Version courte",
      items: [],
    },
    {
      title: "Version longue",
      items: [
        {
          src: "/visuels/Long_Versions/PCA_PRA_PCI_LongVersion.pdf",
          label: "PCA / PRA / PCI",
        },
      ],
    },
    {
      title: "Version educative",
      items: [
        {
          src: "/visuels/Educative_Versions/PCA_PRA_PCI.png",
          label: "Illustration PCA / PRA / PCI",
        },
      ],
    },
  ],
};

export default function GenericVisual({ topicId }) {
  const [activeVisual, setActiveVisual] = useState(null);

  const sections = useMemo(() => TOPIC_VISUALS[topicId] || [], [topicId]);

  const isPdf = (src) => src.toLowerCase().endsWith(".pdf");

  const visibleSections = sections.filter(
    (section) => Array.isArray(section.items) && section.items.length > 0
  );

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

  if (!visibleSections.length) {
    return (
      <div className="text-gray-400 italic text-center py-12">
        Aucun visuel défini pour ce sujet.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {visibleSections.map((section) => (
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
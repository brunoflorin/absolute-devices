// frontend/src/components/TopicContent.jsx

import React, { useState } from "react";

import WatchGuardVisual from "./WatchGuardVisual";
import EDRVisual from "./EDRVisual";
import MFAVIsual from "./MFAVIsual";
import AntispamVisual from "./AntispamVisual";
import SensibilisationVisual from "./SensibilisationVisual";
import AuditVisual from "./AuditVisual";
import CyberattaquesVisual from "./CyberattaquesVisual";
import GenericVisual from "./GenericVisual";

/* ========================= */
/* MAPPING TOPIC → VISUEL    */
/* ========================= */
const VISUAL_COMPONENTS = {
  // CYBER
  cyber_parefeu: WatchGuardVisual,
  cyber_edr: EDRVisual,
  cyber_mfa: MFAVIsual,
  cyber_antispam: AntispamVisual,
  cyber_sensibilisation: SensibilisationVisual,
  cyber_audits: AuditVisual,
  cyber_attaques: CyberattaquesVisual,

  // BACKUP / CONTINUITÉ
  backup_acronis: GenericVisual,
  backup_nas: GenericVisual,
  backup_hybride: GenericVisual,
  backup_integrite: GenericVisual,
  backup_tests: GenericVisual,
  backup_crashdisk: GenericVisual,
  backup_pca_pra_pci: GenericVisual,
};

export default function TopicContent({ content, option, topicId }) {
  if (!content && option !== "4") return null;

  const { label, text, pricing, images } = content || {};
  const [refresh, setRefresh] = useState(0);

  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const VisualComponent = VISUAL_COMPONENTS[topicId] || null;

  return (
    <>
      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <button
            onClick={() => {
              setFullscreen(false);
              setFullscreenImage(null);
            }}
            className="m-4 px-4 py-2 bg-white rounded shadow self-start"
          >
            ← Retour
          </button>

          <div className="flex-1 flex items-center justify-center overflow-auto">
            <img
              src={fullscreenImage}
              alt=""
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      <div className="w-full p-6 bg-white rounded-xl shadow-md mt-4">
        {label && (
          <h2 className="text-2xl font-semibold mb-4">{label}</h2>
        )}

        {option === "4" && (
          <div className="my-8">
            {VisualComponent ? (
              <VisualComponent
                topicId={topicId}
                onOpen={(src) => {
                  setFullscreenImage(src);
                  setFullscreen(true);
                }}
              />
            ) : images && images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt=""
                    className="rounded-lg shadow cursor-pointer"
                    onClick={() => {
                      setFullscreenImage(src);
                      setFullscreen(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-gray-400 italic text-center py-12">
                Aucun visuel défini pour ce sujet.
              </div>
            )}
          </div>
        )}

        {option !== "4" && text && (
          <div className="whitespace-pre-line text-gray-800 leading-relaxed mb-6">
            {text}
          </div>
        )}

        {option === "3" && pricing?.items && (
          <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Tarifs indicatifs</h3>

            {pricing.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div>
                  <div className="text-gray-900">{item.label}</div>
                  <div className="text-sm text-gray-600">
                    {item.price.toFixed(2)} € HT
                    {item.unit ? ` / ${item.unit}` : ""}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 bg-slate-200 rounded hover:bg-slate-300"
                    onClick={() => {
                      item.qty = Math.max(0, (item.qty || 0) - 1);
                      setRefresh(Math.random());
                    }}
                  >
                    –
                  </button>

                  <input
                    type="number"
                    className="w-14 text-center border rounded"
                    value={item.qty || 0}
                    onChange={(e) => {
                      item.qty = Math.max(0, parseInt(e.target.value) || 0);
                      setRefresh(Math.random());
                    }}
                  />

                  <button
                    className="px-2 py-1 bg-slate-200 rounded hover:bg-slate-300"
                    onClick={() => {
                      item.qty = (item.qty || 0) + 1;
                      setRefresh(Math.random());
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

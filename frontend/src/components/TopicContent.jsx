import React, { useState } from "react";
import WatchGuardVisual from "./WatchGuardVisual";

export default function TopicContent({ content, option, topicId }) {
  if (!content && option !== "4") return null;

  const { label, text, pricing, images } = content || {};

  const [refresh, setRefresh] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  return (
    <>
      {/* ========================= */}
      {/* OVERLAY PLEIN ÉCRAN */}
      {/* ========================= */}
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
              alt="Visuel VPN"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* CONTENU NORMAL */}
      {/* ========================= */}
      <div className="w-full p-6 bg-white rounded-xl shadow-md mt-4">

        {label && (
          <h2 className="text-2xl font-semibold mb-4">{label}</h2>
        )}

        {/* VISUELS */}
        {option === "4" && topicId === "cyber_parefeu" && (
          <div className="my-8">
            <WatchGuardVisual
              onOpen={(src) => {
                setFullscreenImage(src);
                setFullscreen(true);
              }}
            />
          </div>
        )}

        {/* TEXTE */}
        {option !== "4" && text && (
          <div className="whitespace-pre-line text-gray-800 leading-relaxed mb-6">
            {text}
          </div>
        )}

        {/* TARIFS */}
        {option === "3" && pricing && pricing.items && (
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

            <div className="mt-4 text-lg font-semibold">
              Total :{" "}
              {pricing.items.reduce(
                (acc, item) => acc + item.price * (item.qty || 0),
                0
              ).toFixed(2)} € HT
            </div>

            {pricing.text && (
              <pre className="whitespace-pre-line text-gray-700 mt-4">
                {pricing.text}
              </pre>
            )}
          </div>
        )}

        {/* IMAGES GÉNÉRIQUES */}
        {option !== "4" && images && images.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="rounded-lg shadow"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

import React from "react";

export default function TopicContent({ content, modeLabel }) {
  if (!content) return null;

  const { label, text, pricing, images } = content;

  return (
    <section className="bg-white shadow-md rounded-xl p-6 space-y-6">
      
      {/* TITRE */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-sky-900">{label}</h2>
        <span className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
          {modeLabel}
        </span>
      </div>

      {/* TEXTE (courte / étendue) */}
      {text && (
        <article className="whitespace-pre-line leading-relaxed text-slate-800">
          {text}
        </article>
      )}

      {/* TARIFS (version tarifaire) */}
      {pricing && !text && (
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-lg">
          <h3 className="text-emerald-800 mb-3">Tarifs indicatifs</h3>
          <p className="whitespace-pre-line text-slate-800">
            {pricing.text}
          </p>
        </div>
      )}

      {/* IMAGES */}
      {images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className="rounded-lg border shadow-sm"
            />
          ))}
        </div>
      )}

    </section>
  );
}

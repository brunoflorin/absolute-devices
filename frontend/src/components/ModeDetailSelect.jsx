import React from "react";

export default function ModeDetailSelect({ option, level, setOption, setLevel }) {
  return (
    <section className="max-w-6xl mx-auto mt-6">

      <h3 className="text-base text-sky-900 mb-2">
        Étape 3 — Choisissez la version et le niveau de détail
      </h3>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* Choix des versions */}
        <div className="flex flex-wrap gap-2">

          {/* Version courte */}
          <button
            className={`px-3 py-1.5 rounded-full text-xs border transition ${
              option === "1"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
            onClick={() => setOption("1")}
          >
            Version courte
          </button>

          {/* Version étendue */}
          <button
            className={`px-3 py-1.5 rounded-full text-xs border transition ${
              option === "2"
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
            onClick={() => setOption("2")}
          >
            Version étendue
          </button>

          {/* Version tarifaire */}
          <button
            className={`px-3 py-1.5 rounded-full text-xs border transition ${
              option === "3"
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
            onClick={() => setOption("3")}
          >
            Version tarifaire
          </button>

          {/* VISUELS */}
          <button
            className={`px-3 py-1.5 rounded-full text-xs border transition ${
              option === "4"
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
            onClick={() => setOption("4")}
          >
            Visuels
          </button>

        </div>

        {/* Niveau de détail */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600">Niveau :</span>

          <button
            className={`px-2.5 py-1 rounded-full text-xs border transition ${
              level === "a"
                ? "bg-sky-500 text-white border-sky-500"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
            onClick={() => setLevel("a")}
          >
            a — Vulgarisé
          </button>

          <button
            className={`px-2.5 py-1 rounded-full text-xs border transition ${
              level === "b"
                ? "bg-sky-500 text-white border-sky-500"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
            onClick={() => setLevel("b")}
          >
            b — Technique
          </button>
        </div>

      </div>
    </section>
  );
}

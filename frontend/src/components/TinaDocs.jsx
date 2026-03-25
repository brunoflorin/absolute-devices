// /frontend/src/components/TinaDocs.jsx
import React, { useEffect, useState } from "react";
import { marked } from "marked";

/**
 * TinaDocs.jsx — Affichage interne de la documentation Markdown
 * --------------------------------------------------------------
 * ✅ Lecture et affichage du fichier "Méthode_de_correction_TINA_IA.md"
 * ✅ Style cohérent avec l’univers TINA (bleu nuit / cyan)
 * ✅ Rendu Markdown complet avec titres, listes, liens et code stylés
 * ✅ Gestion d’erreurs élégante si le fichier n’est pas trouvé
 */

export default function TinaDocs() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/Méthode_de_correction_TINA_IA.md")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement du fichier Markdown.");
        return res.text();
      })
      .then((text) => {
        // Transformation Markdown → HTML
        const html = marked.parse(text, {
          gfm: true,
          breaks: true,
        });
        setContent(html);
      })
      .catch(() =>
        setError("❌ Impossible de charger le document. Vérifie son emplacement ou son nom.")
      );
  }, []);

  return (
    <div
      className="min-h-screen bg-[#081428] text-gray-100 px-6 py-10 overflow-y-auto"
      style={{ fontFamily: "'Segoe UI', sans-serif" }}
    >
      <div className="max-w-4xl mx-auto bg-[#0e1c33]/80 border border-cyan-500/40 shadow-[0_0_25px_rgba(0,255,255,0.25)] rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-cyan-300 mb-6 text-center">
          📘 Méthode de Correction — TINA IA
        </h1>

        {error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : (
          <article
            className="prose prose-invert max-w-none prose-headings:text-cyan-300 prose-a:text-cyan-400 prose-strong:text-white prose-code:text-cyan-300 prose-blockquote:border-cyan-400/40"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        <div className="mt-8 text-center text-xs text-white/60">
          💡 Propulsé par <span className="text-cyan-300">Absolute Micro</span> — Houdan.
        </div>
      </div>
    </div>
  );
}

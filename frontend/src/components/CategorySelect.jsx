// /frontend/src/components/CategorySelect.jsx
import { motion } from "framer-motion";
import Tina2 from "@assets/Tina2.png";

/**
 * CategorySelect.jsx
 * ------------------------------------------------
 * ✅ Transmet correctement la catégorie choisie vers TinaDialogue
 * ✅ Style cohérent (fond bleu nuit, halo cyan)
 * ✅ Animation d’apparition fluide
 * ✅ Gère la visite libre et la recherche rapide
 */

export default function CategorySelect({ onSelect, onQuickSearch, onBack }) {
  const categories = [
    { name: "Ordinateur", emoji: "💻" },
    { name: "Logiciel", emoji: "⚙️" },
    { name: "Périphérique", emoji: "🖨️" },
    { name: "Internet", emoji: "🌐" },
    { name: "Mobile", emoji: "📱" },
    { name: "Autre", emoji: "❓" },
  ];

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden px-4 py-10"
      style={{ backgroundColor: "#081428", fontFamily: "'Courier New', monospace" }}
    >
      {/* Halo cyan */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[28rem] h-[28rem] rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center w-full max-w-3xl bg-[#0b1220]/80 border border-cyan-600/50 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,255,255,0.25)]"
      >
        {/* Avatar Tina */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={Tina2}
            alt="TINA"
            className="w-36 h-auto rounded-2xl border-2 border-cyan-400 shadow-[0_0_35px_rgba(0,255,255,0.5)]"
          />
          <div className="mt-2 text-cyan-300 font-semibold text-lg">Assistante virtuelle</div>
        </div>

        {/* Message */}
        <p className="text-center text-gray-200 mb-6">
          Choisis une catégorie pour que je t’aide à cibler ton problème 👇
        </p>

        {/* Catégories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-xl">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onSelect && onSelect(cat.name)}
              className="px-6 py-4 bg-[#0d1930] hover:bg-cyan-600/40 text-white font-semibold rounded-xl border border-cyan-700/50 transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10"
            >
              <span>{cat.emoji}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Ligne ou champ rapide */}
        <div className="mt-8 text-gray-400 text-center">ou</div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full max-w-lg">
          <input
            type="text"
            placeholder="Décris ton problème ici (ex : Word ne s’ouvre plus)"
            className="flex-1 rounded-xl p-3 bg-[#0a1325] border border-cyan-700/50 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") onQuickSearch && onQuickSearch(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const val = document.querySelector("input")?.value || "";
              onQuickSearch && onQuickSearch(val);
            }}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl text-white font-semibold transition"
          >
            🔍 Chercher
          </button>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="mt-6 text-sm text-cyan-300 hover:text-white underline"
          >
            ← Retour
          </button>
        )}
      </motion.div>

      {/* Footer */}
      <div className="text-sm text-gray-400 mt-6 relative z-10">
        Diagnostic interactif propulsé par <span className="text-cyan-400">Absolute Micro</span>.
      </div>
    </div>
  );
}

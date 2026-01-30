// /frontend/src/components/Result.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  TriangleAlert,
  Info,
  RefreshCw,
  Star,
} from "lucide-react";

/**
 * Result.jsx — Bloc d'affichage des résultats TINA IA
 * ---------------------------------------------------
 * ✅ Affiche le résultat du diagnostic avec humeur (succès / avertissement / info)
 * ✅ Liste les étapes proposées
 * ✅ Astuce optionnelle en fin
 * ✅ Système de notation interactif (5 étoiles)
 * ✅ Animation “Thug Life” si 5 étoiles données
 * ✅ Boutons d’action : Recommencer / Décrire le problème
 * ✅ Style cohérent avec TinaDialogue.jsx (cyan, sombre, clair)
 */

function MoodIcon({ mood }) {
  if (mood === "success")
    return <CheckCircle2 className="text-emerald-400" size={22} />;
  if (mood === "warning")
    return <TriangleAlert className="text-yellow-400" size={22} />;
  return <Info className="text-cyan-300" size={22} />;
}

export default function Result({ result, onRestart, onNoWork, onFadeOut }) {
  const [rating, setRating] = useState(0);
  const [thug, setThug] = useState(false);

  const rate = (value) => {
    setRating(value);
    if (value === 5) {
      setThug(true);
      setTimeout(() => {
        if (onFadeOut) onFadeOut(); // 🚀 Déclenche la sortie Matrix
        setThug(false);
      }, 3000);
    }
  };

  return (
    <div className="relative text-left bg-[#0a1325]/60 p-6 rounded-2xl border border-cyan-700/40 shadow-[0_0_25px_rgba(0,255,255,0.2)]">
      {/* ---------- En-tête : humeur + titre ---------- */}
      <div className="flex items-center gap-2 mb-4">
        <MoodIcon mood={result.mood} />
        <h2 className="text-2xl font-semibold text-cyan-200">{result.title}</h2>
      </div>

      {/* ---------- Animation Thug Life ---------- */}
      <AnimatePresence>
        {thug && (
          <motion.img
            src="/images/thug-life.png"
            alt="Thug Life"
            className="absolute right-4 -top-20 w-40 opacity-90"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      {/* ---------- Étapes proposées ---------- */}
      <div className="mt-3">
        <p className="mb-2 text-gray-300">Procédure proposée :</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-100 leading-relaxed">
          {result.steps?.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      {/* ---------- Astuce optionnelle ---------- */}
      {result.tips && (
        <motion.p
          className="mt-4 text-sm text-gray-400 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          💡 <span className="text-cyan-300">Astuce :</span> {result.tips}
        </motion.p>
      )}

      {/* ---------- Notation ---------- */}
      <div className="mt-8">
        <p className="mb-2 text-gray-400">Note cette solution :</p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={30}
              onClick={() => rate(i)}
              className={`cursor-pointer transition-transform duration-150 ${
                i <= rating
                  ? "text-yellow-400 scale-110"
                  : "text-gray-600 hover:text-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ---------- Boutons d’action ---------- */}
      <div className="mt-8 flex flex-wrap gap-3">
        <motion.button
          onClick={onRestart}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-white border border-gray-600/40 transition"
        >
          <RefreshCw size={16} /> Recommencer
        </motion.button>

        <motion.button
          onClick={onNoWork}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm text-white font-semibold transition"
        >
          Ça n’a pas marché → Décrire le problème
        </motion.button>
      </div>
    </div>
  );
}

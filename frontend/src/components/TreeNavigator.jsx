// /frontend/src/components/TreeNavigator.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MatrixBackground from "./MatrixBackground";
import Tina3 from "../assets/Tina3.png";

/**
 * TreeNavigator.jsx — Carte interactive TINA IA
 * ----------------------------------------------
 * ✅ Lecture dynamique du fichier JSON (tinaMap.json)
 * ✅ Navigation hiérarchique (type explorateur)
 * ✅ Recherche globale récursive dans toutes les clés
 * ✅ Interface fluide, cohérente avec les autres écrans
 * ✅ Compatible avec MatrixBackground
 */

export default function TreeNavigator() {
  const [mapData, setMapData] = useState({});
  const [path, setPath] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [search, setSearch] = useState("");

  /* -------------------------------------------
     Chargement du JSON de la carte TINA
  ------------------------------------------- */
  useEffect(() => {
    fetch("/src/data/tinaMap.json")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement JSON");
        return res.json();
      })
      .then((data) => setMapData(data))
      .catch((err) =>
        console.error("❌ Erreur lors du chargement de tinaMap.json :", err)
      );
  }, []);

  /* -------------------------------------------
     Calcul du niveau courant selon le chemin
  ------------------------------------------- */
  const currentLevel = path.reduce(
    (acc, key) => (acc && acc[key] ? acc[key] : null),
    mapData
  );

  const entries = currentLevel
    ? Array.isArray(currentLevel)
      ? currentLevel.map((x) => ({ label: x, isLeaf: true }))
      : Object.keys(currentLevel).map((x) => ({ label: x, isLeaf: false }))
    : Object.keys(mapData).map((x) => ({ label: x, isLeaf: false }));

  /* -------------------------------------------
     Recherche récursive (profonde)
  ------------------------------------------- */
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(null);
      return;
    }

    const results = [];
    const searchTerm = search.toLowerCase();

    const deepSearch = (obj, prefix = []) => {
      for (const key in obj) {
        const val = obj[key];
        if (key.toLowerCase().includes(searchTerm)) {
          results.push([...prefix, key]);
        }
        if (Array.isArray(val)) {
          val.forEach((v) => {
            if (v.toLowerCase().includes(searchTerm)) {
              results.push([...prefix, key, v]);
            }
          });
        } else if (typeof val === "object") {
          deepSearch(val, [...prefix, key]);
        }
      }
    };

    deepSearch(mapData);
    setFiltered(results);
  }, [search, mapData]);

  /* -------------------------------------------
     Navigation entre niveaux
  ------------------------------------------- */
  const goNext = (key) => setPath([...path, key]);
  const goBack = () => setPath(path.slice(0, -1));

  /* -------------------------------------------
     Rendu principal
  ------------------------------------------- */
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-white font-sans">
      <MatrixBackground active={true} />

      {/* Carte principale */}
      <div
        className="relative z-10 border border-cyan-500/50 shadow-[0_0_35px_rgba(0,255,255,0.35)] rounded-3xl p-8 w-full max-w-3xl text-center backdrop-blur-md"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,40,70,0.95) 0%, rgba(8,16,30,0.95) 100%)",
        }}
      >
        {/* Bouton retour */}
        {path.length > 0 && (
          <motion.button
            onClick={goBack}
            whileTap={{ scale: 0.95 }}
            className="absolute left-6 top-6 text-sm text-cyan-300 hover:text-white underline"
          >
            ← Retour
          </motion.button>
        )}

        {/* Avatar Tina */}
        <motion.img
          src={Tina3}
          alt="TINA"
          className="w-36 mx-auto mb-6 rounded-full border-2 border-cyan-400 shadow-[0_0_40px_rgba(0,255,255,0.6)] bg-gradient-to-b from-cyan-900 to-blue-950"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="🔍 Rechercher un sujet ou une panne (ex : imprimante, Wi-Fi, mot de passe...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0a0f1a] border border-cyan-700 rounded-xl p-3 mb-6 text-white text-center placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        {/* Liste dynamique */}
        <AnimatePresence mode="wait">
          <motion.div
            key={path.join("-") || "root"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {!filtered ? (
              <div className="flex flex-wrap justify-center gap-4">
                {entries.map((item) => (
                  <motion.button
                    key={item.label}
                    onClick={() =>
                      item.isLeaf
                        ? alert(
                            `🧠 Diagnostic à venir pour : ${[
                              ...path,
                              item.label,
                            ].join(" > ")}`
                          )
                        : goNext(item.label)
                    }
                    className="px-6 py-3 bg-cyan-500/90 hover:bg-cyan-400 rounded-2xl text-lg shadow-lg shadow-cyan-700/30 font-semibold text-white transition-transform active:scale-95"
                    whileTap={{ scale: 0.96 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="text-left max-h-[300px] overflow-y-auto mt-4 space-y-2">
                {filtered.length === 0 ? (
                  <p className="text-gray-400 text-center">
                    Aucun résultat trouvé.
                  </p>
                ) : (
                  filtered.map((r, i) => (
                    <div
                      key={i}
                      className="cursor-pointer text-cyan-300 hover:text-white transition"
                      onClick={() =>
                        alert(`🧠 Diagnostic IA → ${r.join(" > ")}`)
                      }
                    >
                      {r.join(" > ")}
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Indicateur de navigation */}
        {path.length > 0 && (
          <p className="mt-6 text-sm text-gray-400 italic">
            📍 Chemin actuel : {path.join(" > ")}
          </p>
        )}

        {/* Pied de page */}
        <div className="mt-8 text-xs text-gray-500">
          Propulsé par <span className="text-cyan-400">Absolute Micro</span> —
          Houdan.
        </div>
      </div>
    </div>
  );
}

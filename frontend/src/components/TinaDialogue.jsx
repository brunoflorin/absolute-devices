// /frontend/src/components/TinaDialogue.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Tina2 from "@assets/Tina2.png";
import MatrixBackground from "@components/MatrixBackground";

/**
 * TinaDialogue.jsx — Moteur de diagnostic intelligent
 * ---------------------------------------------------
 * ✅ Matrix actif en fond
 * ✅ 5 à 6 questions par catégorie
 * ✅ Passage logique (entonnoir) + affichage de solution
 * ✅ Bouton unique “Suivant”
 * ✅ Ajout photo → option sous le bouton
 */

export default function TinaDialogue({ initialContext = "Ordinateur", onFinish, onBack }) {
  console.log("🧠 TinaDialogue - initialContext reçu :", initialContext);

  const [context, setContext] = useState(initialContext);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);

  // 🔹 Structure des questions par contexte
  const flows = {
    Ordinateur: [
      {
        q: "Ton ordinateur est-il un PC de bureau ou un portable ?",
        a: ["PC de bureau", "Portable"],
      },
      {
        q: "Quand tu appuies sur le bouton, entends-tu un bruit (ventilateur, disque) ?",
        a: ["Oui", "Non"],
      },
      {
        q: "L’écran s’allume-t-il ou reste-t-il noir ?",
        a: ["Il s’allume", "Écran noir"],
      },
      {
        q: "As-tu récemment débranché quelque chose (câble, multiprise, écran) ?",
        a: ["Oui", "Non"],
      },
      {
        q: "As-tu testé avec un autre câble d’alimentation ou un autre écran ?",
        a: ["Oui", "Non"],
      },
      {
        q: "Très bien. Tu veux que je te montre la marche à suivre selon tes réponses ?",
        a: ["Oui", "Non"],
      },
    ],
    Logiciel: [
      {
        q: "De quel logiciel s’agit-il ?",
        a: ["Microsoft Office", "Autre"],
      },
      {
        q: "Le programme ne démarre pas, ou il plante pendant l’utilisation ?",
        a: ["Ne démarre pas", "Plante en cours d’usage"],
      },
      {
        q: "As-tu récemment installé une mise à jour Windows ?",
        a: ["Oui", "Non"],
      },
      {
        q: "Le problème est-il apparu sur plusieurs ordinateurs ?",
        a: ["Oui", "Non", "Je ne sais pas"],
      },
      {
        q: "As-tu tenté de réparer ou de réinstaller le logiciel ?",
        a: ["Oui", "Non"],
      },
      {
        q: "Souhaites-tu que je t’indique les étapes de réparation ?",
        a: ["Oui", "Non"],
      },
    ],
  };

  const current = flows[context]?.[step];

  // 🔹 Génération du diagnostic final
  const buildResult = () => {
    if (context === "Ordinateur") {
      if (answers[1] === "Non") {
        return {
          title: "Aucune réaction à l’allumage",
          details: [
            "🔌 Vérifie le câble d’alimentation du PC et de l’écran.",
            "⚡ Teste la prise murale avec une autre charge.",
            "🧰 Si aucun bruit, probable panne d’alimentation interne.",
          ],
        };
      }
      if (answers[2] === "Écran noir") {
        return {
          title: "Écran noir au démarrage",
          details: [
            "🖥️ Vérifie le câble HDMI ou VGA, et l’alimentation de l’écran.",
            "💾 Débranche les périphériques (clé USB, disque) et redémarre.",
            "🪛 Si toujours noir, la carte graphique peut être en cause.",
          ],
        };
      }
      return {
        title: "Ordinateur fonctionnel",
        details: [
          "✅ Ton PC semble réagir correctement.",
          "💡 Si tu veux un contrôle complet, Absolute Micro peut t’aider à distance.",
        ],
      };
    }

    if (context === "Logiciel") {
      if (answers[1] === "Ne démarre pas") {
        return {
          title: "Le logiciel ne démarre plus",
          details: [
            "⚙️ Essaie le mode sans échec ou réinitialise le profil utilisateur.",
            "📦 Réinstalle via Panneau de configuration → Programmes → Réparer.",
            "🧹 Nettoie les fichiers temporaires et redémarre.",
          ],
        };
      }
      if (answers[1] === "Plante en cours d’usage") {
        return {
          title: "Le logiciel plante pendant l’utilisation",
          details: [
            "🔄 Mets à jour Windows et le logiciel concerné.",
            "🧰 Lance un scan antivirus complet.",
            "💾 Sauvegarde puis réinstalle proprement si le problème persiste.",
          ],
        };
      }
    }

    return {
      title: "Diagnostic général",
      details: [
        "Je n’ai pas encore assez d’informations pour conclure.",
        "Tu peux joindre une capture d’écran ou reformuler ton problème.",
      ],
    };
  };

  const handleAnswer = (answer) => {
    const nextAnswers = { ...answers, [step]: answer };
    setAnswers(nextAnswers);
    if (step < flows[context].length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleAttachClick = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setAttachedFile(f);
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
    setAttachedFile(null);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden px-4 py-10"
      style={{ backgroundColor: "#081428", fontFamily: "'Courier New', monospace" }}
    >
      <MatrixBackground />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[28rem] h-[28rem] rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 flex flex-col items-center w-full max-w-3xl bg-[#0b1220]/70 border border-cyan-600/50 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,255,255,0.2)]"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={Tina2}
            alt="TINA"
            className="w-36 h-auto rounded-2xl border-2 border-cyan-400 shadow-[0_0_35px_rgba(0,255,255,0.5)]"
          />
          <div className="mt-2 text-cyan-300 font-semibold text-lg">Assistante virtuelle</div>
        </div>

        {/* Bloc principal */}
        {!showResult ? (
          <>
            {current ? (
              <>
                <p className="text-center text-lg text-gray-200 mb-6">{current.q}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                  {current.a.map((ans, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(ans)}
                      className="px-5 py-3 bg-cyan-500/20 hover:bg-cyan-500/40 text-white rounded-xl border border-cyan-600 transition"
                    >
                      {ans}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-400">Chargement des questions…</p>
            )}

            {/* Ajouter une photo */}
            <div className="flex justify-end mt-6 w-full max-w-md">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              <button
                onClick={handleAttachClick}
                className="text-sm text-cyan-300 hover:text-white flex items-center gap-2"
              >
                📸 Ajouter une photo
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Résultat */}
            <div className="w-full max-w-2xl p-4 rounded-xl bg-[#0a1325] border border-cyan-700/50 mb-6">
              <div className="text-cyan-300 font-semibold text-lg mb-2">{buildResult().title}</div>
              <ul className="list-disc pl-6 space-y-1 text-gray-200">
                {buildResult().details.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={restart}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl font-semibold"
              >
                🔁 Nouveau diagnostic
              </button>
              <button
                onClick={onFinish}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold"
              >
                ⏹️ Retour à l’accueil
              </button>
            </div>
          </>
        )}

        {onBack && !showResult && (
          <button
            onClick={onBack}
            className="mt-6 text-sm text-cyan-300 hover:text-white underline"
          >
            ← Retour
          </button>
        )}
      </motion.div>

      <div className="text-sm text-gray-400 mt-6 relative z-10">
        Diagnostic interactif propulsé par{" "}
        <span className="text-cyan-400">Absolute Micro</span>.
      </div>
    </div>
  );
}

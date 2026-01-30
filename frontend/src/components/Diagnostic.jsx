// /frontend/src/components/Diagnostic.jsx
import { useState } from "react";
import MatrixBackground from "./MatrixBackground";
import Tina2 from "../assets/Tina2.png";

export default function Diagnostic() {
  const [step, setStep] = useState(0);
  const [osChoice, setOsChoice] = useState("");

  const handleChoice = (choice) => {
    setOsChoice(choice || "");
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setOsChoice("");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Fond animé Matrix */}
      <MatrixBackground />

      <div className="relative z-10 flex flex-col items-center bg-[rgba(0,0,0,0.6)] backdrop-blur-md px-8 py-10 rounded-3xl border border-cyan-500 shadow-[0_0_30px_rgba(0,255,255,0.3)] max-w-xl text-center">
        {/* Avatar TINA */}
        <img
          src={Tina2}
          alt="TINA"
          className="w-40 h-auto rounded-2xl border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,255,255,0.4)] mb-6"
        />

        {/* Étape 0 */}
        {step === 0 && (
          <>
            <p className="text-lg mb-6 leading-relaxed">
              Ok, on va parler de ton ordinateur 💻 !<br />
              Il fonctionne sous Windows, macOS ou Linux ?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Windows", "macOS", "Linux", "Je ne sais pas"].map((os) => (
                <button
                  key={os}
                  onClick={() => handleChoice(os)}
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
                >
                  {os}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Étape 1 */}
        {step === 1 && (
          <>
            <p className="text-lg mb-6 leading-relaxed">
              Très bien, tu utilises{" "}
              <span className="text-cyan-400 font-semibold">
                {osChoice || "un système inconnu"}
              </span>
              .<br />
              Peux-tu me dire si ton ordinateur démarre normalement ?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
              >
                Oui
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
              >
                Non
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
              >
                Je ne sais pas
              </button>
            </div>
          </>
        )}

        {/* Étape 2 */}
        {step === 2 && (
          <>
            <p className="text-lg mb-6 leading-relaxed">
              Parfait ✅ ! S’il démarre, quel est le souci principal ?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["L’écran reste noir", "Il est lent", "Autre"].map((issue, i) => (
                <button
                  key={i}
                  onClick={() => setStep(5)}
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
                >
                  {issue}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Étape finale */}
        {step >= 3 && (
          <>
            <p className="text-lg mb-6 leading-relaxed">
              Merci pour les infos 💡.<br />
              Tina analysera le problème dans la prochaine version du diagnostic IA.
            </p>
            <button
              onClick={reset}
              className="px-6 py-2 bg-cyan-700 hover:bg-cyan-600 rounded-lg"
            >
              Recommencer
            </button>
          </>
        )}
      </div>
    </div>
  );
}

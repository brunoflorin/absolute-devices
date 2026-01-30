// /frontend/src/components/App.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tina1 from "@assets/Tina1.png";
import TinaDialogue from "@components/TinaDialogue";

/**
 * App.jsx – Version stable et fluide TINA IA (COMPLÈTE)
 * -----------------------------------------------------
 * ✅ Navigation home → resume → category/dialogue → score
 * ✅ Effet "machine à écrire" inchangé
 * ✅ Bouton principal protégé contre double-clic
 * ✅ Gestion profil/session (localStorage)
 * ✅ Bouton “Se déconnecter”
 * ✅ Imports aliasés (@assets, @components)
 */

function playStartupSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.frequency.exponentialRampToValueAtTime(
      880,
      audioCtx.currentTime + 0.4
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      audioCtx.currentTime + 0.6
    );
    oscillator.stop(audioCtx.currentTime + 0.6);
  } catch (err) {
    console.warn("Son non pris en charge :", err);
  }
}

export default function App() {
  const [screen, setScreen] = useState("home"); // home | login | resume | category | dialogue | score
  const [typedText, setTypedText] = useState("");
  const [textStarted, setTextStarted] = useState(false);
  const [category, setCategory] = useState("");
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  /* -------------------------------------------------------
     Chargement profil + session au démarrage
  ------------------------------------------------------- */
  useEffect(() => {
    const storedProfile = localStorage.getItem("tinaUser");
    const savedSession = localStorage.getItem("tinaSession");

    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        if (parsed?.pseudo) setProfile(parsed);
        else localStorage.removeItem("tinaUser");
      } catch {
        localStorage.removeItem("tinaUser");
      }
    }

    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession);
        setSession(parsedSession);
      } catch {
        localStorage.removeItem("tinaSession");
      }
    }
  }, []);

  /* -------------------------------------------------------
     Texte d’intro selon profil/session
  ------------------------------------------------------- */
  const fullText = profile
    ? session
      ? `Rebonjour ${profile.pseudo} 👋  
Heureuse de te revoir !  
Prêt à reprendre le diagnostic ? 😎`
      : `Bonjour ${profile.pseudo} 👋  
Ravie de te retrouver !  
Tu n’as aucun diagnostic en cours.  
Souhaites-tu en commencer un nouveau ? 🤖`
    : `Bonjour, je suis TINA.  
Je vais t’aider à diagnostiquer  
et résoudre tes problèmes informatiques.  
  
Prêt à commencer ?`;

  /* -------------------------------------------------------
     Effet machine à écrire
  ------------------------------------------------------- */
  useEffect(() => {
    if (screen !== "home") return;
    if (!textStarted) {
      const t = setTimeout(() => setTextStarted(true), 800);
      return () => clearTimeout(t);
    }
    if (typedText.length < fullText.length) {
      const t = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 25);
      return () => clearTimeout(t);
    }
  }, [screen, textStarted, typedText, fullText]);

  /* -------------------------------------------------------
     Navigation (transition douce + anti double clic)
  ------------------------------------------------------- */
  const goTo = (target) => {
    if (transitioning) return;
    setTransitioning(true);
    playStartupSound();
    setTimeout(() => {
      setScreen(target);
      setTransitioning(false);
    }, 200);
  };

  /* -------------------------------------------------------
     Déconnexion utilisateur
  ------------------------------------------------------- */
  const logout = () => {
    localStorage.removeItem("tinaUser");
    localStorage.removeItem("tinaSession");
    setProfile(null);
    setSession(null);
    setScreen("home");
    setTypedText("");
    setTextStarted(false);
  };

  /* -------------------------------------------------------
     Écran “Reprendre la session”
  ------------------------------------------------------- */
  if (screen === "resume") {
    const hasValidSession =
      session && typeof session === "object" && session.lastCategory;

    const handleResume = () => {
      playStartupSound();
      setScreen("dialogue");
    };

    const handleNew = () => {
      playStartupSound();
      localStorage.removeItem("tinaSession");
      setSession(null);
      setScreen("category");
    };

    if (!hasValidSession) {
      handleNew();
      return null;
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#081428] text-white text-center px-6">
        <h2 className="text-3xl mb-6">
          Bienvenue à nouveau 👋{" "}
          <span className="text-cyan-300 font-semibold">
            {profile?.pseudo || "invité"}
          </span>
        </h2>
        <p className="text-lg mb-10 text-gray-300 max-w-xl">
          Tu avais laissé ton diagnostic en pause sur{" "}
          <span className="text-cyan-400">
            {session?.lastCategory || "un sujet inconnu"}
          </span>.
          <br />
          Souhaites-tu le reprendre ou recommencer un autre ?
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleResume}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl text-white font-semibold transition"
          >
            🔄 Reprendre
          </button>
          <button
            onClick={handleNew}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-semibold transition"
          >
            🆕 Nouveau diagnostic
          </button>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------
     TinaDialogue et Score
  ------------------------------------------------------- */
  if (screen === "category" || screen === "dialogue")
    return (
      <TinaDialogue
        initialContext={category}
        onFinish={() => setScreen("score")}
        onBack={() => setScreen("home")}
      />
    );

  if (screen === "score")
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#081428] text-white text-center">
        <h2 className="text-3xl mb-6 text-cyan-300">
          Merci d’avoir utilisé TINA 💡
        </h2>
        <p className="text-lg mb-6 text-gray-300">
          Est-ce que mon aide t’a été utile ?
        </p>
        <div className="flex gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => {
                const updated = { ...session, score: s };
                localStorage.setItem("tinaSession", JSON.stringify(updated));
                setSession(updated);
                setScreen("home");
              }}
              className="w-12 h-12 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400 rounded-full text-lg font-semibold"
            >
              {s}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-400">
          1 = pas du tout utile &nbsp;|&nbsp; 5 = super efficace 🚀
        </p>
      </div>
    );

  /* -------------------------------------------------------
     Page d’accueil
  ------------------------------------------------------- */
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #172554 100%)",
        fontFamily: "'Courier New', monospace",
        color: "#ffffff",
      }}
    >
      {/* Avatar + halo */}
      <motion.div
        className="flex flex-col items-center justify-center text-center gap-8 px-6 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="relative flex justify-center items-center h-[260px] sm:h-[280px]">
          <motion.div
            className="absolute rounded-full bg-cyan-400 blur-[120px] opacity-30"
            style={{ width: "22rem", height: "22rem" }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <img
            src={
              profile?.avatar && profile.avatar.length > 5
                ? profile.avatar
                : Tina1
            }
            onError={(e) => (e.target.src = Tina1)}
            alt={profile?.pseudo || "TINA"}
            className="relative w-48 h-auto rounded-2xl border-4 border-cyan-400 shadow-[0_0_45px_rgba(0,255,255,0.6)]"
          />
        </div>

        {/* Texte d’intro */}
        <div className="max-w-2xl text-center text-xl leading-relaxed min-h-[200px]">
          <motion.span
            key={typedText}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ whiteSpace: "pre-line" }}
          >
            {typedText}
          </motion.span>
          {textStarted && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-cyan-300"
            >
              █
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Bouton principal */}
      <motion.button
        disabled={transitioning}
        className="absolute bottom-16 px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white text-lg font-semibold rounded-full shadow-lg shadow-cyan-500/30 active:scale-95 transition-transform disabled:opacity-50"
        onClick={() => {
          if (transitioning) return;
          if (!profile) goTo("login");
          else if (session) goTo("resume");
          else goTo("category");
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
      >
        {profile
          ? session
            ? "Reprendre l’expérience"
            : "Démarrer un diagnostic"
          : "Démarrer l’expérience"}
      </motion.button>

      {/* Bouton déconnexion */}
      {profile && (
        <motion.button
          onClick={logout}
          className="absolute bottom-6 right-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm text-white border border-gray-500/40 transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          🚪 Se déconnecter
        </motion.button>
      )}

      {/* Footer */}
      <footer
        className="absolute bottom-4 text-center text-sm text-white/70 cursor-pointer select-none"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        Propulsé par{" "}
        <span className="text-cyan-300 underline decoration-cyan-400/40">
          Absolute Micro
        </span>{" "}
        — Houdan — Données locales uniquement.
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-10 bg-cyan-950/95 border border-cyan-400/30 px-4 py-3 rounded-xl text-xs text-white shadow-[0_0_15px_rgba(0,255,255,0.2)] max-w-xs"
            style={{ zIndex: 50 }}
          >
            💻 <b>Absolute Micro</b> — Entreprise humaine basée à Houdan.  
            Ici, même les ordinateurs ont droit à un café ☕ et un diagnostic avec humour 😎.
          </motion.div>
        )}
      </footer>
    </div>
  );
}

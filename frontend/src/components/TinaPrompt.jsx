// /frontend/src/components/TinaPrompt.jsx
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import MatrixBackground from "@components/MatrixBackground";
import Tina2 from "@assets/Tina2.png";

/**
 * TinaPrompt.jsx — Fenêtre de diagnostic libre
 * --------------------------------------------------
 * ✅ Fond Matrix animé
 * ✅ Avatar TINA + halo
 * ✅ Zone de saisie (problème)
 * ✅ Bouton "Envoyer"
 * ✅ Ajout de photo en option
 * ✅ Réponses dynamiques de TINA (simulation locale)
 */

export default function TinaPrompt() {
  const [messages, setMessages] = useState([
    { from: "tina", text: "Bonjour 👋 Je suis TINA, ton assistante Absolute Micro. Décris-moi ton problème informatique." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed && !attachedFile) return;

    // Ajoute ton message à la conversation
    const userMsg = { from: "user", text: trimmed || "(image jointe)" };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    // Simule la réponse IA
    setTimeout(() => {
      const reply = generateResponse(trimmed);
      setMessages((m) => [...m, { from: "tina", text: reply }]);
      setLoading(false);
    }, 900);
  };

  const generateResponse = (text) => {
    const t = text.toLowerCase();
    if (/\b(wifi|internet|connexion|box)\b/.test(t))
      return "Vérifie si la box Internet affiche les voyants habituels. Essaie de la redémarrer pendant 10 secondes, puis reconnecte ton PC.";
    if (/\b(word|excel|office)\b/.test(t))
      return "Il semble que Microsoft Office ait un souci. Ouvre Word en mode sans échec (`winword /safe`) puis tente une réparation rapide via le panneau de configuration.";
    if (/\b(usb|imprimante|périphérique)\b/.test(t))
      return "Vérifie les pilotes de ton périphérique. Ouvre le Gestionnaire de périphériques et regarde s’il y a un triangle jaune.";
    if (/\b(démarre|allume|écran noir|boot)\b/.test(t))
      return "Débranche tout sauf clavier/souris, maintiens le bouton d’alimentation 15 secondes, puis rebranche uniquement le câble principal.";
    return "Je vais réfléchir 🤔. Peux-tu préciser le message d’erreur ou joindre une capture d’écran ?";
  };

  const handleAttachClick = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) setAttachedFile(f);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden px-4 py-10"
      style={{ backgroundColor: "#081428", fontFamily: "'Courier New', monospace" }}
    >
      {/* Fond Matrix */}
      <MatrixBackground />

      {/* Halo visuel */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[28rem] h-[28rem] rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      {/* Conteneur principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-3xl bg-[#0b1220]/70 border border-cyan-600/50 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,255,255,0.2)] flex flex-col"
      >
        {/* Avatar TINA */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={Tina2}
            alt="TINA"
            className="w-36 h-auto rounded-2xl border-2 border-cyan-400 shadow-[0_0_35px_rgba(0,255,255,0.5)]"
          />
          <div className="mt-2 text-cyan-300 font-semibold text-lg">Assistante virtuelle</div>
        </div>

        {/* Journal de discussion */}
        <div className="flex-1 overflow-y-auto max-h-[350px] mb-6 space-y-3 pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.from === "tina"
                  ? "bg-cyan-500/20 border border-cyan-400/40 self-start"
                  : "bg-gray-700/40 border border-gray-500/40 self-end ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="text-cyan-300 text-sm italic">TINA réfléchit… 💭</div>
          )}
        </div>

        {/* Champ de saisie */}
        <div className="flex flex-col w-full space-y-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Décris ton problème (symptômes, messages, depuis quand, ce que tu as essayé)…"
            className="w-full bg-[#0a1325] border border-cyan-700/50 rounded-xl p-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none min-h-[100px]"
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              <button
                onClick={handleAttachClick}
                className="text-sm text-cyan-300 hover:text-white flex items-center gap-1"
              >
                📸 Ajouter une photo
              </button>
              {attachedFile && (
                <span className="text-gray-400 text-xs">{attachedFile.name}</span>
              )}
            </div>

            <button
              onClick={handleSend}
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-xl text-white font-semibold shadow-lg shadow-cyan-500/30 transition"
            >
              Envoyer
            </button>
          </div>
        </div>
      </motion.div>

      {/* Pied de page */}
      <div className="text-sm text-gray-400 mt-6 relative z-10">
        Diagnostic interactif propulsé par{" "}
        <span className="text-cyan-400">Absolute Micro</span>.
      </div>
    </div>
  );
}

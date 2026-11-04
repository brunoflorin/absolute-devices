import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DECKS from "../data/diaporamas.json";

// Lecteur : affiche les pages rendues depuis le PowerPoint (identiques au fichier téléchargé).
export default function Diaporama({ topicId }) {
  const deck = DECKS.find((d) => d.topics.includes(topicId));
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const boxRef = useRef(null);

  useEffect(() => setIndex(0), [topicId]);

  const total = deck ? deck.pages.length : 0;
  const go = useCallback(
    (d) => { setDir(d); setIndex((i) => Math.min(total - 1, Math.max(0, i + d))); },
    [total]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(1); }
      if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!deck) {
    return <div className="text-center text-slate-500 py-12">Le diaporama de ce sujet est en préparation.</div>;
  }

  const fullscreen = () => {
    if (!document.fullscreenElement) boxRef.current?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  return (
    <div>
      <div ref={boxRef} className="relative w-full bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200 flex items-center justify-center"
        style={{ aspectRatio: "16 / 9" }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.img
            key={index}
            src={`/diaporamas/${deck.key}/${deck.pages[index]}`}
            alt={`${deck.titre} — page ${index + 1}`}
            initial={{ opacity: 0, x: 50 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 * dir }}
            transition={{ duration: 0.3 }}
            className="max-w-full max-h-full object-contain"
            onClick={() => go(1)}
          />
        </AnimatePresence>
        <button onClick={() => go(-1)} disabled={index === 0} aria-label="Précédent"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white text-xl disabled:opacity-0">‹</button>
        <button onClick={() => go(1)} disabled={index === total - 1} aria-label="Suivant"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white text-xl disabled:opacity-0">›</button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
        <div className="flex gap-1.5">
          {deck.pages.map((p, i) => (
            <button key={p} onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }} aria-label={`Page ${i + 1}`}
              className="w-2.5 h-2.5 rounded-full" style={{ background: i === index ? deck.couleur : "#cbd5e1" }} />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={fullscreen} className="px-3 py-1.5 rounded-full text-xs border border-slate-300 bg-white hover:bg-slate-100">⛶ Plein écran</button>
          <a href={`/diaporamas/${deck.key}.pptx`} download className="px-3 py-1.5 rounded-full text-xs border text-white"
            style={{ background: deck.couleur, borderColor: deck.couleur }}>⬇ PowerPoint</a>
        </div>
      </div>
    </div>
  );
}

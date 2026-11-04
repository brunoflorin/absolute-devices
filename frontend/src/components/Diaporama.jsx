import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/logo.jpg";
import { getDiaporamaForTopic } from "../data/diaporamas.js";

// Lecteur de diaporama 16:9 : flèches clavier, plein écran, téléchargement PowerPoint.
export default function Diaporama({ topicId }) {
  const deck = getDiaporamaForTopic(topicId);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const boxRef = useRef(null);

  useEffect(() => setIndex(0), [topicId]);

  const total = deck ? deck.slides.length + 1 : 0; // +1 = couverture
  const go = useCallback(
    (d) => {
      setDir(d);
      setIndex((i) => Math.min(total - 1, Math.max(0, i + d)));
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!deck) {
    return (
      <div className="text-center text-slate-500 py-12">
        Le diaporama de ce sujet est en préparation.
      </div>
    );
  }

  const fullscreen = () => {
    const el = boxRef.current;
    if (!document.fullscreenElement) el?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const slide = index === 0 ? null : deck.slides[index - 1];

  return (
    <div>
      <div
        ref={boxRef}
        className="relative w-full bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200"
        style={{ aspectRatio: "16 / 9" }}
      >
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: 60 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 * dir }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex flex-col"
          >
            {slide ? <SlidePage deck={deck} slide={slide} n={index} total={total - 1} /> : <Cover deck={deck} />}
          </motion.div>
        </AnimatePresence>

        <button onClick={() => go(-1)} disabled={index === 0} aria-label="Précédent"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white text-xl disabled:opacity-0">‹</button>
        <button onClick={() => go(1)} disabled={index === total - 1} aria-label="Suivant"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white text-xl disabled:opacity-0">›</button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button key={i} onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
              aria-label={`Page ${i + 1}`}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: i === index ? deck.couleur : "#cbd5e1" }} />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={fullscreen} className="px-3 py-1.5 rounded-full text-xs border border-slate-300 bg-white hover:bg-slate-100">
            ⛶ Plein écran
          </button>
          <a href={`/diaporamas/${deck.key}.pptx`} download
            className="px-3 py-1.5 rounded-full text-xs border text-white" style={{ background: deck.couleur, borderColor: deck.couleur }}>
            ⬇ PowerPoint
          </a>
        </div>
      </div>
    </div>
  );
}

function Cover({ deck }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-[6%]"
      style={{ background: `linear-gradient(135deg, ${deck.couleur} 0%, #231F20 100%)` }}>
      <img src={logo} alt="Absolute Micro" className="h-[14%] rounded-lg bg-white p-2 mb-[4%]" />
      <h2 className="text-white font-bold" style={{ fontSize: "clamp(22px, 5vw, 64px)" }}>{deck.titre}</h2>
      <p className="text-white/85 mt-3" style={{ fontSize: "clamp(13px, 2vw, 28px)" }}>{deck.sousTitre}</p>
    </div>
  );
}

function SlidePage({ deck, slide, n, total }) {
  return (
    <>
      <div className="h-[3%]" style={{ background: deck.couleur }} />
      <div className="flex-1 flex gap-[3%] px-[5%] py-[3.5%] min-h-0">
        <div className="flex-1 flex flex-col min-w-0">
          <h3 className="font-bold leading-tight" style={{ color: deck.couleur, fontSize: "clamp(16px, 2.9vw, 40px)" }}>
            {slide.titre}
          </h3>
          <p className="text-slate-700 mt-[2.5%]" style={{ fontSize: "clamp(11px, 1.6vw, 22px)" }}>{slide.accroche}</p>
          <ul className="mt-[3%] space-y-[1.8%]">
            {slide.points.map((p) => (
              <li key={p} className="flex gap-2 items-start text-slate-800" style={{ fontSize: "clamp(11px, 1.55vw, 21px)" }}>
                <span className="mt-[0.45em] w-2 h-2 rounded-full shrink-0" style={{ background: deck.couleur }} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {slide.analogie && (
            <div className="mt-auto rounded-lg px-[3%] py-[2%] bg-slate-100 border-l-4 text-slate-700 italic"
              style={{ borderColor: deck.couleur, fontSize: "clamp(10px, 1.4vw, 19px)" }}>
              💡 {slide.analogie}
            </div>
          )}
        </div>
        <div className="w-[34%] flex items-center justify-center min-h-0">
          {slide.image ? (
            <img src={encodeURI(slide.image)} alt="" className="max-h-full max-w-full object-contain rounded-lg shadow" />
          ) : (
            <div className="w-full aspect-square rounded-full flex items-center justify-center"
              style={{ background: `${deck.couleur}18`, fontSize: "clamp(40px, 9vw, 130px)" }}>
              {slide.icone}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between px-[5%] pb-[1.5%] text-slate-400" style={{ fontSize: "clamp(9px, 1vw, 13px)" }}>
        <span>Absolute Micro — 01 34 87 74 43</span>
        <span>{n} / {total}</span>
      </div>
    </>
  );
}

// /frontend/src/components/TinaDiagnostic.jsx
import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MatrixBackground from "@components/MatrixBackground";
import Tina2 from "@assets/Tina2.png";

/**
 * TinaDiagnostic.jsx — Moteur de diagnostic intelligent v1
 * --------------------------------------------------------
 * ✅ Visuel Matrix + halo
 * ✅ Arborescence ADAPTATIVE (mémoire d’état)
 * ✅ Pondération par causes (scores)
 * ✅ Retour à l’étape précédente (pile d’historique)
 * ✅ Passage au prompt libre si nécessaire
 * ✅ Ajout de photo (option)
 * ✅ Résultat synthèse + prochaines actions
 *
 * Utilisation : routez /diagnostic → <TinaDiagnostic />
 */

const CAUSES = [
  "Ecran/Moniteur",
  "Câble/Connexion vidéo",
  "Carte Graphique (GPU)",
  "Alimentation (PSU)",
  "RAM/Mémoire",
  "Disque/SSD",
  "Pilotes/Windows",
  "Réseau/Internet",
  "Logiciels/Office",
  "Autre",
];

// Setup de base du score
const baseScores = Object.fromEntries(CAUSES.map((c) => [c, 0]));

// Outils
const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));
const pct = (n) => `${Math.round(clamp(n))}%`;

// Question type
/**
 * question = {
 *   id: "power_on",
 *   text: "Le PC s'allume-t-il ?",
 *   type: "choice" | "input",
 *   choices: [{id, label, effect: (ctx)=>void, goto: "id" | (ctx)=>"id"}],
 *   visibleIf?: (ctx)=>boolean
 * }
 * ctx = { answers: {}, scores: {...}, facts: {...} }
 */

export default function TinaDiagnostic() {
  const navigate = useNavigate();

  // --- état global diagnostic
  const [ctx, setCtx] = useState({
    answers: {},       // {questionId: value}
    scores: { ...baseScores },
    facts: {
      screenOn: null,
      beeps: null,
      bsod: null,
      displaySignal: null,
    },
  });

  // navigation dans le flux
  const [currentId, setCurrentId] = useState("entry");
  const [history, setHistory] = useState([]); // pile d'étapes {id, ctxSnapshot}
  const [attachedFile, setAttachedFile] = useState(null);
  const fileRef = useRef(null);

  // ---- Détecteurs texte libre
  const analyzeFreeText = (t) => {
    const scores = {};
    CAUSES.forEach((c) => (scores[c] = 0));
    const s = (t || "").toLowerCase();

    if (/\bbsod|écran bleu|blue screen|stop code|irql|memory|kernel\b/.test(s)) {
      scores["RAM/Mémoire"] += 18;
      scores["Pilotes/Windows"] += 16;
      scores["Carte Graphique (GPU)"] += 10;
      scores["Disque/SSD"] += 6;
    }
    if (/\b(no signal|pas de signal|hdmi|displayport|dp|vga|dvi)\b/.test(s)) {
      scores["Câble/Connexion vidéo"] += 25;
      scores["Ecran/Moniteur"] += 10;
      scores["Carte Graphique (GPU)"] += 8;
    }
    if (/\bventilo|ventilateur|souffle|psu|alimentation\b/.test(s)) {
      scores["Alimentation (PSU)"] += 18;
      scores["Carte Graphique (GPU)"] += 8;
    }
    if (/\bcliquetis|clic clic|gratte|lenteur disque|smart\b/.test(s)) {
      scores["Disque/SSD"] += 25;
    }
    if (/\bword|excel|office|outlook|microsoft 365\b/.test(s)) {
      scores["Logiciels/Office"] += 28;
    }
    if (/\bwifi|internet|réseau|ethernet|box\b/.test(s)) {
      scores["Réseau/Internet"] += 28;
    }
    return scores;
  };

  // ---- Questions adaptatives
  const QUESTIONS = useMemo(() => {
    return [
      {
        id: "entry",
        text:
          "Choisis une entrée ou décris directement ton problème (BSOD, pas de signal HDMI, Word ne s’ouvre plus, etc.).",
        type: "choice",
        choices: [
          { id: "boot", label: "Mon PC ne démarre pas / écran noir" },
          { id: "display", label: "Affichage / écran / pas de signal" },
          { id: "bsod", label: "Écran bleu (BSOD)" },
          { id: "office", label: "Word/Excel/Outlook plante" },
          { id: "network", label: "Internet / Wi-Fi / réseau" },
          { id: "free", label: "Décrire mon problème" },
        ],
        goto: (c) => {
          switch (c) {
            case "boot":
              return "power_on";
            case "display":
              return "screen_power";
            case "bsod":
              return "bsod_start";
            case "office":
              return "office_start";
            case "network":
              return "net_start";
            case "free":
              return "free_text";
            default:
              return "free_text";
          }
        },
      },

      // ===== Bloc Démarrage / Boot =====
      {
        id: "power_on",
        text: "Le PC s’allume-t-il (voyants/ventilateurs) ?",
        type: "choice",
        choices: [
          {
            id: "yes",
            label: "Oui, il s’allume",
            effect: (ctx) => (ctx.facts.powerOn = true),
            goto: "screen_power",
          },
          {
            id: "no",
            label: "Non, rien ne s’allume",
            effect: (ctx) => {
              ctx.facts.powerOn = false;
              ctx.scores["Alimentation (PSU)"] += 25;
            },
            goto: "psu_advices",
          },
        ],
      },
      {
        id: "psu_advices",
        text: "Vérifie l’alimentation :",
        type: "advice",
        bullets: [
          "Test d’une autre prise secteur et d’un autre câble.",
          "Appui long 20s sur le bouton d’alimentation (décharge).",
          "Si c’est une tour : vérifie l’interrupteur au dos du PSU.",
        ],
        goto: "result",
      },

      // ===== Bloc Affichage =====
      {
        id: "screen_power",
        text: "L’écran s’allume-t-il (logo/LED) ?",
        type: "choice",
        choices: [
          {
            id: "on",
            label: "Oui",
            effect: (ctx) => (ctx.facts.screenOn = true),
            goto: "display_signal",
          },
          {
            id: "off",
            label: "Non",
            effect: (ctx) => {
              ctx.facts.screenOn = false;
              ctx.scores["Ecran/Moniteur"] += 18;
              ctx.scores["Câble/Connexion vidéo"] += 8;
            },
            goto: "monitor_check",
          },
        ],
        visibleIf: (ctx) => ctx.facts.powerOn !== false, // inutile si rien ne s’allume
      },
      {
        id: "monitor_check",
        text: "Contrôle de l’écran",
        type: "advice",
        bullets: [
          "Teste un autre câble (HDMI/DP) et une autre entrée de l’écran.",
          "Essaie, si possible, un **autre écran** (ou TV).",
          "Si l’écran reste éteint : suspecte l’alimentation de l’écran.",
        ],
        goto: "result",
      },
      {
        id: "display_signal",
        text: "L’écran indique-t-il **un signal** (image, logo BIOS, curseur), ou **pas de signal** ?",
        type: "choice",
        choices: [
          {
            id: "has",
            label: "Il y a de l’image / du signal",
            effect: (ctx) => (ctx.facts.displaySignal = true),
            goto: "image_ok",
          },
          {
            id: "no",
            label: "Pas de signal",
            effect: (ctx) => {
              ctx.facts.displaySignal = false;
              ctx.scores["Câble/Connexion vidéo"] += 20;
              ctx.scores["Carte Graphique (GPU)"] += 12;
            },
            goto: "no_signal_steps",
          },
        ],
        visibleIf: (ctx) => ctx.facts.screenOn === true || ctx.facts.powerOn === true,
      },
      {
        id: "image_ok",
        text:
          "Tu as une image mais un souci après (clignote, artefacts, redémarre, etc.) ?",
        type: "choice",
        choices: [
          {
            id: "ok",
            label: "Non, l’image est OK",
            effect: (ctx) => (ctx.scores["Autre"] += 5),
            goto: "result",
          },
          {
            id: "glitches",
            label: "Oui, artefacts/plantages/écran noir en jeu",
            effect: (ctx) => {
              ctx.scores["Carte Graphique (GPU)"] += 20;
              ctx.scores["Pilotes/Windows"] += 10;
              ctx.scores["Alimentation (PSU)"] += 6;
            },
            goto: "gpu_steps",
          },
        ],
      },
      {
        id: "no_signal_steps",
        text: "Procédure 'pas de signal' :",
        type: "advice",
        bullets: [
          "Éteins le PC, débranche et rebranche le câble vidéo, teste une autre entrée (HDMI/DP) et un autre câble.",
          "Si carte graphique dédiée : branche l’écran **sur la sortie carte mère** pour tester.",
          "Retire puis réinsère la carte graphique (PC éteint, prise débranchée).",
          "Réinitialise le BIOS (en dernier recours).",
        ],
        goto: "result",
      },
      {
        id: "gpu_steps",
        text: "Étapes ciblées GPU :",
        type: "advice",
        bullets: [
          "Désinstalle proprement le pilote graphique (DDU) puis réinstalle depuis le constructeur.",
          "Vérifie les connecteurs PCI-E d’alimentation de la carte.",
          "Surveille les températures (HWInfo) et teste avec un autre câble/écran.",
        ],
        goto: "result",
      },

      // ===== Bloc BSOD =====
      {
        id: "bsod_start",
        text: "Écran bleu détecté : vois-tu un **Stop Code** (ex. MEMORY_MANAGEMENT) ?",
        type: "choice",
        choices: [
          { id: "have", label: "Oui, j’en ai un", goto: "bsod_code" },
          { id: "no", label: "Non / je ne sais pas", goto: "bsod_generic" },
        ],
        effect: (ctx) => {
          ctx.facts.bsod = true;
          ctx.scores["RAM/Mémoire"] += 12;
          ctx.scores["Pilotes/Windows"] += 12;
          ctx.scores["Carte Graphique (GPU)"] += 6;
        },
      },
      {
        id: "bsod_code",
        text: "Entre ton Stop Code exact (copier tel quel) :",
        type: "input",
        placeholder: "Ex. MEMORY_MANAGEMENT",
        effect: (ctx, value) => {
          const v = (value || "").toUpperCase();
          ctx.answers["bsod_code"] = v;
          if (/MEMORY|IRQL|PFN|PAGE|NONPAGE/i.test(v)) {
            ctx.scores["RAM/Mémoire"] += 18;
          }
          if (/VIDEO|TDR|NVLDDMKM|AMDKMDAG|DXGI/i.test(v)) {
            ctx.scores["Carte Graphique (GPU)"] += 18;
            ctx.scores["Pilotes/Windows"] += 10;
          }
          if (/SYSTEM_SERVICE_EXCEPTION|KMODE|DRIVER/i.test(v)) {
            ctx.scores["Pilotes/Windows"] += 18;
          }
          if (/NTFS|DISK|STOR|INACCESSIBLE/i.test(v)) {
            ctx.scores["Disque/SSD"] += 16;
          }
        },
        goto: "bsod_steps",
      },
      {
        id: "bsod_generic",
        text: "Étapes de base BSOD :",
        type: "advice",
        bullets: [
          "Mode sans échec → désinstalle les pilotes récents et/ou logiciels douteux.",
          "Invite Admin : `sfc /scannow` puis `DISM /Online /Cleanup-Image /RestoreHealth`.",
          "Mise à jour pilote chipset/graphique et Windows Update.",
          "Diagnostic mémoire Windows et `chkdsk /f` au redémarrage.",
        ],
        goto: "result",
      },
      {
        id: "bsod_steps",
        text: "Procédure ciblée selon le code :",
        type: "advice",
        bullets: (ctx) => {
          const code = ctx.answers["bsod_code"] || "";
          const arr = [];
          if (/MEMORY|IRQL|PFN|PAGE|NONPAGE/i.test(code)) {
            arr.push(
              "Diagnostic mémoire Windows (ou MemTest). Retire/replace la/les barrettes.",
              "Réinitialise le XMP/EXPO (si profil overclock actif)."
            );
          }
          if (/VIDEO|TDR|NVLDDMKM|AMDKMDAG|DXGI/i.test(code)) {
            arr.push(
              "Nettoie et réinstalle le pilote graphique (DDU).",
              "Teste une autre version du pilote (WHQL)."
            );
          }
          if (/SYSTEM_SERVICE_EXCEPTION|KMODE|DRIVER/i.test(code)) {
            arr.push(
              "Pilotes : désinstalle le périphérique incriminé (si indiqué), réinstalle proprement.",
              "Vérifie l’intégrité des fichiers système (SFC/DISM)."
            );
          }
          if (/NTFS|DISK|STOR|INACCESSIBLE/i.test(code)) {
            arr.push(
              "Sauvegarde immédiate si possible. `chkdsk /f` au redémarrage.",
              "Vérifie l’état SMART (CrystalDiskInfo)."
            );
          }
          if (!arr.length) {
            arr.push(
              "Applique les étapes BSOD génériques (pilotes, SFC/DISM, mémoire, disque)."
            );
          }
          return arr;
        },
        goto: "result",
      },

      // ===== Bloc Office =====
      {
        id: "office_start",
        text: "Quel logiciel te pose souci ?",
        type: "choice",
        choices: [
          { id: "word", label: "Word" },
          { id: "excel", label: "Excel" },
          { id: "outlook", label: "Outlook" },
          { id: "suite", label: "Suite Office / 365" },
        ],
        effect: (ctx) => (ctx.scores["Logiciels/Office"] += 25),
        goto: "office_steps",
      },
      {
        id: "office_steps",
        text: "Étapes Office :",
        type: "advice",
        bullets: [
          "Mode sans échec : `Win+R` → `winword /safe` (ou `excel /safe`).",
          "Panneau de configuration → Programmes → Microsoft 365 → **Modifier** → **Réparation rapide**.",
          "Si besoin : **Réparation en ligne**. Puis vide `%temp%` et redémarre.",
        ],
        goto: "result",
      },

      // ===== Bloc Réseau =====
      {
        id: "net_start",
        text: "Problème réseau : que constates-tu ?",
        type: "choice",
        choices: [
          { id: "wifi", label: "Le Wi-Fi décroche / faible" },
          { id: "ethernet", label: "Ethernet ne marche pas" },
          { id: "general", label: "Internet KO partout" },
        ],
        effect: (ctx) => (ctx.scores["Réseau/Internet"] += 24),
        goto: "net_steps",
      },
      {
        id: "net_steps",
        text: "Étapes réseau :",
        type: "advice",
        bullets: [
          "Redémarre la box (coupure 10s), attends 2 minutes.",
          "PC : Paramètres → Réseau → Dépanner / réinitialiser l’adaptateur.",
          "Teste en Ethernet direct. Si OK en Ethernet : le souci est côté Wi-Fi.",
        ],
        goto: "result",
      },

      // ===== Prompt libre =====
      {
        id: "free_text",
        text:
          "Décris ton problème en quelques lignes (ex.: écran bleu VIDEO_TDR_FAILURE, pas de signal HDMI, Word ne s’ouvre plus…).",
        type: "input",
        placeholder: "Ton description ici…",
        effect: (ctx, value) => {
          ctx.answers["free_text"] = value;
          const add = analyzeFreeText(value);
          for (const k in add) ctx.scores[k] += add[k];
        },
        goto: "result",
      },

      // ===== Résultat =====
      {
        id: "result",
        text: "Résultat du diagnostic",
        type: "result",
      },
    ];
  }, []);

  const getQ = (id) => QUESTIONS.find((q) => q.id === id);

  // --- gestion des réponses
  const goNext = (nextId) => {
    setHistory((h) => [...h, { id: currentId, ctx: structuredClone(ctx) }]);
    setCurrentId(nextId);
  };

  const handleChoice = (q, choiceId) => {
    const ch = q.choices.find((c) => c.id === choiceId);
    if (!ch) return;
    const newCtx = structuredClone(ctx);
    newCtx.answers[q.id] = choiceId;
    if (typeof q.effect === "function") q.effect(newCtx, choiceId);
    if (typeof ch.effect === "function") ch.effect(newCtx);
    setCtx(newCtx);

    const next =
      typeof q.goto === "function"
        ? q.goto(choiceId, newCtx)
        : typeof ch.goto === "function"
        ? ch.goto(newCtx)
        : ch.goto || q.goto || "result";
    goNext(next);
  };

  const handleInput = (q, value) => {
    const newCtx = structuredClone(ctx);
    if (typeof q.effect === "function") q.effect(newCtx, value);
    setCtx(newCtx);

    const next = typeof q.goto === "function" ? q.goto(value, newCtx) : q.goto || "result";
    goNext(next);
  };

  const handleBack = () => {
    if (!history.length) {
      navigate(-1);
      return;
    }
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCtx(prev.ctx);
    setCurrentId(prev.id);
  };

  // --- rendu question
  const QuestionCard = ({ q }) => {
    if (q.visibleIf && !q.visibleIf(ctx)) return null;

    if (q.type === "advice") {
      const bullets = typeof q.bullets === "function" ? q.bullets(ctx) : q.bullets;
      return (
        <div className="w-full">
          <h3 className="text-cyan-300 font-semibold mb-3">{q.text}</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-200">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="mt-5 text-center">
            <button
              onClick={() => goNext("result")}
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl font-semibold"
            >
              Continuer
            </button>
          </div>
        </div>
      );
    }

    if (q.type === "choice") {
      return (
        <div className="w-full">
          <p className="text-center text-lg text-gray-200 mb-6">{q.text}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {q.choices.map((c) => (
              <button
                key={c.id}
                onClick={() => handleChoice(q, c.id)}
                className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/35 text-white rounded-xl border border-cyan-400/40"
              >
                {c.label}
              </button>
            ))}
          </div>
          {/* Option : joindre une image */}
          <div className="flex justify-center mt-5">
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={(e) => setAttachedFile(e.target.files?.[0] || null)}
              accept="image/*"
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="text-sm text-cyan-300 hover:text-white underline"
            >
              📸 Ajouter une photo
            </button>
            {attachedFile && (
              <span className="ml-2 text-gray-400 text-xs">{attachedFile.name}</span>
            )}
          </div>
        </div>
      );
    }

    if (q.type === "input") {
      const [val, setVal] = useState("");
      return (
        <div className="w-full">
          <p className="text-center text-lg text-gray-200 mb-4">{q.text}</p>
          <textarea
            autoFocus
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={q.placeholder || ""}
            className="w-full bg-[#0a1325] border border-cyan-700/50 rounded-xl p-4 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none min-h-[110px]"
          />
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={() => handleInput(q, val)}
              disabled={!val.trim()}
              className={`px-6 py-2 rounded-xl font-semibold ${
                val.trim()
                  ? "bg-cyan-500 hover:bg-cyan-400 text-white"
                  : "bg-cyan-500/40 text-white/60 cursor-not-allowed"
              }`}
            >
              Valider
            </button>
            <div className="flex items-center gap-3">
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                onChange={(e) => setAttachedFile(e.target.files?.[0] || null)}
                accept="image/*"
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="text-sm text-cyan-300 hover:text-white underline"
              >
                📸 Ajouter une photo
              </button>
              {attachedFile && (
                <span className="text-gray-400 text-xs truncate max-w-[180px]">
                  {attachedFile.name}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }

    // page d'entrée
    if (q.id === "entry") {
      return (
        <div className="w-full">
          <p className="text-center text-lg text-gray-200 mb-6">{q.text}</p>
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {q.choices.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  const next = q.goto ? q.goto(c.id) : "free_text";
                  goNext(next);
                }}
                className="px-5 py-3 rounded-xl border border-cyan-600/60 text-white font-medium hover:bg-cyan-500/30 transition bg-[#0d1930]"
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="text-center mt-5">
            <button
              onClick={() => goNext("free_text")}
              className="underline text-cyan-300 hover:text-white text-sm"
            >
              ✍️ Décrire mon problème
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  // --- Synthèse résultat
  const ResultCard = () => {
    const sorted = Object.entries(ctx.scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    return (
      <div className="w-full">
        <h3 className="text-cyan-300 font-semibold mb-4">Synthèse probable</h3>
        <div className="space-y-3">
          {sorted.map(([cause, score]) => (
            <div key={cause} className="bg-[#0a1325] border border-cyan-700/40 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-100">{cause}</span>
                <span className="text-cyan-300 font-semibold">{pct(score)}</span>
              </div>
              <div className="h-2 bg-cyan-900/40 rounded mt-2">
                <div
                  className="h-2 bg-cyan-400 rounded"
                  style={{ width: `${clamp(score, 0, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 text-gray-300 text-sm">
          {ctx.facts.bsod ? (
            <p>
              🟦 BSOD détecté : partage le <strong>Stop Code</strong> exact pour une
              procédure ciblée, ou contacte Absolute Micro pour une prise en main à distance.
            </p>
          ) : ctx.facts.displaySignal === false ? (
            <p>
              🖥️ “Pas de signal” : privilégie test câble/entrée/écran et vérifie l’insertion de la carte graphique.
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={() => {
              setCtx({ answers: {}, scores: { ...baseScores }, facts: {} });
              setHistory([]);
              setCurrentId("entry");
            }}
            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-xl font-semibold"
          >
            🔁 Nouveau diagnostic
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold"
          >
            ⏹️ Retour à l’accueil
          </button>
          <a
            href="mailto:tina@absolutemicro.fr"
            className="px-6 py-2 bg-cyan-900/40 hover:bg-cyan-900/60 text-cyan-200 rounded-xl border border-cyan-700/50"
          >
            ✉️ Contacter Absolute Micro
          </a>
        </div>
      </div>
    );
  };

  // --- rendu principal
  const q = getQ(currentId);

  useEffect(() => {
    // sécurité : si question masquée par visibleIf → passer au résultat
    if (q && q.visibleIf && !q.visibleIf(ctx)) {
      setCurrentId("result");
    }
  }, [currentId]); // eslint-disable-line

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
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 flex flex-col items-center w-full max-w-3xl bg-[#0b1220]/70 border border-cyan-600/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,255,255,0.2)]"
      >
        {/* Barre haute */}
        <div className="w-full flex items-center justify-between mb-2">
          <button
            onClick={handleBack}
            className="text-cyan-300 hover:text-white text-sm underline"
          >
            ← Retour
          </button>
          <div className="text-xs text-gray-400">Diagnostic TINA</div>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={Tina2}
            alt="TINA"
            className="w-36 h-auto rounded-2xl border-2 border-cyan-400 shadow-[0_0_35px_rgba(0,255,255,0.5)]"
          />
          <div className="mt-2 text-cyan-300 font-semibold">Assistante virtuelle</div>
        </div>

        {/* Corps */}
        {q?.type === "result" ? <ResultCard /> : <QuestionCard q={q} />}
      </motion.div>

      <div className="text-sm text-gray-400 mt-6 relative z-10">
        Diagnostic interactif propulsé par <span className="text-cyan-400">Absolute Micro</span>.
      </div>
    </div>
  );
}

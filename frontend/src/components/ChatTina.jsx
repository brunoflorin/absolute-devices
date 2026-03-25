// /frontend/src/components/ChatTina.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Tina1 from "@assets/Tina1.png";
import Tina2 from "@assets/Tina2.png";
import Tina3 from "@assets/Tina3.png";
import Tina4 from "@assets/Tina4.png";
import Tina5 from "@assets/Tina5.png";
import Tina6 from "@assets/Tina6.png";
import MatrixBackground from "@components/MatrixBackground";

/**
 * ChatTina.jsx — Connexion / Création / Visite
 * ----------------------------------------------------
 * ✅ Fond Matrix actif
 * ✅ Redirection vers /diagnostic après succès
 * ✅ Validation RGPD
 * ✅ Interface cohérente avec halo cyan
 */

async function sha256(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const uid = () => Math.random().toString(36).slice(2, 10);

const countries = [
  { flag: "🇫🇷", name: "FR France", code: "+33" },
  { flag: "🇧🇪", name: "BE Belgique", code: "+32" },
  { flag: "🇨🇭", name: "CH Suisse", code: "+41" },
  { flag: "🇨🇦", name: "CA Canada", code: "+1" },
  { flag: "🇺🇸", name: "US États-Unis", code: "+1" },
  { flag: "🇬🇧", name: "UK Royaume-Uni", code: "+44" },
  { flag: "🇩🇪", name: "DE Allemagne", code: "+49" },
  { flag: "🇪🇸", name: "ES Espagne", code: "+34" },
  { flag: "🇮🇹", name: "IT Italie", code: "+39" },
  { flag: "🇵🇹", name: "PT Portugal", code: "+351" },
  { flag: "🇳🇱", name: "NL Pays-Bas", code: "+31" },
];

export default function ChatTina() {
  const navigate = useNavigate();
  const [stepImg, setStepImg] = useState(0);
  const tinaSteps = [Tina1, Tina2, Tina3, Tina4, Tina5, Tina6];

  // États d’authentification
  const [authMode, setAuthMode] = useState("login"); // login | register | forgot
  const [authMsg, setAuthMsg] = useState("");

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Inscription
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    indicatif: countries[0].code,
    pays: countries[0].name,
    telephone: "",
    password: "",
    rgpd: false,
  });
  const [formError, setFormError] = useState("");

  const cardRef = useRef(null);

  // Si déjà connecté → diagnostic
  useEffect(() => {
    const sess = sessionStorage.getItem("tinaSession");
    if (sess) navigate("/diagnostic");
    else {
      const stored = JSON.parse(localStorage.getItem("tinaUsers") || "[]");
      setAuthMode(stored.length ? "login" : "register");
    }
  }, [navigate]);

  // Validation des champs
  const looksLikeJoke = (s = "") =>
    ["lol", "fuck", "tamere", "merde"].some((b) =>
      s.toLowerCase().includes(b)
    );
  const invalidName = (s) =>
    !s || s.trim().length < 2 || /\d/.test(s) || looksLikeJoke(s);
  const isValidEmail = (e) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((e || "").trim());
  const isValidPhone = (p) =>
    /^[0-9\s\-\.]{6,}$/.test((p || "").replace(/\s+/g, "")) &&
    !/^0{6,}$/.test(p || "");

  const updateField = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleCountryChange = (newName) => {
    const c = countries.find((x) => x.name === newName) || countries[0];
    setForm((f) => ({ ...f, pays: c.name, indicatif: c.code }));
  };

  // Connexion
  const login = async (e) => {
    e.preventDefault();
    setAuthMsg("");
    const users = JSON.parse(localStorage.getItem("tinaUsers") || "[]");
    const user = users.find(
      (u) => u.email.toLowerCase() === (loginEmail || "").toLowerCase()
    );
    if (!user) return setAuthMsg("Utilisateur introuvable.");
    const hash = await sha256(loginPass || "");
    if (user.passwordHash !== hash) return setAuthMsg("Mot de passe incorrect.");
    const sess = { email: user.email, prenom: user.prenom, id: user.id };
    sessionStorage.setItem("tinaSession", JSON.stringify(sess));
    navigate("/diagnostic");
  };

  // Inscription
  const register = async (e) => {
    e.preventDefault();
    setFormError("");
    setAuthMsg("");

    if (invalidName(form.nom) || invalidName(form.prenom))
      return setFormError("Nom/prénom invalides.");
    if (!isValidEmail(form.email)) return setFormError("Email non valide.");
    if (!isValidPhone(form.telephone))
      return setFormError("Téléphone invalide.");
    if (!form.password || form.password.length < 6)
      return setFormError("Mot de passe requis (min 6).");
    if (!form.rgpd) return setFormError("Merci d’accepter la RGPD 🤝");

    const users = JSON.parse(localStorage.getItem("tinaUsers") || "[]");
    const exists = users.find(
      (u) => u.email.toLowerCase() === form.email.toLowerCase()
    );
    if (exists) {
      setFormError("Ce compte existe déjà. Connecte-toi 🙂");
      setAuthMode("login");
      return;
    }

    const record = {
      id: uid(),
      nom: form.nom.trim(),
      prenom: form.prenom.trim(),
      email: form.email.trim(),
      indicatif: form.indicatif,
      pays: form.pays,
      telephone: form.telephone.trim(),
      passwordHash: await sha256(form.password),
      rgpd: true,
      dateInscription: new Date().toISOString(),
    };
    localStorage.setItem("tinaUsers", JSON.stringify([...users, record]));
    const sess = { email: record.email, prenom: record.prenom, id: record.id };
    sessionStorage.setItem("tinaSession", JSON.stringify(sess));
    navigate("/diagnostic");
  };

  // Visite simple
  const loginAsGuest = () => {
    sessionStorage.setItem(
      "tinaSession",
      JSON.stringify({ email: null, prenom: "Visiteur", visiteur: true })
    );
    navigate("/diagnostic");
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0b1020 0%, #0c2040 50%, #0a1733 100%)",
        fontFamily: "'Courier New', monospace",
        color: "#fff",
      }}
    >
      <MatrixBackground />

      {/* Halo cyan */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
      </div>

      {/* Carte centrale */}
      <motion.div
        ref={cardRef}
        className="relative z-10 w-full max-w-5xl bg-[#0b1220]/80 border border-cyan-500/40 rounded-3xl shadow-[0_0_45px_rgba(0,255,255,0.25)] p-6 md:p-10 flex gap-6"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Colonne gauche : TINA */}
        <div className="hidden md:flex flex-col items-center justify-start w-56">
          <motion.img
            src={tinaSteps[Math.min(stepImg, tinaSteps.length - 1)]}
            onError={(e) => (e.currentTarget.src = Tina1)}
            alt="TINA"
            className="w-44 h-auto rounded-2xl border-4 border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.6)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="mt-3 text-cyan-300 font-semibold text-center">
            “J’ai mis mes lunettes bleues, on peut commencer.”
          </div>
        </div>

        {/* Colonne droite : Auth */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              onClick={() => setAuthMode("login")}
              className={`px-4 py-2 rounded-full transition ${
                authMode === "login"
                  ? "bg-cyan-600 text-white"
                  : "bg-cyan-900/40 text-cyan-200 hover:bg-cyan-800/50"
              }`}
            >
              Se connecter
            </button>
            <button
              onClick={() => setAuthMode("register")}
              className={`px-4 py-2 rounded-full transition ${
                authMode === "register"
                  ? "bg-cyan-600 text-white"
                  : "bg-cyan-900/40 text-cyan-200 hover:bg-cyan-800/50"
              }`}
            >
              Créer un compte
            </button>
            <button
              onClick={() => setAuthMode("forgot")}
              className={`px-4 py-2 rounded-full transition ${
                authMode === "forgot"
                  ? "bg-cyan-600 text-white"
                  : "bg-cyan-900/40 text-cyan-200 hover:bg-cyan-800/50"
              }`}
            >
              Mot de passe oublié
            </button>

            <div className="ml-auto text-sm text-gray-300">
              (ou{" "}
              <button
                onClick={loginAsGuest}
                className="underline text-cyan-300 hover:text-white"
              >
                simple visite
              </button>
              )
            </div>
          </div>

          {/* --- PANELS --- */}
          {authMode === "login" && (
            <motion.form
              onSubmit={login}
              className="grid grid-cols-1 gap-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <input
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="p-3 rounded-xl bg-[#0b162b] border border-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
              <input
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="Mot de passe"
                type="password"
                className="p-3 rounded-xl bg-[#0b162b] border border-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
              {authMsg && (
                <div className="text-cyan-200 text-sm">{authMsg}</div>
              )}
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow transition"
              >
                Se connecter
              </button>
            </motion.form>
          )}

          {authMode === "register" && (
            <motion.form
              onSubmit={register}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <input
                value={form.nom}
                onChange={(e) => updateField("nom", e.target.value)}
                placeholder="Nom"
                className="p-3 rounded-xl bg-[#0b162b] border border-cyan-700 focus:ring-2 focus:ring-cyan-500"
              />
              <input
                value={form.prenom}
                onChange={(e) => updateField("prenom", e.target.value)}
                placeholder="Prénom"
                className="p-3 rounded-xl bg-[#0b162b] border border-cyan-700 focus:ring-2 focus:ring-cyan-500"
              />
              <input
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="Email"
                type="email"
                className="md:col-span-2 p-3 rounded-xl bg-[#0b162b] border border-cyan-700 focus:ring-2 focus:ring-cyan-500"
              />
              <select
                value={form.pays}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="p-3 rounded-xl bg-[#0b162b] border border-cyan-700"
              >
                {countries.map((c, i) => (
                  <option key={i} value={c.name}>
                    {`${c.flag} ${c.name} (${c.code})`}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <input
                  value={form.indicatif}
                  readOnly
                  className="w-24 p-3 rounded-xl bg-[#0b162b] border border-cyan-700 text-center"
                />
                <input
                  value={form.telephone}
                  onChange={(e) =>
                    updateField("telephone", e.target.value)
                  }
                  placeholder="Téléphone"
                  className="flex-1 p-3 rounded-xl bg-[#0b162b] border border-cyan-700 focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  updateField("password", e.target.value)
                }
                placeholder="Mot de passe (min 6)"
                className="md:col-span-2 p-3 rounded-xl bg-[#0b162b] border border-cyan-700 focus:ring-2 focus:ring-cyan-500"
              />
              <label className="md:col-span-2 flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={form.rgpd}
                  onChange={(e) => updateField("rgpd", e.target.checked)}
                />
                J’accepte le traitement de mes données selon la RGPD.
              </label>
              {formError && (
                <div className="md:col-span-2 text-red-400 text-sm">
                  {formError}
                </div>
              )}
              <button
                type="submit"
                className="md:col-span-2 px-6 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow transition"
              >
                Créer mon compte
              </button>
            </motion.form>
          )}

          {authMode === "forgot" && (
            <motion.div
              className="space-y-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <div className="text-cyan-200 text-lg font-semibold">
                Mot de passe oublié
              </div>
              <p className="text-gray-200">
                Contacte le support Absolute Micro à{" "}
                <a
                  className="underline text-cyan-300"
                  href="mailto:tina@absolutemicro.fr"
                >
                  tina@absolutemicro.fr
                </a>{" "}
                pour réinitialiser ton mot de passe.
              </p>
              <button
                onClick={() => setAuthMode("login")}
                className="px-6 py-2 bg-cyan-700 hover:bg-cyan-600 rounded-full text-white"
              >
                Retour
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-4 text-center text-sm text-white/70">
        🔒 Propulsé par <span className="text-cyan-300">Absolute Micro</span> — Houdan — Données stockées localement.
      </div>
    </div>
  );
}


// /frontend/src/components/TinaAdmin.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * TinaAdmin.jsx – Interface d’administration locale TINA IA
 * ----------------------------------------------------------
 * ✅ Connexion sécurisée (admin / mot de passe)
 * ✅ Gestion locale des comptes enregistrés (localStorage)
 * ✅ Effet Matrix en fond (discret)
 * ✅ Tri + recherche + suppression + détails utilisateur
 * ✅ Fenêtres modales stylisées et animées
 * ✅ Design cohérent avec l’univers visuel TINA (cyan / sombre / glass)
 */

export default function TinaAdmin() {
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "Absolute@2025"; // 🔒 Modifiable ici
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(null);
  const [tinaMsg, setTinaMsg] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const canvasRef = useRef(null);

  /* -------------------------------------------
     🌌 Effet Matrix discret (fond animé)
  ------------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const letters = "01";
    const fontSize = 16;
    const columns = Math.floor(w / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#00FF80";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* -------------------------------------------
     🔐 Connexion admin
  ------------------------------------------- */
  const handleLogin = (e) => {
    e.preventDefault();
    const user = e.target.user.value.trim();
    const pass = e.target.pass.value.trim();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setConnected(true);
      setError("");
      setTinaMsg("Bienvenue dans le noyau, capitaine 🧠");
    } else {
      setError("Identifiants invalides. TINA ne laisse pas passer les intrus 😎");
    }
  };

  /* -------------------------------------------
     📂 Chargement utilisateurs enregistrés
  ------------------------------------------- */
  useEffect(() => {
    const stored =
      localStorage.getItem("tinaUsers") || localStorage.getItem("users");
    if (stored) setUsers(JSON.parse(stored));
  }, []);

  /* -------------------------------------------
     🔍 Filtrage et tri
  ------------------------------------------- */
  const filteredUsers = (users || [])
    .filter((u) => {
      const full = `${u.nom} ${u.prenom} ${u.email}`.toLowerCase();
      return full.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const valA = (a[sortConfig.key] || "").toString().toLowerCase();
      const valB = (b[sortConfig.key] || "").toString().toLowerCase();
      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const sortIcon = (key) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  /* -------------------------------------------
     🗑️ Suppression utilisateur
  ------------------------------------------- */
  const handleDelete = (email) => setShowConfirm(email);

  const confirmDelete = () => {
    const updated = users.filter((u) => u.email !== showConfirm);
    localStorage.setItem("tinaUsers", JSON.stringify(updated));
    setUsers(updated);
    setShowConfirm(null);
    setTinaMsg("Utilisateur supprimé proprement 💨");
  };

  /* -------------------------------------------
     🚪 Déconnexion
  ------------------------------------------- */
  const handleLogout = () => {
    setConnected(false);
    setError("");
    setTinaMsg("");
  };

  /* -------------------------------------------
     Rendu principal
  ------------------------------------------- */
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 w-full max-w-5xl p-6 text-center">
        {!connected ? (
          /* ------------------------------
             🔐 Formulaire de connexion
          ------------------------------ */
          <motion.form
            onSubmit={handleLogin}
            className="bg-gradient-to-br from-[#0B2A4D]/80 to-[#083B75]/90 p-8 rounded-3xl border border-cyan-400/40 shadow-2xl max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-cyan-300 mb-6">
              Accès Administrateur
            </h2>
            <input
              type="text"
              name="user"
              placeholder="Utilisateur"
              className="w-full mb-3 p-3 rounded-lg bg-cyan-950/40 border border-cyan-400/30 text-center focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
            <input
              type="password"
              name="pass"
              placeholder="Mot de passe"
              className="w-full mb-3 p-3 rounded-lg bg-cyan-950/40 border border-cyan-400/30 text-center focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
            {error && <p className="text-red-400 mb-3">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold shadow"
            >
              Se connecter
            </button>
          </motion.form>
        ) : (
          /* ------------------------------
             🧩 Tableau administrateur
          ------------------------------ */
          <motion.div
            className="bg-gradient-to-br from-[#0B2A4D]/80 to-[#083B75]/90 p-6 rounded-3xl border border-cyan-400/40 shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-cyan-300 mb-4">
              TINA — Mode Administrateur
            </h2>
            <p className="text-cyan-200 mb-6 italic">{tinaMsg}</p>

            {/* 🔍 Barre de recherche */}
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Rechercher par nom, prénom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg bg-cyan-950/40 border border-cyan-400/30 text-white w-2/3 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
              <div className="text-sm text-cyan-300 italic">
                {filteredUsers.length} résultat
                {filteredUsers.length > 1 ? "s" : ""}
              </div>
            </div>

            {/* Tableau principal */}
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-cyan-300 cursor-pointer select-none">
                  <th onClick={() => handleSort("nom")}>Nom {sortIcon("nom")}</th>
                  <th onClick={() => handleSort("prenom")}>Prénom {sortIcon("prenom")}</th>
                  <th onClick={() => handleSort("email")}>Email {sortIcon("email")}</th>
                  <th>Téléphone</th>
                  <th onClick={() => handleSort("dateInscription")}>
                    Date {sortIcon("dateInscription")}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-400">
                      Aucun utilisateur enregistré.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u, i) => (
                    <tr key={i} className="hover:bg-cyan-900/30 transition">
                      <td>{u.nom}</td>
                      <td>{u.prenom}</td>
                      <td>{u.email}</td>
                      <td>
                        {u.indicatif} {u.telephone}
                      </td>
                      <td>
                        {u.dateInscription
                          ? new Date(u.dateInscription).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="p-2 space-x-2">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="px-3 py-1 bg-cyan-800 hover:bg-cyan-600 rounded text-xs text-white"
                        >
                          Détails
                        </button>
                        <button
                          onClick={() => handleDelete(u.email)}
                          className="px-3 py-1 bg-red-700 hover:bg-red-600 rounded text-xs text-white"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <button
              onClick={handleLogout}
              className="mt-8 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white"
            >
              Se déconnecter
            </button>
          </motion.div>
        )}
      </div>

      {/* --- Modale : Détails utilisateur --- */}
      {selectedUser && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-gradient-to-br from-[#0B2A4D]/90 to-[#083B75]/90 text-white border border-cyan-400/40 shadow-2xl rounded-2xl p-6 max-w-lg w-[90%] relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-4 text-cyan-300 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
            <h3 className="text-2xl font-semibold mb-4 text-cyan-300">
              Détails utilisateur
            </h3>
            <div className="space-y-2 text-gray-200">
              <p><strong>Nom :</strong> {selectedUser.nom}</p>
              <p><strong>Prénom :</strong> {selectedUser.prenom}</p>
              <p><strong>Email :</strong> {selectedUser.email}</p>
              <p><strong>Pays :</strong> {selectedUser.pays}</p>
              <p><strong>Ville :</strong> {selectedUser.ville}</p>
              <p><strong>Code postal :</strong> {selectedUser.codePostal}</p>
              <p><strong>Téléphone :</strong> {selectedUser.indicatif} {selectedUser.telephone}</p>
              <p>
                <strong>Date d’inscription :</strong>{" "}
                {selectedUser.dateInscription
                  ? new Date(selectedUser.dateInscription).toLocaleString()
                  : "—"}
              </p>
              <p><strong>RGPD :</strong> {selectedUser.rgpd ? "✅ Accepté" : "❌ Refusé"}</p>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-6 py-2 bg-cyan-700 hover:bg-cyan-600 rounded-full text-white"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* --- Modale : Confirmation suppression --- */}
      {showConfirm && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-gray-900 border border-cyan-400/40 p-6 rounded-xl shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <p className="mb-4 text-cyan-200">
              Supprimer cet utilisateur ? Cette action est irréversible.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-red-700 hover:bg-red-600 rounded-lg"
              >
                Oui
              </button>
              <button
                onClick={() => setShowConfirm(null)}
                className="px-5 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
              >
                Annuler
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

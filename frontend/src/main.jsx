// /frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@/index.css";

// Pages principales
import App from "@/App"; // 🏠 Accueil
import ChatTina from "@components/ChatTina"; // 🔐 Connexion / création / visite
import TinaDiagnostic from "@components/TinaDiagnostic"; // 🤖 Diagnostic intelligent
import MatrixBackground from "@components/MatrixBackground"; // 🌌 Effet Matrix global

/**
 * main.jsx — Routage principal (flux 2025)
 * --------------------------------------------------------
 * /              → Page d'accueil (App.jsx)
 * /tina          → Page de connexion / création / visite (ChatTina.jsx)
 * /diagnostic    → Diagnostic interactif intelligent (TinaDiagnostic.jsx)
 * Toute autre route → redirection automatique vers "/"
 */

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 🌌 Matrix global en arrière-plan */}
{/* <MatrixBackground /> */}

      <Routes>
        {/* 🏠 Accueil */}
        <Route path="/" element={<App />} />

        {/* 🔐 Connexion / inscription */}
        <Route path="/tina" element={<ChatTina />} />

        {/* 🤖 Diagnostic intelligent */}
        <Route path="/diagnostic" element={<TinaDiagnostic />} />

        {/* 🧭 Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import tinaImg from "../assets/Tina1.png"; // image Tina

export default function TinaIntro() {
  return (
    <section className="w-full max-w-6xl mx-auto my-6 rounded-2xl bg-gradient-to-r from-slate-50 to-sky-50 border border-slate-200 shadow-lg px-6 py-5 lg:px-8 lg:py-6">
      <div className="grid gap-6 lg:grid-cols-[260px,1fr] items-center">
        {/* Avatar Tina (image seule) */}
        <div className="flex justify-center lg:justify-start">
          <img
            src={tinaImg}
            alt="Tina, assistante numérique Absolute Micro"
            className="max-h-56 drop-shadow-2xl"
          />
        </div>

        {/* Texte de présentation */}
        <div className="space-y-3">
          <div>
            <h1 className="text-xl lg:text-2xl text-sky-900">
              Bonjour, moi c’est Tina, l’assistante numérique d’Absolute Micro.
            </h1>
            <p className="text-sm lg:text-base text-slate-700 mt-1">
              Je suis là pour présenter, de façon claire et pédagogique, tout ce
              qu’on met en place pour protéger votre système d’information,
              sécuriser vos données et accompagner vos équipes au quotidien.
            </p>
            <p className="text-sm lg:text-base text-slate-700">
              Plutôt que de vous noyer dans le jargon, je vais organiser
              l’informatique en 4 grandes familles simples à comprendre.  
              Pour chacune, on verra :
              ce que c’est, pourquoi c’est devenu indispensable,  
              et ce que ça change concrètement dans votre journée.
            </p>
          </div>

          {/* 4 familles */}
          <div className="grid gap-3 md:grid-cols-2">
            {/* 1. Cybersécurité & Protection */}
            <div className="rounded-xl border border-red-200 bg-white/80 p-3 shadow-sm">
              <div className="text-xs font-semibold tracking-wide text-red-700 uppercase mb-1">
                1. Cybersécurité & Protection
              </div>
              <p className="text-xs text-slate-700 mb-2">
                Tout ce qui sert à protéger, bloquer, détecter et répondre aux
                menaces.
              </p>
              <ul className="text-xs text-slate-700 list-disc list-inside space-y-0.5">
                <li>Pare-feu WatchGuard (T115 / T125, Basic vs Total Security)</li>
                <li>EDR / XDR / MDR et antivirus classique</li>
                <li>MFA, anti-phishing, anti-ransomware</li>
                <li>Antispam Vade 365 (spam / greymail / virus)</li>
                <li>Audits de sécurité, pentests</li>
                <li>Monitoring (Atera, Acronis, Trend, PRTG, Centreon, NinjaOne)</li>
                <li>Sensibilisation des utilisateurs</li>
              </ul>
            </div>

            {/* 2. Sauvegarde, Restauration & Continuité */}
            <div className="rounded-xl border border-amber-200 bg-white/80 p-3 shadow-sm">
              <div className="text-xs font-semibold tracking-wide text-amber-700 uppercase mb-1">
                2. Sauvegarde, Restauration & Continuité d’activité
              </div>
              <p className="text-xs text-slate-700 mb-2">
                Tout ce qui touche à la protection des données et à la reprise
                d’activité en cas de pépin.
              </p>
              <ul className="text-xs text-slate-700 list-disc list-inside space-y-0.5">
                <li>Acronis Backup (postes, serveurs, M365)</li>
                <li>NAS en backup, cloud, NAS to NAS</li>
                <li>Sauvegardes hybrides (local + cloud)</li>
                <li>Vérification d’intégrité et tests de restauration</li>
                <li>Récupération de données (CrashDisk, cryptolocker…)</li>
                <li>Technologies de récupération et analyse de faisabilité</li>
                <li>PCA / PRA / PCI – stratégies de continuité</li>
              </ul>
            </div>

            {/* 3. Messagerie, Collaboration & Logiciels Cloud */}
            <div className="rounded-xl border border-sky-200 bg-white/80 p-3 shadow-sm">
              <div className="text-xs font-semibold tracking-wide text-sky-700 uppercase mb-1">
                3. Messagerie, Collaboration & Logiciels Cloud
              </div>
              <p className="text-xs text-slate-700 mb-2">
                Tout ce qui sert à travailler, échanger, collaborer et
                communiquer.
              </p>
              <ul className="text-xs text-slate-700 list-disc list-inside space-y-0.5">
                <li>Teams (réunions, chat, partage de fichiers)</li>
                <li>OneDrive &amp; SharePoint (perso vs équipes)</li>
                <li>
                  Messagerie sécurisée : M365 Basic / Standard / Premium
                </li>
                <li>Office.com vs suite Office installée</li>
                <li>Outlook vs Outlook.com, POP vs IMAP vs Exchange</li>
                <li>
                  Technologie M365 (services cloud) vs “Office” (bureautique)
                </li>
              </ul>
            </div>

            {/* 4. Infrastructure & Gouvernance IT */}
            <div className="rounded-xl border border-emerald-200 bg-white/80 p-3 shadow-sm">
              <div className="text-xs font-semibold tracking-wide text-emerald-700 uppercase mb-1">
                4. Infrastructure & Gouvernance IT
              </div>
              <p className="text-xs text-slate-700 mb-2">
                Tout ce qui concerne le réseau, les serveurs, les procédures, le
                cadre légal et le support.
              </p>
              <ul className="text-xs text-slate-700 list-disc list-inside space-y-0.5">
                <li>Switchs N1 / N2 / N3, routeurs, LAN / WAN, mode bridge</li>
                <li>CPL, Wi-Fi, câblage RJ45 (catégories)</li>
                <li>Serveurs Windows, AD, rôles, stockage, permissions</li>
                <li>Procédures : RGPD, antifraude, politique mots de passe</li>
                <li>Mise en place et suivi des process internes</li>
                <li>Contrat de maintenance Absolute Micro</li>
              </ul>
            </div>
          </div>

          <p className="text-xs lg:text-sm text-slate-600">
            Résultat : tout tient en 4 familles simples – 
            Cybersécurité &amp; Protection, Sauvegarde &amp; Continuité,
            Logiciels &amp; Collaboration, Infrastructure &amp; Gouvernance –
            que l’on peut parcourir à différents niveaux de détail
            (version courte, vulgarisée, technique ou tarifaire).
          </p>
        </div>
      </div>
    </section>
  );
}

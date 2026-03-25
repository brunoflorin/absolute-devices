import React, { useState } from "react";

import LogoIntro from "./LogoIntro.jsx";
import FamilyGrid from "./FamilyGrid.jsx";
import TopicGrid from "./TopicGrid.jsx";
import ModeDetailSelect from "./ModeDetailSelect.jsx";
import TopicContent from "./TopicContent.jsx";
import SideMenu from "./SideMenu.jsx";

import { getTopicContent } from "./getTopicContent.js";

// -----------------------------------------------------------------------------
// FAMILLES — IDs ALIGNÉES AVEC tinaBase.js
// -----------------------------------------------------------------------------

const families = [
  {
    id: "cyber",
    label: "Cybersécurité & Protection",
    description:
      "Tout ce qui sert à protéger, bloquer, détecter et répondre aux menaces.",
    topics: [
      {
        id: "cyber_parefeu",
        label:
          "Pare-feu WatchGuard (T115 / T125, Basic / Total Security)",
      },
      { id: "cyber_edr", label: "EDR / XDR / MDR et antivirus classique" },
      { id: "cyber_mfa", label: "MFA, anti-phishing, anti-ransomware" },
      {
        id: "cyber_antispam",
        label: "Antispam Vade 365 (spam / greymail / virus)",
      },
      { id: "cyber_audits", label: "Audits de sécurité" },
      { id: "cyber_pentests", label: "Pentests" },
      {
        id: "cyber_monitoring",
        label:
          "Monitoring (Atera, Acronis, Trend, PRTG, Centreon, NinjaOne)",
      },
      {
        id: "cyber_sensibilisation",
        label: "Sensibilisation des utilisateurs",
      },
      {
        id: "cyber_attaques",
        label: "Cyberattaques : pourquoi, comment, qui",
      },
    ],
  },

  {
    id: "backup",
    label: "Sauvegarde, Restauration & Continuité",
    topics: [
      { id: "backup_acronis", label: "Acronis Backup" },
      { id: "backup_nas", label: "NAS" },
      { id: "backup_hybride", label: "Sauvegardes hybrides" },
      {
        id: "backup_integrite",
        label: "Vérification d'intégrité",
      },
      { id: "backup_tests", label: "Tests de restauration" },
      {
        id: "backup_crashdisk",
        label: "CrashDisk / Cryptolocker",
      },
      { id: "backup_pca_pra_pci", label: "PCA / PRA / PCI" },
    ],
  },

  {
    id: "collab",
    label: "Messagerie, Collaboration & Logiciels Cloud",
    topics: [
      { id: "collab_teams", label: "Teams" },
      { id: "collab_onedrive", label: "OneDrive" },
      { id: "collab_sharepoint", label: "SharePoint" },
      {
        id: "collab_m365",
        label: "M365 Basic / Standard / Premium",
      },
      {
        id: "collab_office_suite",
        label: "Office.com vs Suite Office",
      },
      { id: "collab_outlook", label: "Outlook vs Outlook.com" },
      {
        id: "collab_popimapex",
        label: "POP / IMAP / Exchange",
      },
      {
        id: "collab_m365_techno",
        label: "Technologie Microsoft 365",
      },
    ],
  },

  {
    id: "infra",
    label: "Infrastructure & Gouvernance IT",
    topics: [
      { id: "infra_switchs", label: "Switchs N1 / N2 / N3" },
      { id: "infra_reseau", label: "LAN / WAN / Mode bridge" },
      { id: "infra_cpl", label: "CPL" },
      { id: "infra_rj45", label: "RJ45 : catégories" },
      { id: "infra_serveurs", label: "Serveurs Windows / AD" },
      { id: "infra_rgpd", label: "RGPD" },
      { id: "infra_antifraude", label: "Antifraude" },
      {
        id: "infra_passwords",
        label: "Politique mots de passe",
      },
      { id: "infra_process", label: "Procédures internes" },
      {
        id: "infra_contrat",
        label: "Contrat de maintenance Absolute Micro",
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// LABEL OPTION
// -----------------------------------------------------------------------------

function getModeLabel(option, level) {
  if (option === "1")
    return level === "a"
      ? "Version courte – vulgarisée"
      : "Version courte – technique";

  if (option === "2")
    return level === "a"
      ? "Version étendue – vulgarisée"
      : "Version étendue – technique";

  if (option === "3")
    return level === "a"
      ? "Version tarifaire – vulgarisée"
      : "Version tarifaire – technique";

  if (option === "4") return "Visuels";

  return "";
}

// -----------------------------------------------------------------------------
// COMPOSANT FINAL
// -----------------------------------------------------------------------------

export default function PresentationPage() {
  const [selectedFamilyId, setSelectedFamilyId] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [option, setOption] = useState("1");
  const [level, setLevel] = useState("a");

  const selectedFamily =
    families.find((f) => f.id === selectedFamilyId) || null;

  const currentContent =
    selectedTopicId
      ? getTopicContent(selectedTopicId, option, level)
      : null;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <SideMenu
        families={families}
        selectedFamilyId={selectedFamilyId}
        selectedTopicId={selectedTopicId}
        onSelectFamily={(id) => {
          setSelectedFamilyId(id);
          setSelectedTopicId(null);
        }}
        onSelectTopic={setSelectedTopicId}
      />

      <main className="flex-1 p-6 space-y-6">
        <LogoIntro />

        <FamilyGrid
          families={families}
          selectedFamilyId={selectedFamilyId}
          onSelectFamily={(id) => {
            setSelectedFamilyId(id);
            setSelectedTopicId(null);
          }}
        />

        <TopicGrid
          family={selectedFamily}
          selectedTopicId={selectedTopicId}
          onSelectTopic={setSelectedTopicId}
        />

        {selectedTopicId && (
          <ModeDetailSelect
            option={option}
            level={level}
            setOption={setOption}
            setLevel={setLevel}
          />
        )}

{selectedTopicId && (
<TopicContent
  content={currentContent}
  option={option}
  topicId={selectedTopicId}
  setOption={setOption}
/>
)}

      </main>
    </div>
  );
}

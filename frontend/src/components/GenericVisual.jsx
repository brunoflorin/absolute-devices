import React, { useMemo, useState } from "react";

const buildBdFileName = (fileName) => {
  const dotIndex = fileName.lastIndexOf(".");
  const baseName = dotIndex >= 0 ? fileName.slice(0, dotIndex) : fileName;
  const extension = dotIndex >= 0 ? fileName.slice(dotIndex) : ".png";
  return `${baseName}_BD${extension}`;
};

const buildImageSections = (
  techFolder,
  bdFolder,
  items,
  extraEducatifItems = []
) => [
  {
    title: "Visuel technique",
    items: items.map(({ file, label }) => ({
      src: `/visuels/${techFolder}/${file}`,
      label,
    })),
  },
  {
    title: "Visuel educatif",
    items: [
      ...items.map(({ file, bdFile, label }) => ({
        src: `/visuels/${bdFolder}/${bdFile || buildBdFileName(file)}`,
        label,
      })),
      ...extraEducatifItems.map(({ file, label }) => ({
        src: `/visuels/${bdFolder}/${file}`,
        label,
      })),
    ],
  },
];

/* ========================= */
/* ROUGE — CYBER            */
/* ========================= */

const CYBER_PAREFEU = buildImageSections("ROUGE", "ROUGE-BD", [
  {
    file: "WatchGuard_T115_T125_T145.PNG",
    label: "WatchGuard T115 / T125 / T145",
  },
  {
    file: "Difference_Firewall_Grand_Public_VS_WatchGuard+licences.png",
    label: "Grand public vs WatchGuard + licences",
  },
  {
    file: "Comprendre_parefeu_Materiel.png",
    bdFile: "Comprendre_parefeu_Materiel_BD.png",
    label: "Comprendre le pare-feu materiel",
  },
  {
    file: "Comprendre_Firewall_Materiel.png",
    label: "Comprendre le firewall materiel",
  },
  {
    file: "Firewall_Materiel_VS_Logiciel.png",
    label: "Firewall materiel vs logiciel",
  },
  {
    file: "Firewalls_materiels_et_logiciels.PNG",
    label: "Firewalls materiels et logiciels",
  },
  {
    file: "VPN-types.PNG",
    label: "Types de VPN",
  },
]);

const CYBER_EDR = buildImageSections(
  "ROUGE",
  "ROUGE-BD",
  [
    {
      file: "Acronis_EDR.PNG",
      bdFile: "Acronis_EDR_BD.PNG",
      label: "Acronis EDR",
    },
    {
      file: "Antivirus_Pro_VS_EDR.PNG",
      bdFile: "Antivirus_Pro_VS_EDR_BD.PNG",
      label: "Antivirus Pro vs EDR",
    },
    {
      file: "Trend_Micro_Worry_Free.PNG",
      label: "Trend Micro Worry-Free",
    },
    {
      file: "Antivirus_Gratuit.PNG",
      label: "Antivirus gratuit",
    },
    {
      file: "Antivirus_Gratuit_VS_Professionnel.png",
      label: "Antivirus gratuit vs professionnel",
    },
  ],
  [
    {
      file: "Antivirus_Gratuit_VS_Professionnel_EDR_BD.png",
      label: "Antivirus gratuit vs professionnel / EDR",
    },
  ]
);

const CYBER_MFA = buildImageSections(
  "ROUGE",
  "ROUGE-BD",
  [
    {
      file: "Anti_phishing.PNG",
      label: "Anti-phishing",
    },
    {
      file: "Comprendre_MFA.PNG",
      bdFile: "Comprendre_MFA_BD.PNG",
      label: "Comprendre le MFA",
    },
    {
      file: "Comprendre_antiransomware.png",
      label: "Comprendre l'antiransomware",
    },
    {
      file: "Keepass_Pro.png",
      label: "KeePass Pro",
    },
    {
      file: "Keeper_Pro.png",
      label: "Keeper Pro",
    },
  ],
  [
    {
      file: "MFA_BD.png",
      label: "MFA",
    },
  ]
);

const CYBER_ANTISPAM = buildImageSections("ROUGE", "ROUGE-BD", [
  {
    file: "VADE365.PNG",
    label: "Vade 365",
  },
  {
    file: "Spams_Greymails_Virus.PNG",
    label: "Spams, greymails, virus",
  },
  {
    file: "Hornet365_Plans.PNG",
    label: "Hornet 365",
  },
]);

const CYBER_AUDITS = buildImageSections("ROUGE", "ROUGE-BD", [
  {
    file: "Audit.PNG",
    label: "Audit de securite",
  },
]);

const CYBER_PENTESTS = buildImageSections("ROUGE", "ROUGE-BD", [
  {
    file: "Comprendre_le_Pentest.PNG",
    bdFile: "Comprendre_le_Pentest_BD.png",
    label: "Pentest",
  },
]);

const CYBER_MONITORING = buildImageSections(
  "ROUGE",
  "ROUGE-BD",
  [
    {
      file: "Atera.PNG",
      label: "Atera",
    },
    {
      file: "PRTG.PNG",
      label: "PRTG",
    },
    {
      file: "Acronis.PNG",
      bdFile: "Acronis_BD.PNG",
      label: "Acronis",
    },
    {
      file: "Trend_Micro_Worry_Free.PNG",
      label: "Trend Micro Worry-Free",
    },
  ],
  [
    {
      file: "Splashtop_BD.png",
      label: "Splashtop",
    },
  ]
);

const CYBER_SENSIBILISATION = buildImageSections("ROUGE", "ROUGE-BD", [
  {
    file: "Sensibilisation_des_utilisateurs.PNG",
    label: "Sensibilisation des utilisateurs",
  },
]);

const CYBER_ATTAQUES = buildImageSections("ROUGE", "ROUGE-BD", [
  {
    file: "Cyberattaques.PNG",
    label: "Cyberattaques",
  },
]);

/* ========================= */
/* JAUNE — COLLAB / M365    */
/* ========================= */

const COLLAB_TEAMS = buildImageSections("JAUNE", "JAUNE-BD", [
  {
    file: "Teams.PNG",
    label: "Microsoft Teams",
  },
  {
    file: "Teams_VS_Teams_Pro.PNG",
    label: "Teams vs Teams Pro",
  },
]);

const COLLAB_ONEDRIVE = buildImageSections("JAUNE", "JAUNE-BD", [
  {
    file: "OneDrive.PNG",
    label: "OneDrive",
  },
  {
    file: "OneDrive_Version_Longue.PNG",
    label: "OneDrive version longue",
  },
  {
    file: "OneDrive_Gratuit_VS_Pro.PNG",
    bdFile: "OneDrive_Gratuit_VS_Pro_BD.png",
    label: "OneDrive gratuit vs Pro",
  },
]);

const COLLAB_SHAREPOINT = buildImageSections("JAUNE", "JAUNE-BD", [
  {
    file: "SharePoint.PNG",
    label: "SharePoint",
  },
]);

const COLLAB_M365 = buildImageSections("JAUNE", "JAUNE-BD", [
  {
    file: "M365_Business.PNG",
    label: "Microsoft 365 Business",
  },
  {
    file: "Versions_M365_Basic_Standard_Premium.png",
    label: "Versions M365 Basic / Standard / Premium",
  },
]);

const COLLAB_OFFICE_SUITE = buildImageSections("JAUNE", "JAUNE-BD", [
  {
    file: "Office_VS_Suite_Office_VS_M365.png",
    label: "Office.com vs Suite Office",
  },
]);

const COLLAB_OUTLOOK = buildImageSections("JAUNE", "JAUNE-BD", [
  {
    file: "Differents_Outlook.png",
    label: "Les differents Outlook",
  },
]);

const COLLAB_POPIMAPEX = buildImageSections("JAUNE", "JAUNE-BD", [
  {
    file: "POP_IMAP_Exchange_Online.png",
    label: "POP / IMAP / Exchange",
  },
  {
    file: "Exchange365.png",
    label: "Exchange 365",
  },
]);

const COLLAB_M365_TECHNO = buildImageSections("JAUNE", "JAUNE-BD", [
  {
    file: "Produits_Microsoft.png",
    label: "Produits Microsoft",
  },
  {
    file: "Administration_M365.PNG",
    label: "Administration M365",
  },
  {
    file: "Exchange365.png",
    label: "Exchange 365",
  },
]);

/* ========================= */
/* VERT — SAUVEGARDE        */
/* ========================= */

const BACKUP_ACRONIS = buildImageSections("VERT", "VERT-BD", [
  {
    file: "Acronis_Backup.png",
    bdFile: "Acronis_Backup_BD.png",
    label: "Acronis Backup",
  },
]);

const BACKUP_NAS = buildImageSections("VERT", "VERT-BD", [
  {
    file: "Serveurs_NAS.png",
    bdFile: "Serveurs_NAS_BD.png",
    label: "Serveurs NAS",
  },
]);

const BACKUP_SAUVEGARDES = buildImageSections("VERT", "VERT-BD", [
  {
    file: "Sauvegardes_Hybrides.png",
    bdFile: "Sauvegardes_Hybrides_BD.png",
    label: "Sauvegardes hybrides",
  },
  {
    file: "Sauvegardes_Cloud.png",
    bdFile: "Sauvegardes_Cloud_BD.png",
    label: "Sauvegardes Cloud",
  },
  {
    file: "Sauvegardes_Locales.png",
    bdFile: "Sauvegardes_Locales_BD.png",
    label: "Sauvegardes locales",
  },
  {
    file: "Sauvegardes_Locales_VS_Cloud_VS_Hybrides.png",
    bdFile: "Sauvegardes_Locales_VS_Cloud_VS_Hybrides_BD.png",
    label: "Sauvegardes locales vs Cloud vs hybrides",
  },
]);

const BACKUP_INTEGRITE = buildImageSections("VERT", "VERT-BD", [
  {
    file: "Verification_integrite.png",
    bdFile: "Verification_integrite_BD.png",
    label: "Verification d'integrite",
  },
]);

const BACKUP_TESTS = buildImageSections("VERT", "VERT-BD", [
  {
    file: "Test_de_restauration.png",
    bdFile: "Test_de_restauration_BD.png",
    label: "Test de restauration",
  },
]);

const BACKUP_CRASHDISK = buildImageSections("VERT", "VERT-BD", [
  {
    file: "Crashdisk.png",
    bdFile: "Crashdisk_BD.png",
    label: "Crashdisk",
  },
  {
    file: "Cryptolockers.png",
    bdFile: "Cryptolockers_BD.png",
    label: "Cryptolockers",
  },
]);

const BACKUP_PCA_PRA_PCI = buildImageSections("VERT", "VERT-BD", [
  {
    file: "PCA.png",
    bdFile: "PCA_BD.png",
    label: "PCA",
  },
  {
    file: "PRA.png",
    bdFile: "PRA_BD.png",
    label: "PRA",
  },
  {
    file: "PCI.png",
    bdFile: "PCI_BD.png",
    label: "PCI",
  },
  {
    file: "Differences_PCA_PRA_PCI.png",
    bdFile: "Differences_PCA_PRA_PCI_BD.png",
    label: "Differences PCA / PRA / PCI",
  },
]);

/* ========================= */
/* BLEU — INFRA / GOUV      */
/* ========================= */

const INFRA_CONFORMITES = buildImageSections("BLEU", "BLEU-BD", [
  {
    file: "RGPD.png",
    bdFile: "RGPD_BD.png",
    label: "Conformites et obligations",
  },
  {
    file: "NIS2.PNG",
    label: "NIS2",
  },
  {
    file: "DORA.png",
    label: "DORA",
  },
  {
    file: "CRA.png",
    label: "CRA",
  },
]);

const INFRA_ANTIFRAUDE = buildImageSections("BLEU", "BLEU-BD", [
  {
    file: "Loi_Antifraude.PNG",
    bdFile: "Loi_Antifraude_BD.PNG",
    label: "Loi antifraude",
  },
]);

const INFRA_CONTRAT_MAINTENANCE = buildImageSections("BLEU", "BLEU-BD", [
  {
    file: "Contrat_de_Maintenance.png",
    bdFile: "Contrat_de_Maintenance_BD.png",
    label: "Contrat de maintenance",
  },
  {
    file: "Contrat_Maintenance_Version_longue.PNG",
    label: "Contrat de maintenance - version detaillee",
  },
]);

const INFRA_SERVEURS_WINDOWS_AD = buildImageSections("BLEU", "BLEU-BD", [
  {
    file: "AD_&_Serveur_Windows.PNG",
    bdFile: "AD_&_Serveur_Windows_BD.PNG",
    label: "AD et serveur Windows",
  },
  {
    file: "Serveurs_Windows_et_AD.png",
    bdFile: "Serveurs_Windows_et_AD_BD.png",
    label: "Serveurs Windows et Active Directory",
  },
  {
    file: "Comprendre_Serveur_Windows.PNG",
    label: "Comprendre le serveur Windows",
  },
]);

const INFRA_HYPERV_VM = buildImageSections("BLEU", "BLEU-BD", [
  {
    file: "HyperV_et_VM.PNG",
    label: "Hyper-V et VM",
  },
]);

const INFRA_LAN_WAN_BRIDGE = buildImageSections("BLEU", "BLEU-BD", [
  {
    file: "Lan_Wan_Bridge.png",
    bdFile: "Lan_Wan_Bridge_BD.png",
    label: "LAN / WAN / Bridge",
  },
]);

const INFRA_SWITCHS = buildImageSections("BLEU", "BLEU-BD", [
  {
    file: "Switchs_N1_N2_N3.png",
    bdFile: "Switchs_N1_N2_N3_BD.png",
    label: "Switchs N1 / N2 / N3",
  },
]);

const INFRA_RJ45_FIBRE = buildImageSections("BLEU", "BLEU-BD", [
  {
    file: "RJ45.PNG",
    bdFile: "RJ45_BD.PNG",
    label: "RJ45",
  },
  {
    file: "RJ45_Fibre_&_blindage.PNG",
    label: "RJ45, fibre et blindage",
  },
]);

const INFRA_CPL = buildImageSections("BLEU", "BLEU-BD", [
  {
    file: "CPL.png",
    bdFile: "CPL_BD.png",
    label: "CPL",
  },
]);

const INFRA_TELEPHONIE_IP = buildImageSections("BLEU", "BLEU-BD", [
  {
    file: "Telephonie_IP_dans_le_reseau.png",
    label: "Telephonie IP dans le reseau",
  },
]);

const INFRA_ADRESSES_IP = buildImageSections("BLEU", "BLEU-BD", [
  {
    file: "Adresses_IP.png",
    label: "Adresses IP",
  },
]);

const INFRA_POLITIQUE_MOTSDEPASSE = buildImageSections("BLEU", "BLEU-BD", [
  {
    file: "Politique_mots_de_passe.PNG",
    bdFile: "Politique_mots_de_passe_BD.PNG",
    label: "Politique de mots de passe",
  },
]);

const INFRA_PROCEDURES_INTERNES = buildImageSections("BLEU", "BLEU-BD", [
  {
    file: "Procedures_internes.PNG",
    bdFile: "Procedures_internes_BD.PNG",
    label: "Procedures internes",
  },
]);

/* ========================= */
/* TOPIC MAP                */
/* ========================= */

const TOPIC_VISUALS = {
  // ROUGE
  cyber_parefeu: CYBER_PAREFEU,
  cyber_edr: CYBER_EDR,
  cyber_mfa: CYBER_MFA,
  cyber_antispam: CYBER_ANTISPAM,
  cyber_audits: CYBER_AUDITS,
  cyber_pentests: CYBER_PENTESTS,
  cyber_monitoring: CYBER_MONITORING,
  cyber_sensibilisation: CYBER_SENSIBILISATION,
  cyber_attaques: CYBER_ATTAQUES,

  // JAUNE
  collab_teams: COLLAB_TEAMS,
  collab_onedrive: COLLAB_ONEDRIVE,
  collab_sharepoint: COLLAB_SHAREPOINT,
  collab_m365: COLLAB_M365,
  collab_office_suite: COLLAB_OFFICE_SUITE,
  collab_officecom: COLLAB_OFFICE_SUITE,
  collab_outlook: COLLAB_OUTLOOK,
  collab_popimapex: COLLAB_POPIMAPEX,
  collab_popimap_exchange: COLLAB_POPIMAPEX,
  collab_pop_imap_exchange: COLLAB_POPIMAPEX,
  collab_m365_techno: COLLAB_M365_TECHNO,
  collab_technologie_m365: COLLAB_M365_TECHNO,

  // VERT
  backup_acronis: BACKUP_ACRONIS,
  backup_nas: BACKUP_NAS,
  backup_hybride: BACKUP_SAUVEGARDES,
  backup_sauvegardes: BACKUP_SAUVEGARDES,
  backup_integrite: BACKUP_INTEGRITE,
  backup_tests: BACKUP_TESTS,
  backup_crashdisk: BACKUP_CRASHDISK,
  backup_pca_pra_pci: BACKUP_PCA_PRA_PCI,

  // BLEU
  infra_conformites: INFRA_CONFORMITES,
  infra_conformites_obligations: INFRA_CONFORMITES,
  infra_rgpd: INFRA_CONFORMITES,
  infra_obligations: INFRA_CONFORMITES,

  infra_antifraude: INFRA_ANTIFRAUDE,

  infra_contrat_maintenance: INFRA_CONTRAT_MAINTENANCE,
  infra_maintenance: INFRA_CONTRAT_MAINTENANCE,
  infra_maint: INFRA_CONTRAT_MAINTENANCE,
  infra_contratmaintenance: INFRA_CONTRAT_MAINTENANCE,

  infra_serveurs_windows_ad: INFRA_SERVEURS_WINDOWS_AD,
  infra_windows_ad: INFRA_SERVEURS_WINDOWS_AD,
  infra_ad_windows: INFRA_SERVEURS_WINDOWS_AD,
  infra_serveurs_ad: INFRA_SERVEURS_WINDOWS_AD,
  infra_windowsad: INFRA_SERVEURS_WINDOWS_AD,

  infra_hyperv_vm: INFRA_HYPERV_VM,
  infra_hyperv: INFRA_HYPERV_VM,
  infra_vm: INFRA_HYPERV_VM,

  infra_lan_wan_bridge: INFRA_LAN_WAN_BRIDGE,
  infra_lan_wan: INFRA_LAN_WAN_BRIDGE,
  infra_lan: INFRA_LAN_WAN_BRIDGE,
  infra_reseau_lan: INFRA_LAN_WAN_BRIDGE,

  infra_switchs: INFRA_SWITCHS,
  infra_switch: INFRA_SWITCHS,
  infra_switchs_n1_n2_n3: INFRA_SWITCHS,

  infra_rj45_fibre: INFRA_RJ45_FIBRE,
  infra_rj45: INFRA_RJ45_FIBRE,
  infra_cablage: INFRA_RJ45_FIBRE,

  infra_cpl: INFRA_CPL,

  infra_telephonie_ip: INFRA_TELEPHONIE_IP,
  infra_telephonie: INFRA_TELEPHONIE_IP,

  infra_adresses_ip: INFRA_ADRESSES_IP,
  infra_ip: INFRA_ADRESSES_IP,

  infra_politique_motsdepasse: INFRA_POLITIQUE_MOTSDEPASSE,
  infra_politique_mots_de_passe: INFRA_POLITIQUE_MOTSDEPASSE,
  infra_mots_de_passe: INFRA_POLITIQUE_MOTSDEPASSE,

  infra_procedures_internes: INFRA_PROCEDURES_INTERNES,
  infra_procedures: INFRA_PROCEDURES_INTERNES,
};

const LABEL_ALIASES = {
  "switchs n1 n2 n3": "infra_switchs",
  "lan wan mode bridge": "infra_lan_wan_bridge",
  cpl: "infra_cpl",
  "rj45 categories": "infra_rj45_fibre",
  "serveurs windows ad": "infra_serveurs_windows_ad",
  rgpd: "infra_rgpd",
  antifraude: "infra_antifraude",
  "politique mots de passe": "infra_politique_motsdepasse",
  "procedures internes": "infra_procedures_internes",
  "contrat de maintenance absolute micro": "infra_contrat_maintenance",

  "acronis backup": "backup_acronis",
  nas: "backup_nas",
  "sauvegardes hybrides": "backup_hybride",
  "verification d integrite": "backup_integrite",
  "tests de restauration": "backup_tests",
  "crashdisk cryptolocker": "backup_crashdisk",
  "pca pra pci": "backup_pca_pra_pci",

  "m365 basic standard premium": "collab_m365",
  "office com vs suite office": "collab_office_suite",
  "outlook vs outlook com": "collab_outlook",
  "pop imap exchange": "collab_popimapex",
  "technologie microsoft 365": "collab_m365_techno",
};

function normalizeString(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function resolveTopicKey(topicId, label) {
  if (TOPIC_VISUALS[topicId]) return topicId;

  const normalizedTopicId = normalizeString(topicId || "");
  const normalizedLabel = normalizeString(label || "");
  const combined = `${normalizedTopicId} ${normalizedLabel}`.trim();

  if (LABEL_ALIASES[normalizedTopicId]) {
    return LABEL_ALIASES[normalizedTopicId];
  }

  if (LABEL_ALIASES[normalizedLabel]) {
    return LABEL_ALIASES[normalizedLabel];
  }

  if (LABEL_ALIASES[combined]) {
    return LABEL_ALIASES[combined];
  }

  // JAUNE
  if (
    combined.includes("pop") ||
    combined.includes("imap") ||
    combined.includes("exchange")
  ) {
    return "collab_popimapex";
  }

  if (
    combined.includes("office com") ||
    combined.includes("suite office") ||
    combined.includes("office suite")
  ) {
    return "collab_office_suite";
  }

  if (
    combined.includes("technologie microsoft 365") ||
    combined.includes("technologie m365") ||
    combined.includes("m365 techno")
  ) {
    return "collab_m365_techno";
  }

  if (
    combined.includes("m365 basic") ||
    combined.includes("m365 business") ||
    combined.includes("basic standard premium")
  ) {
    return "collab_m365";
  }

  if (combined.includes("outlook")) {
    return "collab_outlook";
  }

  if (combined.includes("onedrive")) {
    return "collab_onedrive";
  }

  if (combined.includes("sharepoint")) {
    return "collab_sharepoint";
  }

  if (combined.includes("teams")) {
    return "collab_teams";
  }

  // BLEU
  if (combined.includes("antifraude")) {
    return "infra_antifraude";
  }

  if (combined.includes("rgpd")) {
    return "infra_rgpd";
  }

  if (
    combined.includes("conformites") ||
    combined.includes("obligations") ||
    combined.includes("nis2") ||
    combined.includes("dora") ||
    combined.includes("cra")
  ) {
    return "infra_conformites";
  }

  if (
    combined.includes("lan wan mode bridge") ||
    (combined.includes("lan") &&
      combined.includes("wan") &&
      combined.includes("bridge"))
  ) {
    return "infra_lan_wan_bridge";
  }

  if (
    combined.includes("serveurs windows") ||
    combined.includes("serveur windows") ||
    combined.includes("active directory") ||
    combined.includes("windows ad")
  ) {
    return "infra_serveurs_windows_ad";
  }

  if (
    combined.includes("contrat de maintenance") ||
    combined.includes("maintenance absolute micro")
  ) {
    return "infra_contrat_maintenance";
  }

  if (combined.includes("adresse ip") || combined.includes("adresses ip")) {
    return "infra_ip";
  }

  if (combined.includes("switch")) {
    return "infra_switchs";
  }

  if (combined.includes("telephonie ip")) {
    return "infra_telephonie";
  }

  if (combined.includes("cpl")) {
    return "infra_cpl";
  }

  if (
    combined.includes("rj45") ||
    combined.includes("fibre") ||
    combined.includes("blindage")
  ) {
    return "infra_rj45_fibre";
  }

  if (combined.includes("hyper v") || combined.includes("vm")) {
    return "infra_hyperv_vm";
  }

  if (
    combined.includes("mot de passe") ||
    combined.includes("mots de passe")
  ) {
    return "infra_politique_motsdepasse";
  }

  if (
    combined.includes("procedure") ||
    combined.includes("procedures")
  ) {
    return "infra_procedures_internes";
  }

  // VERT
  if (combined.includes("acronis")) return "backup_acronis";
  if (combined.includes("nas")) return "backup_nas";
  if (combined.includes("sauvegarde")) return "backup_hybride";
  if (combined.includes("integrite")) return "backup_integrite";
  if (combined.includes("restauration")) return "backup_tests";
  if (
    combined.includes("crashdisk") ||
    combined.includes("cryptolocker")
  ) {
    return "backup_crashdisk";
  }
  if (
    combined.includes("pca") ||
    combined.includes("pra") ||
    combined.includes("pci")
  ) {
    return "backup_pca_pra_pci";
  }

  return null;
}

export default function GenericVisual({ topicId, label }) {
  const [activeVisual, setActiveVisual] = useState(null);
  const [hiddenSrcs, setHiddenSrcs] = useState({});

  const resolvedTopicKey = useMemo(
    () => resolveTopicKey(topicId, label),
    [topicId, label]
  );

  const sections = useMemo(
    () => TOPIC_VISUALS[resolvedTopicKey] || [],
    [resolvedTopicKey]
  );

  const isPdf = (src) => src.toLowerCase().endsWith(".pdf");

  const hideVisual = (src) => {
    setHiddenSrcs((prev) => ({
      ...prev,
      [src]: true,
    }));
  };

  const visibleSections = sections
    .map((section) => ({
      ...section,
      items: (section.items || []).filter((item) => !hiddenSrcs[item.src]),
    }))
    .filter((section) => section.items.length > 0);

  if (activeVisual) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
        <button
          onClick={() => setActiveVisual(null)}
          className="m-4 px-4 py-2 bg-white rounded shadow self-start"
        >
          ← Retour
        </button>

        <div className="mx-4 text-white text-sm">
          {activeVisual.family} — {activeVisual.label}
        </div>

        <div className="flex-1 overflow-auto bg-white mx-4 mb-4 mt-2 rounded-xl p-2">
          {isPdf(activeVisual.src) ? (
            <iframe
              src={activeVisual.src}
              title={activeVisual.label}
              className="w-full min-h-[85vh] rounded-xl border-0"
            />
          ) : (
            <img
              src={activeVisual.src}
              alt={activeVisual.label}
              className="max-w-full max-h-full object-contain mx-auto"
            />
          )}
        </div>
      </div>
    );
  }

  if (!visibleSections.length) {
    return (
      <div className="text-gray-400 italic text-center py-12">
        Aucun visuel defini pour ce sujet.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {visibleSections.map((section) => (
        <div key={section.title}>
          <div className="mb-4 text-lg font-semibold text-slate-800">
            {section.title}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {section.items.map((visual, index) => (
              <div
                key={`${section.title}-${index}-${visual.src}`}
                role="button"
                tabIndex={0}
                onClick={() =>
                  setActiveVisual({ ...visual, family: section.title })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveVisual({ ...visual, family: section.title });
                  }
                }}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center cursor-pointer"
              >
                <div className="w-full h-56 mb-4 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
                  {isPdf(visual.src) ? (
                    <iframe
                      src={visual.src}
                      title={visual.label}
                      className="w-full h-full border-0 bg-white pointer-events-none"
                    />
                  ) : (
                    <img
                      src={visual.src}
                      alt={visual.label}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={() => hideVisual(visual.src)}
                    />
                  )}
                </div>

                <div className="text-xs text-violet-600 mb-1">
                  {section.title}
                </div>

                <div className="text-sm font-medium text-slate-700">
                  {visual.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
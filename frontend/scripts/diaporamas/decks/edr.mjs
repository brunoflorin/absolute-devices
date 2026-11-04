import * as S from "../scenes/edr.mjs";

export default {
  key: "edr",
  titre: "EDR",
  sousTitre: "L'antivirus qui surveille les comportements, pas seulement les visages connus",
  topics: ["cyber_edr"],
  theme: { primary: "#6D28D9", dark: "#1E1036", tint: "#F5F3FF", soft: "#DDD6FE" },
  slides: [
    { t: "cover", photo: "pexels-5926382.jpg" },
    {
      t: "story", titre: "L'antivirus classique compare des empreintes",
      texte: "Il compare l'empreinte de chaque fichier à une liste de menaces connues : efficace contre l'ancien, aveugle devant le nouveau.",
      points: [
        ["Fingerprint", "Une empreinte connue est bloquée immédiatement"],
        ["FileQuestion", "Un fichier modifié d'un seul octet change d'empreinte"],
        ["Hourglass", "Il faut attendre que la menace soit répertoriée"],
      ],
      tech: ["Signature", "L'empreinte numérique unique d'un fichier malveillant, comme une empreinte digitale."],
      vanne: "L'antivirus classique, c'est un videur qui ne refuse que les têtes affichées au mur. Le pirate change de moustache.",
      scene: S.signatures,
    },
    {
      t: "explainer", titre: "L'EDR observe ce que font les programmes",
      texte: "Il ne se demande pas seulement « qui est ce fichier ? », mais « que fait-il ? ». Une suite d'actions suspecte suffit à déclencher la réponse.",
      scene: S.chaine,
      tech: ["EDR (Endpoint Detection & Response)", "Détection et réponse sur le poste : un agent installé sur chaque ordinateur qui analyse son comportement en continu."],
    },
    {
      t: "cards", titre: "Ce qu'il change face à un rançongiciel",
      items: [
        ["Lock", "Détecté au démarrage", "Le chiffrement en rafale de fichiers est repéré en quelques secondes et stoppé.", "pexels-4458420.jpg"],
        ["Unplug", "Contenu", "Le poste touché est isolé : l'infection ne se propage pas aux autres ordinateurs.", "pexels-5380589.jpg"],
        ["FileSearch", "Expliqué", "On sait par où c'est entré, ce qui a été touché et ce qui a été réparé.", "pexels-5926389.jpg"],
      ],
      vanne: "Un rançongiciel ne prévient pas. Il arrive généralement un vendredi à 18 h, juste avant le week-end prolongé.",
    },
    {
      t: "explainer", titre: "Isoler un poste en un clic",
      texte: "En cas d'alerte, le poste suspect est coupé du réseau. Il reste joignable uniquement par la console de supervision, pour l'analyse et la réparation.",
      scene: S.isolation,
      tech: ["Isolation réseau", "Le poste ne peut plus parler qu'à la console de sécurité : ni aux autres PC, ni au serveur, ni à Internet."],
      vanne: "C'est la quarantaine, version informatique. Sans masque, mais avec la même efficacité.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Logiciel", "Monitor", "Un agent EDR par poste", "Fixes, portables et serveurs", "pexels-1181675.jpg"],
        ["Abonnement", "KeyRound", "Une licence par appareil", "Remplace l'antivirus existant", "pexels-5380642.jpg"],
        ["Console", "LayoutDashboard", "Une supervision centralisée", "Alertes et rapports au même endroit", "pexels-5380589.jpg"],
        ["Absolute Micro", "Wrench", "Déploiement et suivi", "Installation à distance, alertes traitées", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Antivirus classique… ou EDR", labSans: "Antivirus seul", labAvec: "Avec l'EDR",
      sans: ["Ne connaît que les menaces déjà répertoriées", "Rançongiciel : activité arrêtée plusieurs jours", "Aucune vue sur ce qui s'est passé"],
      avec: ["Repère les comportements suspects, même inconnus", "Attaque stoppée, poste isolé, fichiers restaurés", "Rapport clair de l'incident"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Download", "Déploiement à distance sur chaque poste"], ["BellRing", "Alertes reçues et traitées"], ["FileText", "Compte rendu en cas d'incident"]],
    },
  ],
};

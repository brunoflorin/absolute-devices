import * as S from "../scenes/supervision.mjs";

export default {
  key: "supervision",
  titre: "Supervision du parc",
  sousTitre: "Voir les pannes arriver avant qu'elles ne vous arrêtent",
  topics: ["cyber_monitoring"],
  theme: { primary: "#0891B2", dark: "#083344", tint: "#ECFEFF", soft: "#A5F3FC" },
  slides: [
    { t: "cover", photo: "pexels-5380589.jpg" },
    {
      t: "explainer", titre: "Chaque appareil remonte son état",
      texte: "Un petit agent installé sur chaque poste et serveur envoie en continu son état à notre console : disques, mises à jour, antivirus, sauvegardes.",
      scene: S.remontee,
      tech: ["Agent de supervision", "Un logiciel léger installé sur l'appareil, qui mesure son état et permet d'intervenir à distance de façon sécurisée."],
    },
    {
      t: "cards", titre: "Ce qui est surveillé en permanence",
      items: [
        ["HardDrive", "La santé du matériel", "Disques, mémoire, températures : les signes de faiblesse sont repérés tôt.", "pexels-3825581.jpg"],
        ["RefreshCw", "Les mises à jour", "Windows et logiciels installés : les correctifs de sécurité sont suivis et appliqués.", "pexels-1181675.jpg"],
        ["ShieldCheck", "La protection", "Antivirus actif et à jour, sauvegardes réussies : un échec déclenche une alerte.", "pexels-5380642.jpg"],
      ],
      vanne: "Le disque dur ne prévient jamais par mail avant de lâcher. L'agent, si.",
    },
    {
      t: "explainer", titre: "Réagir avant la panne plutôt qu'après",
      texte: "La supervision transforme une panne subie en intervention planifiée : on remplace la pièce avant qu'elle ne lâche, au moment qui vous arrange.",
      scene: S.frise,
      tech: ["Maintenance préventive", "Intervenir sur les premiers signes d'usure, plutôt qu'attendre la panne pour réparer en urgence."],
      vanne: "La meilleure panne, c'est celle dont vous n'avez jamais entendu parler.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Logiciel", "Cpu", "Un agent par appareil", "Postes, portables et serveurs", "pexels-1181675.jpg"],
        ["Console", "LayoutDashboard", "La supervision centralisée", "Gérée par Absolute Micro", "pexels-5380589.jpg"],
        ["Accès distant", "MonitorSmartphone", "La prise en main sécurisée", "Intervention sans déplacement", "pexels-4974915.jpg"],
        ["Absolute Micro", "Wrench", "Le suivi des alertes", "Analyse et intervention", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Sans supervision… avec supervision", labSans: "On attend la panne", labAvec: "On la voit venir",
      sans: ["Pannes découvertes quand le poste ne démarre plus", "Mises à jour oubliées, failles ouvertes", "Sauvegardes en échec sans que personne ne le sache"],
      avec: ["Signes d'usure détectés à l'avance", "Correctifs appliqués et vérifiés", "Alertes traitées par notre équipe"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Download", "Agents déployés à distance"], ["BellRing", "Alertes analysées chaque jour"], ["Wrench", "Interventions planifiées"]],
    },
  ],
};

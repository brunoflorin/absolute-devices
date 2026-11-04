import * as S from "../scenes/contrat_maintenance.mjs";

export default {
  key: "contrat_maintenance",
  titre: "Contrat de maintenance",
  sousTitre: "Votre informatique suivie, entretenue et dépannée par Absolute Micro",
  topics: ["infra_contrat"],
  theme: { primary: "#C5161D", dark: "#231F20", tint: "#FFF1F2", soft: "#FECACA" },
  slides: [
    { t: "cover", photo: "pexels-8867482.jpg" },
    {
      t: "cards", titre: "Sans contrat : on répare quand ça casse",
      items: [
        ["Flame", "La panne surprise", "Le disque lâche un lundi matin, en pleine période chargée.", "pexels-4458420.jpg"],
        ["Clock", "L'attente", "Il faut trouver un dépanneur disponible, lui expliquer votre installation…", "pexels-5668858.jpg"],
        ["CircleHelp", "L'inconnu", "Sauvegardes, antivirus, mises à jour : personne ne sait vraiment si tout fonctionne.", "pexels-3184360.jpg"],
      ],
      vanne: "L'informatique, c'est comme une voiture : on peut attendre la panne sur l'autoroute, ou faire la vidange.",
    },
    {
      t: "explainer", titre: "La supervision : voir venir la panne",
      texte: "Un agent installé sur chaque appareil remonte son état en continu. Une anomalie déclenche une alerte chez nous, souvent avant que vous ne la remarquiez.",
      scene: S.supervision,
      tech: ["RMM (supervision à distance)", "L'outil qui surveille l'état des postes et serveurs, déploie les mises à jour et permet d'intervenir à distance."],
    },
    {
      t: "cards", titre: "Ce que couvre le contrat",
      items: [
        ["Activity", "Supervision", "Postes, serveurs et sauvegardes surveillés en continu.", "pexels-5380589.jpg"],
        ["Headset", "Assistance", "Un interlocuteur qui connaît votre installation, joignable par téléphone ou par mail.", "pexels-8867482.jpg"],
        ["RefreshCw", "Entretien", "Mises à jour, antivirus et sauvegardes contrôlés régulièrement.", "pexels-5380642.jpg"],
      ],
      tech: ["Maintenance préventive", "Les opérations faites avant la panne : mises à jour, nettoyage, contrôles. La plus économique de toutes."],
    },
    {
      t: "explainer", titre: "Le circuit d'une demande",
      texte: "Une demande est enregistrée, suivie et tracée. La majorité des problèmes se règlent à distance ; un technicien se déplace quand c'est nécessaire.",
      scene: S.circuit,
      vanne: "Vous n'aurez plus besoin de décrire votre imprimante au téléphone en la tenant dans les bras. On la voit déjà.",
    },
    {
      t: "kit", titre: "Comment ça démarre",
      items: [
        ["Étape 1", "ClipboardList", "L'audit", "Inventaire du parc et des risques", "pexels-6801648.jpg"],
        ["Étape 2", "Download", "Les agents", "Supervision installée sur les appareils", "pexels-1181675.jpg"],
        ["Étape 3", "Wrench", "La remise à niveau", "Sauvegardes, sécurité et mises à jour", "pexels-17489160.jpg"],
        ["Ensuite", "Headset", "Le suivi", "Assistance et entretien au quotidien", "pexels-8867482.jpg"],
      ],
    },
    {
      t: "duel", titre: "Dépannage ponctuel… ou contrat", labSans: "Au coup par coup", labAvec: "Avec contrat",
      sans: ["On attend la panne pour agir", "Un dépanneur qui découvre votre installation", "Sauvegardes et sécurité jamais vérifiées"],
      avec: ["Les problèmes détectés avant la panne", "Un interlocuteur qui connaît votre parc", "Sauvegardes et sécurité contrôlées"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Activity", "Supervision de votre parc"], ["Headset", "Assistance par un interlocuteur dédié"], ["ShieldCheck", "Sécurité et sauvegardes contrôlées"]],
    },
  ],
};

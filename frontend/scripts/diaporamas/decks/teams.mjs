import * as S from "../scenes/teams.mjs";

export default {
  key: "teams",
  titre: "Teams",
  sousTitre: "Discuter, se réunir et travailler ensemble, au bureau comme à distance",
  topics: ["collab_teams"],
  theme: { primary: "#4F46E5", dark: "#15133A", tint: "#EEF2FF", soft: "#C7D2FE" },
  slides: [
    { t: "cover", photo: "pexels-4226140.jpg" },
    {
      t: "cards", titre: "Le problème : trop de mails, pas assez d'échanges",
      items: [
        ["Mails", "Les chaînes de mails", "Vingt messages « Répondre à tous » pour fixer une simple date de réunion.", "pexels-4458420.jpg"],
        ["Car", "Les déplacements", "Une heure de route pour une réunion de trente minutes.", "pexels-3194521.jpg"],
        ["FolderSearch", "Les fichiers éparpillés", "La dernière version est dans un mail… mais lequel ?", "pexels-6476260.jpg"],
      ],
      vanne: "« Je remets tout le monde en copie pour plus de clarté. » Personne, jamais, n'a gagné en clarté comme ça.",
    },
    {
      t: "explainer", titre: "Une équipe, des canaux, tout au même endroit",
      texte: "Chaque service ou projet a son canal : la conversation, les fichiers, les réunions et les tâches restent ensemble, avec tout l'historique.",
      scene: S.structure,
      tech: ["Canal", "Un espace de discussion thématique dans une équipe. Les nouveaux arrivants retrouvent tout l'historique du sujet."],
    },
    {
      t: "explainer", titre: "Des réunions sans se déplacer",
      texte: "Bureau, télétravail ou chantier : chacun rejoint la réunion depuis son appareil. Un client ou un fournisseur peut être invité sans compte Teams.",
      scene: S.reunion,
      tech: ["Partage d'écran", "Montrer un document, un plan ou un logiciel en direct, pendant la visio, à tous les participants."],
      vanne: "Bonus : personne ne voit que vous portez un short sous la chemise. Pensez quand même à couper la caméra avant de vous lever.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Prérequis", "LayoutGrid", "Microsoft 365", "Teams est inclus dans l'abonnement", "pexels-3183150.jpg"],
        ["Matériel", "Headphones", "Micro-casque ou webcam", "Pour un son et une image corrects", "pexels-4144923.jpg"],
        ["Organisation", "Users", "Équipes et canaux", "Définis avec vous, par service ou projet", "pexels-3184291.jpg"],
        ["Absolute Micro", "GraduationCap", "Prise en main", "Paramétrage et formation des utilisateurs", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Sans Teams… avec Teams",
      sans: ["Chaînes de mails interminables", "Déplacements pour chaque réunion", "Nouveaux arrivants sans historique"],
      avec: ["Réponses rapides par messagerie", "Réunions en un clic, invités extérieurs compris", "Tout l'historique d'un projet au même endroit"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Settings", "Équipes et droits définis avec vous"], ["GraduationCap", "Formation des utilisateurs"], ["Headset", "Assistance au quotidien"]],
    },
  ],
};

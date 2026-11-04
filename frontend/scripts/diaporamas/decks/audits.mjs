import * as S from "../scenes/audits.mjs";

export default {
  key: "audits",
  titre: "Audit de sécurité",
  sousTitre: "Savoir où vous en êtes avant que quelqu'un d'autre ne le découvre",
  topics: ["cyber_audits"],
  theme: { primary: "#0369A1", dark: "#082F49", tint: "#F0F9FF", soft: "#BAE6FD" },
  slides: [
    { t: "cover", photo: "pexels-5380642.jpg" },
    {
      t: "cards", titre: "Pourquoi faire un audit ?",
      items: [
        ["EyeOff", "Ce qu'on ne voit pas", "Un poste jamais mis à jour, un ancien compte toujours actif : invisibles au quotidien.", "pexels-1181354.jpg"],
        ["Scale", "Les obligations", "RGPD, assurance cyber, clients exigeants : il faut pouvoir montrer ce qui est fait.", "pexels-6476260.jpg"],
        ["ListChecks", "Les priorités", "On ne peut pas tout corriger en un jour : l'audit dit par quoi commencer.", "pexels-3184291.jpg"],
      ],
      vanne: "Un audit, c'est le contrôle technique de votre informatique. Mieux vaut le passer avant de partir en vacances.",
    },
    {
      t: "explainer", titre: "Comment se déroule un audit",
      texte: "Un audit suit une méthode : on recense tout, on analyse chaque élément, on évalue les risques et on en tire un plan d'action concret.",
      scene: S.demarche,
      tech: ["Surface d'attaque", "L'ensemble des points par lesquels un pirate pourrait entrer : postes, comptes, accès distants, messagerie…"],
    },
    {
      t: "explainer", titre: "Le résultat : un rapport clair et priorisé",
      texte: "Chaque constat est expliqué simplement et classé selon son niveau de risque. Vous savez ce qui est urgent, ce qui peut attendre et ce qui est déjà bien fait.",
      scene: S.constats,
      tech: ["Criticité", "Le niveau de gravité d'un constat : la probabilité qu'il soit exploité, multipliée par l'impact s'il l'est."],
      vanne: "Bonne nouvelle : un audit trouve aussi des choses qui vont bien. Si si.",
    },
    {
      t: "kit", titre: "Ce que comprend l'audit",
      items: [
        ["Entretien", "MessageCircle", "Un échange avec vous", "Organisation, usages, outils métier", "pexels-3184291.jpg"],
        ["Analyse", "ScanSearch", "Le contrôle technique", "Postes, serveurs, réseau, comptes", "pexels-1181675.jpg"],
        ["Rapport", "FileText", "Un rapport lisible", "Constats, risques, priorités", "pexels-6476589.jpg"],
        ["Absolute Micro", "Wrench", "Le plan d'action", "Corrections chiffrées et planifiées", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Sans audit… avec audit", labSans: "À l'aveugle", labAvec: "Avec un audit",
      sans: ["Failles inconnues jusqu'au jour de l'incident", "Dépenses au hasard, sans priorité", "Rien à présenter à l'assurance ou au client"],
      avec: ["Une vue complète de la situation", "Des actions classées par urgence", "Un document qui prouve votre démarche"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["ScanSearch", "Audit sur place et à distance"], ["FileText", "Rapport expliqué de vive voix"], ["ListChecks", "Suivi du plan d'action"]],
    },
  ],
};

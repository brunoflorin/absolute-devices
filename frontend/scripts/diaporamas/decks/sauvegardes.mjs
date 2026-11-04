import * as S from "../scenes/sauvegardes.mjs";

export default {
  key: "sauvegardes",
  titre: "Sauvegardes locales & Cloud",
  sousTitre: "La seule assurance qui vous rend vos données",
  topics: ["backup_acronis", "backup_nas", "backup_hybride", "backup_integrite", "backup_tests", "backup_crashdisk", "backup_pca_pra_pci"],
  theme: { primary: "#15803D", dark: "#052E16", tint: "#F0FDF4", soft: "#BBF7D0" },
  slides: [
    { t: "cover", photo: "pexels-1054397.jpg" },
    {
      t: "cards", titre: "Un jour, un disque lâchera",
      items: [
        ["HardDrive", "La panne", "Un disque dur a une durée de vie limitée. Il ne prévient presque jamais.", "pexels-3825581.jpg"],
        ["Lock", "Le rançongiciel", "Il chiffre les fichiers du PC… et ceux des disques branchés au réseau.", "pexels-4458420.jpg"],
        ["Flame", "Le sinistre", "Vol, incendie, dégât des eaux : tout ce qui est au bureau disparaît.", "pexels-4508751.jpg"],
      ],
      vanne: "Il existe deux sortes d'entreprises : celles qui ont perdu des données, et celles qui vont en perdre.",
    },
    {
      t: "explainer", titre: "La règle 3-2-1",
      texte: "Trois copies des données, sur deux supports différents, dont une hors des locaux. C'est la règle recommandée par tous les spécialistes.",
      scene: S.regle321,
      tech: ["Sauvegarde hybride", "Une copie locale sur le NAS (restauration rapide) et une copie dans le Cloud (à l'abri de tout ce qui arrive au bureau)."],
    },
    {
      t: "explainer", titre: "Le scénario que personne ne veut vivre",
      texte: "Un rançongiciel chiffre le PC, puis le NAS branché au réseau. La copie Cloud, isolée et non modifiable, permet de tout récupérer.",
      scene: S.scenario,
      tech: ["Sauvegarde immuable", "Une copie qui ne peut être ni modifiée ni supprimée pendant une durée définie, même avec les droits administrateur."],
      vanne: "Le pirate réclame 50 000 € en bitcoins ? Vous lui répondez poliment que vous avez une sauvegarde.",
    },
    {
      t: "cards", titre: "Une sauvegarde, ça se vérifie",
      items: [
        ["Eye", "Contrôle quotidien", "Chaque sauvegarde est surveillée : un échec déclenche une alerte chez nous.", "pexels-5380589.jpg"],
        ["FileCheck", "Intégrité", "On vérifie que les copies sont lisibles et complètes, pas seulement « terminées ».", "pexels-5380642.jpg"],
        ["RotateCcw", "Tests de restauration", "On restaure régulièrement pour de vrai : c'est le seul test qui compte.", "pexels-1181354.jpg"],
      ],
      tech: ["RPO / RTO", "RPO : combien de données on accepte de perdre (une journée ?). RTO : combien de temps pour redémarrer."],
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Matériel", "HardDrive", "Un NAS au bureau", "Pour la copie locale et la restauration rapide", "pexels-2881227.jpg"],
        ["Abonnement", "CloudUpload", "Un espace Cloud", "Dimensionné selon le volume de données", "pexels-4508751.jpg"],
        ["Logiciel", "DatabaseBackup", "Un agent de sauvegarde", "Sur les PC et serveurs à protéger", "pexels-1181675.jpg"],
        ["Absolute Micro", "Wrench", "Contrôle et tests", "Vérification quotidienne, restaurations d'essai", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Sans sauvegarde… avec sauvegarde",
      sans: ["Données perdues définitivement", "Activité arrêtée des jours, voire des semaines", "Pression pour payer une rançon"],
      avec: ["Restauration rapide depuis le NAS", "Copie à l'abri même si le bureau est perdu", "Redémarrage sans payer de rançon"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["Settings", "NAS et Cloud configurés"], ["Eye", "Chaque sauvegarde vérifiée"], ["RotateCcw", "Restaurations d'essai régulières"]],
    },
  ],
};

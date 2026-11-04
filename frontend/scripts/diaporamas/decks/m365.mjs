import * as S from "../scenes/m365.mjs";

export default {
  key: "m365",
  titre: "Microsoft 365",
  sousTitre: "Votre bureau dans le Cloud : messagerie, logiciels et fichiers partout",
  topics: ["collab_m365", "collab_m365_techno", "collab_office_suite", "collab_outlook", "collab_popimapex"],
  theme: { primary: "#2563EB", dark: "#0B1B3F", tint: "#EFF6FF", soft: "#BFDBFE" },
  slides: [
    { t: "cover", photo: "pexels-3183150.jpg" },
    {
      t: "explainer", titre: "Fini les mails prisonniers d'un seul PC",
      texte: "Avec une messagerie classique, les mails sont téléchargés puis rangés dans un fichier local. Avec Microsoft 365, ils restent sur le serveur et se synchronisent sur chaque appareil.",
      scene: S.avantApres,
      tech: ["POP / IMAP / Exchange", "POP télécharge et supprime du serveur ; IMAP synchronise les mails ; Exchange synchronise aussi agenda, contacts et tâches."],
      vanne: "Le fichier .pst de 12 Go sur le PC de la compta, c'est l'équivalent numérique du carton à chaussures plein de factures.",
    },
    {
      t: "explainer", titre: "Un abonnement, tous les outils",
      texte: "Messagerie, logiciels de bureau, réunions et fichiers sont réunis dans un même espace sécurisé, accessible depuis n'importe quel appareil.",
      scene: S.hub,
      tech: ["Tenant", "L'espace Microsoft 365 propre à votre entreprise, rattaché à votre nom de domaine et administré par nous."],
    },
    {
      t: "levels", titre: "Trois niveaux d'abonnement",
      niveaux: [
        { nom: "Basic", sous: "Les outils en ligne", icone: "Globe",
          items: ["Messagerie 50 Go", "Office en ligne", "Teams et réunions", "OneDrive 1 To"] },
        { nom: "Standard", sous: "Les logiciels installés", icone: "Monitor",
          items: ["Tout le Basic", "Office sur 5 PC ou Mac", "5 tablettes, 5 téléphones", "Webinaires"] },
        { nom: "Premium", sous: "La sécurité renforcée", icone: "ShieldCheck", plus: "Tout le Standard, et en plus :",
          items: ["Gestion des appareils", "Protection avancée", "Accès conditionnel", "Données sensibles protégées"] },
      ],
      note: "Nous vous orientons vers le niveau adapté : inutile de payer du Premium pour un usage Basic.",
    },
    {
      t: "cards", titre: "Ce que ça change au quotidien",
      items: [
        ["RefreshCw", "Toujours à jour", "Fini les versions différentes d'Office et les fichiers qui ne s'ouvrent pas.", "pexels-1181675.jpg"],
        ["User", "Licence nominative", "Nouvel ordinateur ? On se connecte, tout est là. Aucun logiciel à racheter.", "pexels-4049990.jpg"],
        ["Calendar", "Agendas partagés", "On voit les disponibilités de chacun et on planifie une réunion en deux clics.", "pexels-3182812.jpg"],
      ],
      vanne: "« Tu peux me renvoyer le fichier, je n'arrive pas à l'ouvrir ? » Cette phrase disparaît de votre vocabulaire.",
    },
    {
      t: "kit", titre: "L'installation minimum",
      items: [
        ["Prérequis", "Globe", "Votre nom de domaine", "Pour des adresses @votre-entreprise.fr", "pexels-6476589.jpg"],
        ["Abonnement", "User", "Une licence par utilisateur", "Basic, Standard ou Premium", "pexels-4049990.jpg"],
        ["Migration", "ArrowRightLeft", "Le transfert de l'existant", "Mails, contacts et agendas récupérés", "pexels-1181675.jpg"],
        ["Absolute Micro", "Wrench", "Administration", "Comptes, arrivées, départs, assistance", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Outils dispersés… ou Microsoft 365", labSans: "Outils dispersés", labAvec: "Microsoft 365",
      sans: ["Mails perdus si le PC tombe en panne", "Logiciels à racheter à chaque nouvel ordinateur", "Agendas et contacts non partagés"],
      avec: ["Tout est dans le Cloud, rien ne se perd", "Licence liée à la personne, pas au PC", "Agendas et contacts partagés sur tous les appareils"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["ArrowRightLeft", "Migration de vos mails existants"], ["Users", "Gestion des comptes et des départs"], ["Headset", "Assistance au quotidien"]],
    },
  ],
};

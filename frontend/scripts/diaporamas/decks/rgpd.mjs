import * as S from "../scenes/rgpd.mjs";

export default {
  key: "rgpd",
  titre: "RGPD",
  sousTitre: "Protéger les données personnelles de vos clients et salariés, sans usine à gaz",
  topics: ["infra_rgpd"],
  theme: { primary: "#DB2777", dark: "#3B0A22", tint: "#FDF2F8", soft: "#FBCFE8" },
  slides: [
    { t: "cover", photo: "pexels-5668858.jpg" },
    {
      t: "cards", titre: "Toutes les entreprises sont concernées",
      items: [
        ["Users", "Des données partout", "Fichier clients, salariés, devis, mails : dès qu'une personne est identifiable, c'est une donnée personnelle.", "pexels-3184360.jpg"],
        ["Scale", "Une obligation légale", "Le règlement européen s'applique aussi aux TPE, aux artisans et aux associations.", "pexels-7319070.jpg"],
        ["Handshake", "La confiance", "Vos clients vous confient leurs informations : les protéger, c'est les respecter.", "pexels-3756679.jpg"],
      ],
      tech: ["Donnée personnelle", "Toute information qui permet d'identifier une personne : nom, adresse mail, téléphone, plaque, numéro client…"],
    },
    {
      t: "explainer", titre: "Le cycle de vie d'une donnée",
      texte: "Le RGPD tient en quelques principes : ne collecter que l'utile, le protéger, s'en servir pour le but annoncé et ne pas le garder indéfiniment.",
      scene: S.cycle,
      tech: ["Minimisation", "Ne demander que les informations réellement nécessaires. La date de naissance pour un devis de plomberie ? Non."],
      vanne: "Le fichier Excel « Clients_depuis_1998.xlsx » n'est pas un trésor. C'est une responsabilité.",
    },
    {
      t: "cards", titre: "Les droits de vos clients",
      items: [
        ["Eye", "Accès", "Savoir quelles données vous détenez sur eux, et en obtenir une copie.", "pexels-6801648.jpg"],
        ["PenLine", "Rectification", "Corriger une information inexacte ou incomplète.", "pexels-5668858.jpg"],
        ["Trash2", "Effacement", "Demander la suppression, sauf obligation légale de conservation.", "pexels-6476260.jpg"],
      ],
      vanne: "Le délai de réponse est d'un mois. Pas « dès qu'on a cinq minutes ».",
    },
    {
      t: "explainer", titre: "En cas de fuite : 72 heures",
      texte: "Une violation de données (PC volé, piratage, mail envoyé au mauvais destinataire) doit être documentée et, s'il y a un risque pour les personnes, notifiée à la CNIL sous 72 heures.",
      scene: S.violation,
      tech: ["Violation de données", "Perte, vol, destruction ou divulgation non autorisée de données personnelles, accidentelle ou malveillante."],
    },
    {
      t: "kit", titre: "La sécurité informatique au service du RGPD",
      items: [
        ["Accès", "KeyRound", "Comptes nominatifs", "Mots de passe robustes et double authentification", "pexels-4065891.jpg"],
        ["Protection", "ShieldCheck", "Postes protégés", "Antivirus ou EDR, mises à jour, chiffrement", "pexels-5380642.jpg"],
        ["Sauvegarde", "DatabaseBackup", "Données sauvegardées", "Pour ne rien perdre, même en cas d'attaque", "pexels-1054397.jpg"],
        ["Absolute Micro", "Wrench", "Mise en œuvre", "Les mesures techniques, documentées", "pexels-8867482.jpg"],
      ],
    },
    {
      t: "duel", titre: "Données à l'abandon… ou maîtrisées", labSans: "Données à l'abandon", labAvec: "Données maîtrisées",
      sans: ["Fichiers conservés sans limite de durée", "Accès ouverts à tout le monde", "Une fuite découverte trop tard"],
      avec: ["Registre tenu, durées définies", "Accès limités, postes protégés", "Procédure prête en cas d'incident"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["ShieldCheck", "Mesures de sécurité techniques"], ["KeyRound", "Gestion des accès et des comptes"], ["FileText", "Documentation pour votre registre"]],
    },
  ],
};

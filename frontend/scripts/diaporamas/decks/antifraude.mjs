import * as S from "../scenes/antifraude.mjs";

export default {
  key: "antifraude",
  titre: "Loi anti-fraude TVA",
  sousTitre: "Caisse et logiciel de gestion : ce que la loi impose, et comment être en règle",
  topics: ["infra_antifraude"],
  theme: { primary: "#B45309", dark: "#3A1A03", tint: "#FFFBEB", soft: "#FDE68A" },
  slides: [
    { t: "cover", photo: "pexels-3962285.jpg" },
    {
      t: "cards", titre: "Qui est concerné ?",
      items: [
        ["Store", "Les commerces", "Tout assujetti à la TVA qui encaisse des particuliers avec un logiciel ou un système de caisse.", "pexels-3962285.jpg"],
        ["UtensilsCrossed", "Restaurants, artisans…", "Dès que les encaissements de clients particuliers passent par un logiciel.", "pexels-6205509.jpg"],
        ["CircleSlash", "Pas concernés", "Les ventes entre professionnels, la caisse tenue à la main, les entreprises en franchise de TVA.", "pexels-4968391.jpg"],
      ],
      tech: ["Article 286 du CGI", "Le texte du Code général des impôts qui impose l'usage d'un logiciel ou système de caisse sécurisé."],
    },
    {
      t: "explainer", titre: "Les quatre conditions du logiciel",
      texte: "Le logiciel doit garantir que les encaissements enregistrés ne peuvent pas être modifiés en douce, et qu'ils restent disponibles pour l'administration fiscale.",
      scene: S.conditions,
      vanne: "Le bouton « annuler la vente » qui efface tout sans laisser de trace : c'est précisément ce que la loi a voulu faire disparaître.",
    },
    {
      t: "explainer", titre: "Ce qui se passe lors d'un contrôle",
      texte: "Chaque enregistrement est chaîné au précédent par une empreinte numérique. Toute suppression laisse une trace, et le justificatif de conformité doit pouvoir être présenté.",
      scene: S.controle,
      tech: ["Certification", "Depuis la loi de finances 2025, l'attestation fournie par l'éditeur ne suffit plus : un certificat d'organisme accrédité est exigé."],
    },
    {
      t: "cards", titre: "Les bons réflexes",
      items: [
        ["BadgeCheck", "Demander le certificat", "Exigez le certificat de conformité de votre logiciel et rangez-le précieusement.", "pexels-6801648.jpg"],
        ["RefreshCw", "Rester à jour", "Le certificat porte sur une version : une version obsolète peut ne plus être couverte.", "pexels-5380642.jpg"],
        ["DatabaseBackup", "Archiver", "Les données et archives doivent rester disponibles pendant toute la durée légale.", "pexels-1054397.jpg"],
      ],
      vanne: "En cas de contrôle, « mon neveu m'a installé une caisse gratuite trouvée sur Internet » n'est pas un justificatif accepté.",
    },
    {
      t: "kit", titre: "Être en règle : le minimum",
      items: [
        ["Logiciel", "MonitorCheck", "Une caisse certifiée", "Ou un logiciel de gestion certifié", "pexels-7621136.jpg"],
        ["Justificatif", "BadgeCheck", "Le certificat", "Correspondant à la version utilisée", "pexels-7319070.jpg"],
        ["Données", "DatabaseBackup", "Une sauvegarde", "Des données et des archives fiscales", "pexels-2881227.jpg"],
        ["Absolute Micro", "Wrench", "Accompagnement", "Vérification, installation, sauvegarde", "pexels-8867482.jpg"],
      ],
    },
    {
      t: "duel", titre: "Logiciel non conforme… ou certifié", labSans: "Non conforme", labAvec: "Certifié",
      sans: ["Amende de 7 500 € par logiciel concerné", "Ventes modifiables sans trace", "Risque de redressement lors d'un contrôle"],
      avec: ["Certificat présenté en cas de contrôle", "Encaissements inaltérables et archivés", "L'esprit tranquille face à l'administration"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["BadgeCheck", "Vérification de votre logiciel"], ["MonitorCheck", "Installation d'une solution conforme"], ["DatabaseBackup", "Sauvegarde des données fiscales"]],
    },
  ],
};

import * as S from "../scenes/cyberattaques.mjs";

export default {
  key: "cyberattaques",
  titre: "Cyberattaques",
  sousTitre: "Pourquoi, comment, et pourquoi vous aussi",
  topics: ["cyber_attaques"],
  theme: { primary: "#9F1239", dark: "#2A0712", tint: "#FFF1F2", soft: "#FECDD3" },
  slides: [
    { t: "cover", photo: "pexels-6963944.jpg" },
    {
      t: "explainer", titre: "« Nous sommes trop petits pour intéresser un pirate »",
      texte: "La plupart des attaques ne sont pas ciblées à la main : des programmes testent automatiquement des milliers d'entreprises et exploitent la moindre faille.",
      scene: S.cibles,
      tech: ["Attaque opportuniste", "Une attaque qui ne choisit pas sa victime : elle frappe là où la porte est ouverte."],
      vanne: "Le cambrioleur ne choisit pas la maison la plus riche du quartier. Il choisit celle dont la fenêtre est ouverte.",
    },
    {
      t: "cards", titre: "Pourquoi attaquer ?",
      items: [
        ["Banknote", "L'argent", "Rançon pour débloquer les fichiers, ou pour ne pas publier les données volées.", "pexels-4458420.jpg"],
        ["Database", "Les données", "Fichiers clients, coordonnées bancaires, identifiants : tout se revend.", "pexels-2004161.jpg"],
        ["Network", "Le rebond", "Votre messagerie sert à piéger vos clients et fournisseurs, qui vous font confiance.", "pexels-5380589.jpg"],
      ],
      vanne: "Le pirate moderne a un service commercial, un support client et des objectifs trimestriels. Seule la morale manque.",
    },
    {
      t: "explainer", titre: "Comment se déroule une attaque",
      texte: "Une attaque suit presque toujours les mêmes étapes. Elle peut durer des semaines avant le jour où tout s'arrête.",
      scene: S.chaine,
      tech: ["Chaîne d'attaque", "L'enchaînement des étapes d'une intrusion. Casser un seul maillon suffit souvent à faire échouer l'attaque."],
    },
    {
      t: "cards", titre: "Les attaques les plus courantes",
      items: [
        ["Lock", "Le rançongiciel", "Les fichiers sont chiffrés et une rançon est exigée pour les récupérer."],
        ["Fish", "L'hameçonnage", "Un faux message pour voler un mot de passe ou faire payer une fausse facture."],
        ["UserX", "L'usurpation", "Un faux dirigeant ou fournisseur réclame un virement ou un changement de RIB."],
      ],
      vanne: "Changement de RIB par simple mail ? On décroche son téléphone. Toujours. Même si le mail est très poli.",
    },
    {
      t: "kit", titre: "La défense minimum, couche par couche",
      items: [
        ["Mail", "Mail", "Filtre antispam", "Bloque la porte d'entrée n°1", "pexels-4065876.jpg"],
        ["Comptes", "KeyRound", "Double authentification", "Un mot de passe volé ne suffit plus", "pexels-4065891.jpg"],
        ["Postes", "ShieldCheck", "Pare-feu et EDR", "Détectent et isolent l'intrus", "pexels-2881232.jpg"],
        ["Absolute Micro", "DatabaseBackup", "Sauvegarde isolée", "Le dernier filet de sécurité", "pexels-17489160.jpg"],
      ],
    },
    {
      t: "duel", titre: "Sans préparation… avec préparation", labSans: "Sans préparation", labAvec: "Préparé",
      sans: ["L'attaque passe inaperçue pendant des semaines", "Activité arrêtée, données publiées", "Décisions prises dans l'urgence"],
      avec: ["Plusieurs protections cassent la chaîne", "Intrusion détectée, poste isolé", "Redémarrage depuis une sauvegarde saine"],
    },
    {
      t: "closing", photo: "pexels-325229.jpg", titre: "Absolute Micro s'en occupe",
      items: [["ShieldCheck", "Protections en couches"], ["BellRing", "Surveillance et alertes"], ["LifeBuoy", "Accompagnement en cas d'incident"]],
    },
  ],
};
